import React from 'react';

/**
 * StoryArt — inline SVG illustrations per story.
 *
 * Used as hero imagery on story cards and the Story Select hero.
 * IMB palette: navy #1B365D, teal #009681 / #2EBCA8, orange #E87722.
 * Deliberately simple / symbolic rather than literal — two figures, a path,
 * a horizon. Each one is 800x400 and scales via preserveAspectRatio.
 *
 * Usage:
 *   <StoryArt storyId="prodigal" />
 */

/* ── Prodigal Son — road and distant home at sunset ──────────────────── */
function ProdigalArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="prodigal-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1B365D" />
          <stop offset="65%"  stopColor="#4A5F8A" />
          <stop offset="100%" stopColor="#E87722" />
        </linearGradient>
        <linearGradient id="prodigal-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#6B4A2A" />
          <stop offset="100%" stopColor="#2a1810" />
        </linearGradient>
      </defs>
      <rect width="800" height="400" fill="url(#prodigal-sky)" />
      {/* sun */}
      <circle cx="540" cy="240" r="42" fill="#F3D54E" opacity="0.9" />
      <circle cx="540" cy="240" r="70" fill="#F3D54E" opacity="0.18" />
      {/* distant hills */}
      <path d="M0,260 L120,235 L280,260 L420,225 L600,250 L800,225 L800,400 L0,400 Z" fill="#2a3a52" opacity="0.75" />
      {/* ground */}
      <path d="M0,290 L800,290 L800,400 L0,400 Z" fill="url(#prodigal-ground)" />
      {/* road — perspective lines */}
      <path d="M370,400 L430,400 L460,290 L418,290 Z" fill="#8A6930" opacity="0.8" />
      <path d="M385,400 L415,400 L435,290 L425,290 Z" fill="#F3D54E" opacity="0.18" />
      {/* small house on horizon */}
      <g transform="translate(430, 250)">
        <rect x="-6" y="-8" width="12" height="14" fill="#1B365D" />
        <path d="M-8,-8 L0,-16 L8,-8 Z" fill="#1B365D" />
        <rect x="-2" y="-3" width="4" height="7" fill="#E87722" opacity="0.9" />
      </g>
      {/* walking figure — small, in the distance */}
      <g transform="translate(398, 320)">
        <circle cx="0" cy="-12" r="3" fill="#0F1F3A" />
        <path d="M-3,-8 L3,-8 L4,8 L-4,8 Z" fill="#0F1F3A" />
      </g>
    </svg>
  );
}

/* ── Samaritan — a street at night, a light in the distance ──────────── */
function SamaritanArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="sam-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#0A1730" />
          <stop offset="100%" stopColor="#1B365D" />
        </linearGradient>
        <radialGradient id="sam-light" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0%"   stopColor="#F3D54E" stopOpacity="0.45" />
          <stop offset="50%"  stopColor="#E87722" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#E87722" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#sam-sky)" />
      {/* streetlight glow */}
      <rect x="150" y="0" width="500" height="400" fill="url(#sam-light)" />
      {/* road */}
      <path d="M0,300 L800,300 L800,400 L0,400 Z" fill="#0A0F1C" />
      {/* road stripe */}
      <path d="M0,345 L800,345" stroke="#4A5F8A" strokeWidth="2" strokeDasharray="14 16" opacity="0.5" />
      {/* distant figures — one kneeling over another */}
      <g transform="translate(395, 295)">
        <ellipse cx="0" cy="6" rx="22" ry="4" fill="#0A0F1C" opacity="0.5" />
        <path d="M-14,2 L-4,-6 L6,-4 L10,6 Z" fill="#1B365D" />
        <circle cx="-5" cy="-12" r="5" fill="#1B365D" />
        <path d="M0,-2 L12,-4 L14,4 Z" fill="#009681" opacity="0.85" />
      </g>
      {/* lamppost */}
      <rect x="160" y="80" width="3" height="250" fill="#1B365D" />
      <circle cx="161.5" cy="75" r="10" fill="#F3D54E" opacity="0.85" />
      <circle cx="161.5" cy="75" r="24" fill="#F3D54E" opacity="0.22" />
    </svg>
  );
}

/* ── Widow's Two Coins — temple columns and two small coins ──────────── */
function WidowArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="widow-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#D8C9A8" />
          <stop offset="100%" stopColor="#A88E5E" />
        </linearGradient>
        <radialGradient id="widow-glow" cx="0.5" cy="0.55" r="0.35">
          <stop offset="0%"   stopColor="#F3D54E" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#F3D54E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#widow-bg)" />
      {/* temple columns */}
      {[120, 270, 530, 680].map((x, i) => (
        <g key={i} transform={`translate(${x}, 80)`}>
          <rect x="-24" y="-12" width="48" height="10" fill="#1B365D" opacity="0.88" />
          <rect x="-20" y="-2"  width="40" height="240" fill="#1B365D" opacity="0.88" />
          <rect x="-24" y="238" width="48" height="8"  fill="#1B365D" opacity="0.88" />
          {/* column fluting */}
          <rect x="-14" y="0" width="2" height="236" fill="#0F1F3A" opacity="0.35" />
          <rect x="-4"  y="0" width="2" height="236" fill="#0F1F3A" opacity="0.35" />
          <rect x="6"   y="0" width="2" height="236" fill="#0F1F3A" opacity="0.35" />
        </g>
      ))}
      {/* glow in center */}
      <rect x="320" y="140" width="160" height="160" fill="url(#widow-glow)" />
      {/* two coins */}
      <g transform="translate(400, 310)">
        <ellipse cx="-14" cy="4" rx="20" ry="5" fill="#0A0F1C" opacity="0.3" />
        <ellipse cx="14"  cy="4" rx="20" ry="5" fill="#0A0F1C" opacity="0.3" />
        <circle cx="-14" cy="0" r="16" fill="#B8893F" />
        <circle cx="-14" cy="0" r="16" fill="none" stroke="#8A6930" strokeWidth="1.5" />
        <circle cx="-14" cy="0" r="9"  fill="none" stroke="#8A6930" strokeWidth="1" />
        <circle cx="14"  cy="0" r="16" fill="#B8893F" />
        <circle cx="14"  cy="0" r="16" fill="none" stroke="#8A6930" strokeWidth="1.5" />
        <circle cx="14"  cy="0" r="9"  fill="none" stroke="#8A6930" strokeWidth="1" />
      </g>
      {/* floor */}
      <path d="M0,330 L800,330 L800,400 L0,400 Z" fill="#8A6930" opacity="0.5" />
    </svg>
  );
}

/* ── Sower — a field at dawn, seeds scattering ───────────────────────── */
function SowerArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="sower-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#F3D54E" stopOpacity="0.4" />
          <stop offset="40%"  stopColor="#E87722" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#487A7B" />
        </linearGradient>
        <linearGradient id="sower-field" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#6B8F3A" />
          <stop offset="100%" stopColor="#2D4A22" />
        </linearGradient>
      </defs>
      <rect width="800" height="400" fill="url(#sower-sky)" />
      {/* hills */}
      <path d="M0,220 L200,190 L400,210 L600,185 L800,210 L800,400 L0,400 Z" fill="#487A7B" opacity="0.4" />
      {/* field */}
      <path d="M0,270 L800,270 L800,400 L0,400 Z" fill="url(#sower-field)" />
      {/* furrows */}
      {[300, 330, 365, 395].map((y) => (
        <path key={y} d={`M0,${y} Q400,${y - 4} 800,${y}`} stroke="#1B365D" strokeWidth="1.2" opacity="0.3" fill="none" />
      ))}
      {/* sower figure — broad silhouette */}
      <g transform="translate(260, 185)">
        <path d="M-22,82 L22,82 L16,18 L-16,18 Z" fill="#1B365D" />
        <circle cx="0" cy="0" r="18" fill="#1B365D" />
        {/* arm casting seed */}
        <path d="M14,28 L70,10" stroke="#1B365D" strokeWidth="10" strokeLinecap="round" />
        <path d="M-14,35 L-40,55" stroke="#1B365D" strokeWidth="10" strokeLinecap="round" />
      </g>
      {/* scattered seeds (gold dots) */}
      {[[340,180],[390,200],[440,175],[490,210],[540,200],[590,240],[640,220],[340,260],[420,280],[500,290],[580,300]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="#F3D54E" opacity="0.9" />
      ))}
    </svg>
  );
}

/* ── Zacchaeus — a sycamore tree with figure on a branch ─────────────── */
function ZacchaeusArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="zac-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1B365D" />
          <stop offset="100%" stopColor="#4A5F8A" />
        </linearGradient>
      </defs>
      <rect width="800" height="400" fill="url(#zac-sky)" />
      {/* ground */}
      <path d="M0,310 L800,310 L800,400 L0,400 Z" fill="#2a1810" />
      {/* trunk */}
      <path d="M395,310 L405,310 L415,140 L400,40 L385,140 Z" fill="#6B4A2A" />
      {/* canopy */}
      <circle cx="370" cy="150" r="80" fill="#2D4A22" opacity="0.9" />
      <circle cx="440" cy="130" r="90" fill="#2D4A22" opacity="0.9" />
      <circle cx="400" cy="100" r="70" fill="#6B8F3A" opacity="0.85" />
      <circle cx="470" cy="170" r="55" fill="#6B8F3A" opacity="0.8" />
      {/* figure sitting on a branch, knees up */}
      <g transform="translate(400, 145)">
        <circle cx="0" cy="-2" r="8" fill="#E87722" />
        <path d="M-8,4 L8,4 L6,20 L-6,20 Z" fill="#1B365D" />
        <path d="M-6,20 L-4,34" stroke="#1B365D" strokeWidth="4" strokeLinecap="round" />
        <path d="M6,20 L8,34" stroke="#1B365D" strokeWidth="4" strokeLinecap="round" />
      </g>
      {/* crowd below — silhouette heads */}
      {[180, 230, 280, 490, 540, 590, 640].map((x, i) => (
        <circle key={i} cx={x} cy={295} r="12" fill="#0F1F3A" opacity="0.85" />
      ))}
    </svg>
  );
}

/* ── Generic horizon — used for stories without custom art ───────────── */
function HorizonArt({ accentColor = '#009681' }) {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="hor-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1B365D" />
          <stop offset="100%" stopColor="#4A5F8A" />
        </linearGradient>
      </defs>
      <rect width="800" height="400" fill="url(#hor-sky)" />
      <circle cx="560" cy="170" r="50" fill={accentColor} opacity="0.6" />
      <circle cx="560" cy="170" r="75" fill={accentColor} opacity="0.15" />
      <path d="M0,290 L160,260 L340,280 L520,255 L720,275 L800,260 L800,400 L0,400 Z" fill="#0F1F3A" opacity="0.8" />
      <path d="M0,340 L800,340 L800,400 L0,400 Z" fill="#0A0F1C" />
      <g transform="translate(400, 335)">
        <circle cx="0" cy="-8" r="4" fill={accentColor} />
        <path d="M-4,-4 L4,-4 L6,10 L-6,10 Z" fill={accentColor} opacity="0.85" />
      </g>
    </svg>
  );
}

const ART = {
  prodigal:  ProdigalArt,
  samaritan: SamaritanArt,
  widow:     WidowArt,
  sower:     SowerArt,
  zacchaeus: ZacchaeusArt,
};

export default function StoryArt({ storyId, accentColor, className }) {
  const Art = ART[storyId] || (() => <HorizonArt accentColor={accentColor} />);
  return (
    <div className={`story-art ${className || ''}`}>
      <Art />
    </div>
  );
}
