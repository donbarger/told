import React, { useCallback, useEffect, useRef, useState } from 'react';

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

export default function NarrationButton({ text, autoplay = false }) {
  const ttsAvailable = useTtsAvailable();
  const [state, setState]       = useState('idle'); // idle | loading | playing | paused | error
  const audioRef                = useRef(null);
  const urlRef                  = useRef(null);
  const currentTextRef          = useRef(null);
  const autoStartedForRef       = useRef(null);

  // Clean up when text changes (new scene = fresh audio)
  useEffect(() => {
    if (currentTextRef.current !== null && currentTextRef.current !== text) {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      if (urlRef.current)   { URL.revokeObjectURL(urlRef.current); urlRef.current = null; }
      setState('idle');
    }
    currentTextRef.current = text;
    return () => {
      if (audioRef.current) audioRef.current.pause();
      if (urlRef.current)   URL.revokeObjectURL(urlRef.current);
    };
  }, [text]);

  const startOrToggle = useCallback(async () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch(() => setState('error'));
        setState('playing');
      } else {
        audioRef.current.pause();
        setState('paused');
      }
      return;
    }

    const thisText = text;
    setState('loading');
    try {
      const res = await fetch(`${BASE}/api/tts`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ text: thisText }),
      });
      if (currentTextRef.current !== thisText) return;
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      if (currentTextRef.current !== thisText) return;

      const url   = URL.createObjectURL(blob);
      urlRef.current = url;
      const audio = new Audio(url);
      audio.addEventListener('ended', () => setState('idle'));
      audio.addEventListener('pause', () => {
        if (audio.currentTime > 0 && audio.currentTime < audio.duration) setState('paused');
      });
      audio.addEventListener('play',  () => setState('playing'));
      audio.addEventListener('error', () => setState('error'));
      audioRef.current = audio;
      await audio.play();
    } catch (err) {
      console.warn('Narration failed:', err?.message || err);
      setState(err?.name === 'NotAllowedError' ? 'idle' : 'error');
    }
  }, [text]);

  // Autoplay on new scene; arm first-tap fallback if browser blocks it
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
        if (currentTextRef.current === text && !audioRef.current) startOrToggle();
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
