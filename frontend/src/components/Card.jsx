import React, { useState, useRef, useCallback } from 'react';
import SceneIllustration from './SceneIllustration.jsx';

export const PHASE_VISUALS = {
  prologue:    { bg: 'linear-gradient(160deg, #2C3E50 0%, #4A4A6A 100%)', emoji: '🏠', label: 'Home' },
  city:        { bg: 'linear-gradient(160deg, #B7410E 0%, #E8A020 100%)', emoji: '🌆', label: 'The City' },
  farCountry:  { bg: 'linear-gradient(160deg, #2D4A22 0%, #6B8F3A 100%)', emoji: '🍹', label: 'The Far Country' },
  famine:      { bg: 'linear-gradient(160deg, #2A2A2A 0%, #555555 100%)', emoji: '🌾', label: 'The Famine' },
  turning:     { bg: 'linear-gradient(160deg, #1A1A3A 0%, #3A3A6A 100%)', emoji: '💭', label: 'Coming to Himself' },
  returning:   { bg: 'linear-gradient(160deg, #7B3F00 0%, #D4A017 100%)', emoji: '🏃', label: 'The Return' },
  restored:    { bg: 'linear-gradient(160deg, #8B0000 0%, #D4A017 100%)', emoji: '🎊', label: 'Restored' },
};

const SWIPE_THRESHOLD = 90;
const DRAG_RESISTANCE = 0.85;

export default function Card({ card, story, stats, onChoice, loading }) {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [flying, setFlying] = useState(null); // 'left' | 'right' | null
  const startX = useRef(null);
  const cardRef = useRef(null);

  const commit = useCallback((direction) => {
    if (flying) return;
    setFlying(direction);
    setTimeout(() => {
      setDragX(0);
      setFlying(null);
      onChoice(direction);
    }, 350);
  }, [flying, onChoice]);

  const onPointerDown = useCallback((e) => {
    if (loading || flying) return;
    startX.current = e.clientX ?? e.touches?.[0]?.clientX;
    setIsDragging(true);
    cardRef.current?.setPointerCapture?.(e.pointerId);
  }, [loading, flying]);

  const onPointerMove = useCallback((e) => {
    if (!isDragging || startX.current === null) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    setDragX((x - startX.current) * DRAG_RESISTANCE);
  }, [isDragging]);

  const onPointerUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragX < -SWIPE_THRESHOLD) commit('left');
    else if (dragX > SWIPE_THRESHOLD) commit('right');
    else setDragX(0);
    startX.current = null;
  }, [isDragging, dragX, commit]);

  if (!card) return null;

  const phase = card.phase || 'city';

  // Stat-driven visual tension: stat3 is the narrative arc stat across all stories
  const tension = stats ? (() => {
    const s3 = stats.stat3;
    const minAll = Math.min(stats.stat1, stats.stat2, stats.stat3);
    if (s3 <= 12 || minAll <= 8) return 'critical';
    if (s3 <= 28)                return 'low';
    if (s3 >= 72)                return 'high';
    return 'normal';
  })() : 'normal';
  const phaseVisuals = story?.phaseVisuals || PHASE_VISUALS;
  const visual = phaseVisuals[phase] || PHASE_VISUALS[phase] || PHASE_VISUALS.city;

  const rotation = dragX * 0.04;
  const absX = Math.abs(dragX);
  const swipeProgress = Math.min(absX / SWIPE_THRESHOLD, 1);

  let transform = `translateX(${dragX}px) rotate(${rotation}deg)`;
  if (flying === 'left') transform = 'translateX(-150vw) rotate(-25deg)';
  if (flying === 'right') transform = 'translateX(150vw) rotate(25deg)';

  const showLeft = dragX < -28;
  const showRight = dragX > 28;

  const leftOpacity = showLeft ? Math.min((absX - 28) / 50, 1) : 0;
  const rightOpacity = showRight ? Math.min((absX - 28) / 50, 1) : 0;

  const isFixed = card.type === 'fixed';
  const leftLabel = isFixed ? card.leftChoice?.label : card.leftChoice?.label;
  const rightLabel = isFixed ? card.rightChoice?.label : card.rightChoice?.label;

  return (
    <div className="card-wrapper">
      {/* Ghost card behind for depth */}
      <div className="card card-ghost" />

      <div
        ref={cardRef}
        className={`card ${isDragging ? 'dragging' : ''}`}
        data-tension={tension}
        style={{ transform, transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Swipe overlays */}
        <div className="swipe-overlay swipe-left" style={{ opacity: leftOpacity }}>
          <span className="swipe-label">{leftLabel}</span>
        </div>
        <div className="swipe-overlay swipe-right" style={{ opacity: rightOpacity }}>
          <span className="swipe-label">{rightLabel}</span>
        </div>

        {/* Visual area */}
        <div className="card-visual">
          <SceneIllustration sceneType={card.sceneType} phase={phase} />
          <span className="phase-badge">{visual.label}</span>
        </div>

        {/* Content area */}
        <div className="card-content">
          {card.characterName && (
            <div className="character-line">
              <span className="character-name">{card.characterName}</span>
              {card.characterRole && (
                <span className="character-role"> — {card.characterRole}</span>
              )}
            </div>
          )}

          <p className="scene-text">{card.scene}</p>

          {loading && (
            <div className="loading-dots">
              <span /><span /><span />
            </div>
          )}
        </div>

        {/* Swipe hint */}
        <div className="swipe-hints" style={{ opacity: isDragging ? 0 : 0.4 }}>
          <span>← {leftLabel || 'swipe left'}</span>
          <span>{rightLabel || 'swipe right'} →</span>
        </div>
      </div>
    </div>
  );
}
