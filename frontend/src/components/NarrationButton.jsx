import React, { useCallback, useEffect, useRef, useState } from 'react';
import { apiFetch } from '../hooks/useAuth';

const BASE = import.meta.env.VITE_API_BASE_URL || '';

function useTtsAvailable() {
  const [available, setAvailable] = useState(null);
  useEffect(() => {
    let cancelled = false;
    fetch(`${BASE}/api/tts/health`)
      .then((r) => r.ok ? r.json() : { ok: false })
      .then((d) => { if (!cancelled) setAvailable(!!d.ok); })
      .catch(() => { if (!cancelled) setAvailable(false); });
    return () => { cancelled = true; };
  }, []);
  return available;
}

// A streaming audio URL the browser can play as bytes arrive — no fetch+blob
// buffering, no waiting for the whole WAV. An <audio> element cannot send the
// Bearer header, so the server signs the URL for this exact line instead (told#3).
async function signedStreamUrl(text) {
  const r = await apiFetch('/api/tts/sign', { method: 'POST', body: JSON.stringify({ text }) });
  if (!r.ok) throw new Error(`sign ${r.status}`);
  const { url } = await r.json();
  return `${BASE}${url}`;
}

export default function NarrationButton({ text, autoplay = false }) {
  const ttsAvailable = useTtsAvailable();
  const [state, setState]       = useState('idle'); // idle | loading | playing | paused | error
  const audioRef                = useRef(null);
  const currentTextRef          = useRef(null);
  const autoStartedForRef       = useRef(null);
  // { text, url } once signed. Signed as soon as the text arrives, so a tap can call
  // play() without awaiting the network first: Safari only honors play() inside the
  // gesture, and an await in between loses it.
  const signedRef               = useRef({ text: null, url: null });

  useEffect(() => {
    if (!text || ttsAvailable !== true) return;
    let cancelled = false;
    signedStreamUrl(text)
      .then((url) => { if (!cancelled) signedRef.current = { text, url }; })
      .catch(() => { /* signing again on tap reports the error */ });
    return () => { cancelled = true; };
  }, [text, ttsAvailable]);

  // Clean up when text changes (new scene = fresh audio)
  useEffect(() => {
    if (currentTextRef.current !== null && currentTextRef.current !== text) {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      setState('idle');
    }
    currentTextRef.current = text;
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, [text]);

  const startOrToggle = useCallback(async () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        try { await audioRef.current.play(); setState('playing'); }
        catch { setState('error'); }
      } else {
        audioRef.current.pause();
        setState('paused');
      }
      return;
    }

    const thisText = text;
    setState('loading');
    let url = signedRef.current.text === thisText ? signedRef.current.url : null;
    if (!url) {
      try { url = await signedStreamUrl(thisText); }
      catch { setState('error'); return; }
      if (currentTextRef.current !== thisText) return;   // scene moved on while signing
    }
    const audio = new Audio(url);
    audio.preload = 'auto';
    audio.addEventListener('playing', () => setState('playing'));
    audio.addEventListener('pause', () => {
      if (audio.currentTime > 0 && audio.currentTime < audio.duration) setState('paused');
    });
    audio.addEventListener('ended', () => setState('idle'));
    audio.addEventListener('error', () => setState('error'));
    audioRef.current = audio;

    try {
      await audio.play();
    } catch (err) {
      // Browser autoplay policy or other play() rejection
      setState(err?.name === 'NotAllowedError' ? 'idle' : 'error');
    }
  }, [text]);

  // Autoplay on new scene; arm first-tap fallback if browser blocks it.
  useEffect(() => {
    if (!autoplay || !text || ttsAvailable !== true) return;
    if (autoStartedForRef.current === text) return;
    autoStartedForRef.current = text;

    let fallbackArmed = false;
    const armFallback = () => {
      if (fallbackArmed) return;
      fallbackArmed = true;
      const onTap = () => {
        fallbackArmed = false;
        // FIX: previously this only fired startOrToggle when audioRef was
        // unset, but the failed autoplay path leaves audioRef set + paused —
        // so the fallback no-op'd. Now we resume if it exists & is paused.
        if (currentTextRef.current !== text) return;
        const a = audioRef.current;
        if (!a) startOrToggle();
        else if (a.paused) a.play().then(() => setState('playing')).catch(() => setState('error'));
        document.removeEventListener('touchstart', onTap);
        document.removeEventListener('pointerdown', onTap);
      };
      document.addEventListener('touchstart', onTap, { once: true, passive: true });
      document.addEventListener('pointerdown', onTap, { once: true });
    };

    const t = setTimeout(async () => {
      if (audioRef.current) return;
      await startOrToggle();
      setTimeout(() => {
        if (!audioRef.current || audioRef.current.paused) armFallback();
      }, 500);
    }, 350);
    return () => clearTimeout(t);
  }, [text, autoplay, ttsAvailable, startOrToggle]);

  if (ttsAvailable === false || !text) return null;

  const glyph = state === 'playing' ? '❙❙'
              : state === 'loading' ? '…'
              : state === 'error'   ? '×'
              : '▶';

  const hint = state === 'loading' ? 'Generating audio…'
             : state === 'playing' ? 'Pause narration'
             : state === 'paused'  ? 'Resume narration'
             : state === 'error'   ? 'Narration unavailable — tap to retry'
             : 'Listen to this scene';

  return (
    <button
      className={`narration-btn narration-btn--${state}`}
      onClick={startOrToggle}
      disabled={state === 'loading'}
      aria-label={hint}
      title={hint}
      type="button"
    >
      <span className="narration-glyph" aria-hidden="true">{glyph}</span>
      <span className="narration-label">
        {state === 'playing' ? 'Pause' : state === 'paused' ? 'Resume' : 'Listen'}
      </span>
    </button>
  );
}
