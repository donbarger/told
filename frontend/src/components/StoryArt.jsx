import React from 'react';

/**
 * StoryArt — one unique SVG illustration per story.
 * Each captures the defining visual moment of that specific narrative.
 * Palette: navy #1B365D · teal #009681 / #2EBCA8 · orange #E87722 · gold #F3D54E
 * All 800×400, scales via preserveAspectRatio="xMidYMid slice".
 */

/* ── Prodigal Son — father running, arms open, figure on the road ──────── */
function ProdigalArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="pg-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B1A2E" />
          <stop offset="55%" stopColor="#7A3B1E" />
          <stop offset="100%" stopColor="#E87722" />
        </linearGradient>
        <linearGradient id="pg-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5A3010" />
          <stop offset="100%" stopColor="#2A1408" />
        </linearGradient>
        <radialGradient id="pg-sun" cx="0.55" cy="0.72" r="0.3">
          <stop offset="0%" stopColor="#F3D54E" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#E87722" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#E87722" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#pg-sky)" />
      <rect width="800" height="400" fill="url(#pg-sun)" />
      {/* distant hills */}
      <path d="M0,245 Q200,210 400,235 Q600,215 800,240 L800,400 L0,400 Z" fill="#2A1408" opacity="0.6" />
      {/* ground */}
      <path d="M0,295 L800,295 L800,400 L0,400 Z" fill="url(#pg-ground)" />
      {/* road, perspective */}
      <path d="M340,400 L460,400 L500,295 L300,295 Z" fill="#7A5030" opacity="0.55" />
      {/* son — small, approaching from distance */}
      <g transform="translate(430,282)">
        <circle cx="0" cy="-10" r="4" fill="#1B1A2E" />
        <path d="M-4,-6 L4,-6 L3,8 L-3,8 Z" fill="#1B1A2E" />
        <path d="M-3,8 L-5,18" stroke="#1B1A2E" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M3,8 L5,18" stroke="#1B1A2E" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      {/* father — running, arms wide open toward son */}
      <g transform="translate(320,262)">
        <circle cx="0" cy="-14" r="9" fill="#0F1F3A" />
        <path d="M-9,-4 L9,-4 L7,24 L-7,24 Z" fill="#0F1F3A" />
        {/* robe flare from running */}
        <path d="M-7,18 Q-24,38 -18,52" stroke="#0F1F3A" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M7,18 Q16,38 12,50" stroke="#0F1F3A" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* left arm reaching toward son */}
        <path d="M8,-2 Q38,10 54,4" stroke="#0F1F3A" strokeWidth="7" strokeLinecap="round" fill="none" />
        {/* right arm back */}
        <path d="M-8,-2 Q-30,-8 -42,0" stroke="#0F1F3A" strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>
      {/* sun disc */}
      <circle cx="530" cy="285" r="28" fill="#F3D54E" opacity="0.85" />
    </svg>
  );
}

/* ── Good Samaritan — figure kneeling over a man on rocky road ─────────── */
function SamaritanArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="sam-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#070A14" />
          <stop offset="100%" stopColor="#1B2A4A" />
        </linearGradient>
        <radialGradient id="sam-lamp" cx="0.5" cy="0.65" r="0.35">
          <stop offset="0%" stopColor="#F3D54E" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#E87722" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#E87722" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#sam-sky)" />
      {/* stars */}
      {[[80,40],[180,25],[300,55],[500,30],[620,18],[710,48],[760,70],[150,80],[420,15]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.4" fill="#F3D54E" opacity="0.7" />
      ))}
      {/* rocky road ground */}
      <path d="M0,310 Q200,295 400,308 Q600,298 800,310 L800,400 L0,400 Z" fill="#2A1E10" />
      {/* rocks on roadside */}
      <ellipse cx="120" cy="318" rx="28" ry="10" fill="#1A1208" />
      <ellipse cx="680" cy="325" rx="22" ry="8" fill="#1A1208" />
      <ellipse cx="560" cy="312" rx="16" ry="7" fill="#1A1208" />
      {/* lamp glow on scene */}
      <rect x="200" y="180" width="400" height="250" fill="url(#sam-lamp)" />
      {/* wounded man, lying on ground */}
      <g transform="translate(440,320)">
        <ellipse cx="0" cy="5" rx="55" ry="12" fill="#12100C" opacity="0.5" />
        <path d="M-50,4 Q-20,-10 20,-6 L40,4 Q20,14 -20,12 Z" fill="#1B1A2E" />
        <circle cx="-38" cy="-2" r="9" fill="#1B1A2E" />
      </g>
      {/* samaritan kneeling over him */}
      <g transform="translate(390,295)">
        {/* body bent forward */}
        <path d="M-10,0 Q0,-24 14,-30" stroke="#0A0F1C" strokeWidth="10" strokeLinecap="round" fill="none" />
        <circle cx="14" cy="-38" r="9" fill="#0A0F1C" />
        {/* arm reaching down */}
        <path d="M6,-24 Q10,-4 16,6" stroke="#0A0F1C" strokeWidth="7" strokeLinecap="round" fill="none" />
        {/* kneeling legs */}
        <path d="M-10,0 L-18,14" stroke="#0A0F1C" strokeWidth="8" strokeLinecap="round" />
        <path d="M-4,4 L-4,18" stroke="#0A0F1C" strokeWidth="8" strokeLinecap="round" />
      </g>
      {/* oil lamp */}
      <g transform="translate(355,290)">
        <ellipse cx="0" cy="6" rx="14" ry="5" fill="#8A6020" />
        <path d="M-12,2 L12,2 L10,-4 L-10,-4 Z" fill="#B8893F" />
        <ellipse cx="12" cy="-2" rx="4" ry="6" fill="#F3D54E" opacity="0.7" />
        <circle cx="12" cy="-6" r="3" fill="#F3D54E" />
      </g>
      {/* donkey silhouette in background */}
      <g transform="translate(600,295)" opacity="0.6">
        <ellipse cx="0" cy="0" rx="38" ry="16" fill="#1B1A2E" />
        <path d="M-38,0 L-44,-18 L-36,-18 L-30,0 Z" fill="#1B1A2E" />
        <circle cx="-44" cy="-24" r="8" fill="#1B1A2E" />
        <path d="M-38,-20 L-42,-38" stroke="#1B1A2E" strokeWidth="4" />
        <path d="M38,0 L40,18 L32,18" stroke="#1B1A2E" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M20,0 L18,18" stroke="#1B1A2E" strokeWidth="5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* ── Widow's Offering — two hands over an offering box, two coins ───────── */
function WidowArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="wid-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8A870" />
          <stop offset="100%" stopColor="#7A5A28" />
        </linearGradient>
        <radialGradient id="wid-glow" cx="0.5" cy="0.55" r="0.3">
          <stop offset="0%" stopColor="#F3D54E" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#F3D54E" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="wid-box" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A1E0A" />
          <stop offset="100%" stopColor="#0A0800" />
        </linearGradient>
      </defs>
      <rect width="800" height="400" fill="url(#wid-bg)" />
      {/* temple wall texture */}
      {[0,50,100,150,200,250,300,350].map((y,i) => (
        <path key={i} d={`M0,${y} L800,${y}`} stroke="#5A3A10" strokeWidth="1" opacity="0.18" />
      ))}
      {[80,240,400,560,720].map((x,i) => (
        <path key={i} d={`M${x},0 L${x},400`} stroke="#5A3A10" strokeWidth="1" opacity="0.14" />
      ))}
      {/* stone columns faint */}
      {[100, 700].map((x,i) => (
        <rect key={i} x={x-18} y={0} width={36} height={400} fill="#8A6020" opacity="0.2" />
      ))}
      {/* glow from box */}
      <rect x="250" y="150" width="300" height="250" fill="url(#wid-glow)" />
      {/* offering box */}
      <g transform="translate(400,310)">
        <rect x="-80" y="-50" width="160" height="80" rx="4" fill="url(#wid-box)" />
        <rect x="-80" y="-50" width="160" height="80" rx="4" fill="none" stroke="#B8893F" strokeWidth="1.5" opacity="0.6" />
        {/* slot */}
        <rect x="-20" y="-55" width="40" height="8" rx="3" fill="#1A0800" />
        <rect x="-20" y="-55" width="40" height="8" rx="3" fill="none" stroke="#8A6020" strokeWidth="1" opacity="0.5" />
      </g>
      {/* two hands, releasing coins */}
      {/* left hand */}
      <g transform="translate(360,255)">
        <path d="M-20,0 Q-22,-28 -8,-38 Q4,-46 12,-30 L14,0 Z" fill="#C8956A" />
        {/* fingers */}
        <path d="M-14,-34 Q-16,-52 -6,-54 Q2,-54 2,-36" stroke="#C8956A" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M-4,-38 Q-4,-58 6,-58 Q14,-58 14,-40" stroke="#C8956A" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M8,-34 Q10,-52 18,-50 Q24,-48 22,-32" stroke="#C8956A" strokeWidth="7" strokeLinecap="round" fill="none" />
      </g>
      {/* right hand */}
      <g transform="translate(440,255)">
        <path d="M20,0 Q22,-28 8,-38 Q-4,-46 -12,-30 L-14,0 Z" fill="#C8956A" />
        <path d="M14,-34 Q16,-52 6,-54 Q-2,-54 -2,-36" stroke="#C8956A" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M4,-38 Q4,-58 -6,-58 Q-14,-58 -14,-40" stroke="#C8956A" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M-8,-34 Q-10,-52 -18,-50 Q-24,-48 -22,-32" stroke="#C8956A" strokeWidth="7" strokeLinecap="round" fill="none" />
      </g>
      {/* two coins falling */}
      <circle cx="380" cy="282" r="9" fill="#B8893F" />
      <circle cx="380" cy="282" r="9" fill="none" stroke="#F3D54E" strokeWidth="1" opacity="0.7" />
      <circle cx="420" cy="288" r="9" fill="#B8893F" />
      <circle cx="420" cy="288" r="9" fill="none" stroke="#F3D54E" strokeWidth="1" opacity="0.7" />
    </svg>
  );
}

/* ── Sower — hilltop figure casting seeds into wind, four soil types ──── */
function SowerArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="sw-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FAD04A" stopOpacity="0.6" />
          <stop offset="45%" stopColor="#E87722" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#2D5038" />
        </linearGradient>
        <linearGradient id="sw-land" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1A0A04" />
          <stop offset="28%" stopColor="#1A0A04" />
          <stop offset="29%" stopColor="#3A2810" />
          <stop offset="55%" stopColor="#4A6030" />
          <stop offset="56%" stopColor="#2D1808" />
          <stop offset="80%" stopColor="#2D1808" />
          <stop offset="81%" stopColor="#5A8040" />
          <stop offset="100%" stopColor="#3A6028" />
        </linearGradient>
      </defs>
      <rect width="800" height="400" fill="url(#sw-sky)" />
      {/* distant hills */}
      <path d="M0,240 Q150,210 300,230 Q500,205 700,225 L800,235 L800,400 L0,400 Z" fill="#2D4A22" opacity="0.55" />
      {/* four soils — the path, rocky, thorns, good soil */}
      <path d="M0,280 L800,280 L800,400 L0,400 Z" fill="url(#sw-land)" />
      {/* path lines (hard packed) */}
      <path d="M0,300 L230,300" stroke="#0A0400" strokeWidth="1.5" opacity="0.4" />
      <path d="M0,320 L230,320" stroke="#0A0400" strokeWidth="1.5" opacity="0.4" />
      {/* rocky patch */}
      {[[260,298],[290,292],[310,305],[330,294]].map(([x,y],i) => (
        <ellipse key={i} cx={x} cy={y} rx="10" ry="5" fill="#8A7A60" opacity="0.7" />
      ))}
      {/* thorns */}
      {[[460,285],[480,290],[500,283],[520,291],[540,285]].map(([x,y],i) => (
        <path key={i} d={`M${x},${y+14} L${x},${y} M${x-6},${y+4} L${x+6},${y+4}`} stroke="#4A2A10" strokeWidth="2" strokeLinecap="round" />
      ))}
      {/* good soil — faint sprouts */}
      {[[620,285],[650,280],[680,287],[710,282]].map(([x,y],i) => (
        <path key={i} d={`M${x},${y+14} Q${x-5},${y+2} ${x-2},${y}`} stroke="#7AB040" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      ))}
      {/* sower silhouette */}
      <g transform="translate(185,210)">
        <circle cx="0" cy="-16" r="13" fill="#0F1F3A" />
        <path d="M-13,-2 L13,-2 L10,32 L-10,32 Z" fill="#0F1F3A" />
        {/* robe */}
        <path d="M-10,28 Q-20,48 -16,60" stroke="#0F1F3A" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M10,28 Q20,48 16,60" stroke="#0F1F3A" strokeWidth="8" strokeLinecap="round" fill="none" />
        {/* arm casting */}
        <path d="M12,8 Q50,-8 78,0" stroke="#0F1F3A" strokeWidth="9" strokeLinecap="round" fill="none" />
        {/* other arm back */}
        <path d="M-12,8 Q-30,14 -42,8" stroke="#0F1F3A" strokeWidth="8" strokeLinecap="round" fill="none" />
      </g>
      {/* seeds arcing through air */}
      {[[240,195],[270,188],[305,200],[340,192],[375,208],[410,198],[445,215],[480,205],[515,222]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="2.8" fill="#F3D54E" opacity={0.9 - i * 0.07} />
      ))}
    </svg>
  );
}

/* ── Zacchaeus — figure perched in tree, single figure on road below ───── */
function ZacchaeusArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="zac-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B2E5D" />
          <stop offset="100%" stopColor="#4A6080" />
        </linearGradient>
        <radialGradient id="zac-glow" cx="0.5" cy="0.9" r="0.4">
          <stop offset="0%" stopColor="#E87722" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#E87722" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#zac-sky)" />
      <rect width="800" height="400" fill="url(#zac-glow)" />
      {/* distant buildings */}
      {[[90,240,30,80],[130,250,24,60],[160,235,40,90],[620,245,28,70],[660,238,36,85],[700,248,22,60]].map(([x,y,w,h],i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill="#0F1F3A" opacity="0.5" />
      ))}
      {/* road / dust */}
      <path d="M0,320 L800,320 L800,400 L0,400 Z" fill="#2A1E10" />
      <path d="M0,335 L800,335" stroke="#8A6030" strokeWidth="1" opacity="0.3" />
      {/* tree trunk */}
      <path d="M388,400 Q382,320 375,240 Q370,180 380,100" stroke="#4A3018" strokeWidth="22" strokeLinecap="round" fill="none" />
      <path d="M388,400 Q394,320 405,240 Q412,180 400,100" stroke="#5A3A20" strokeWidth="14" strokeLinecap="round" fill="none" />
      {/* branches */}
      <path d="M380,200 Q320,160 280,140" stroke="#4A3018" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M385,230 Q440,190 500,175" stroke="#4A3018" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M378,170 Q360,120 320,100" stroke="#4A3018" strokeWidth="8" strokeLinecap="round" fill="none" />
      {/* canopy */}
      <circle cx="340" cy="175" r="70" fill="#1A3818" />
      <circle cx="430" cy="195" r="65" fill="#1A3818" />
      <circle cx="385" cy="140" r="75" fill="#224A20" />
      <circle cx="300" cy="155" r="50" fill="#1A3818" />
      <circle cx="460" cy="185" r="48" fill="#1A3818" />
      <circle cx="350" cy="110" r="40" fill="#2D5A28" />
      {/* zacchaeus on branch — leaning forward to look down */}
      <g transform="translate(432,182)">
        <circle cx="0" cy="-10" r="8" fill="#E87722" />
        <path d="M-7,0 L7,0 L5,18 L-5,18 Z" fill="#1B365D" />
        {/* legs hanging on branch */}
        <path d="M-5,16 L-8,30" stroke="#1B365D" strokeWidth="5" strokeLinecap="round" />
        <path d="M5,16 L8,30" stroke="#1B365D" strokeWidth="5" strokeLinecap="round" />
        {/* leaning forward, hand shading eyes */}
        <path d="M6,-2 Q18,-10 22,-8" stroke="#1B365D" strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>
      {/* crowd on road */}
      {[150,210,270,570,640,700,760].map((x,i) => (
        <g key={i} transform={`translate(${x},302)`}>
          <circle cx="0" cy="-14" r="10" fill="#0F1F3A" />
          <path d="M-8,0 L8,0 L6,18 L-6,18 Z" fill="#0F1F3A" />
        </g>
      ))}
      {/* Jesus figure — distinct, walking calmly, looking up */}
      <g transform="translate(400,295)">
        <circle cx="0" cy="-18" r="11" fill="#1B365D" />
        <path d="M-10,-4 L10,-4 L8,28 L-8,28 Z" fill="#009681" opacity="0.9" />
        <path d="M-8,24 Q-14,38 -10,48" stroke="#009681" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.9" />
        <path d="M8,24 Q14,38 10,48" stroke="#009681" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.9" />
        {/* arm raised, pointing up */}
        <path d="M10,-4 Q26,-16 30,-24" stroke="#009681" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.9" />
      </g>
    </svg>
  );
}

/* ── Woman at the Well — stone well at noon, two figures ──────────────── */
function WellArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="well-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6A9FCA" />
          <stop offset="55%" stopColor="#D4A84A" />
          <stop offset="100%" stopColor="#C4884A" />
        </linearGradient>
        <radialGradient id="well-sun" cx="0.62" cy="0.1" r="0.22">
          <stop offset="0%" stopColor="#F3D54E" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#F3D54E" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#F3D54E" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="well-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4A050" />
          <stop offset="100%" stopColor="#8A5A20" />
        </linearGradient>
      </defs>
      <rect width="800" height="400" fill="url(#well-sky)" />
      <rect width="800" height="400" fill="url(#well-sun)" />
      {/* harsh midday sun */}
      <circle cx="500" cy="42" r="26" fill="#F3D54E" opacity="0.92" />
      {/* distant hills */}
      <path d="M0,235 Q300,205 600,225 Q720,215 800,230 L800,400 L0,400 Z" fill="#C4884A" opacity="0.4" />
      {/* ground */}
      <path d="M0,280 L800,280 L800,400 L0,400 Z" fill="url(#well-ground)" />
      {/* well — stone cylinder */}
      <ellipse cx="400" cy="296" rx="52" ry="16" fill="#1B1A2E" opacity="0.3" />
      <rect x="350" y="240" width="100" height="60" rx="4" fill="#8A7A5A" />
      <rect x="350" y="240" width="100" height="60" rx="4" fill="none" stroke="#5A4A2A" strokeWidth="2" />
      {/* stone coursing */}
      {[260,280,300].map((y,i) => (
        <path key={i} d={`M350,${y} L450,${y}`} stroke="#5A4A2A" strokeWidth="1.2" opacity="0.4" />
      ))}
      <ellipse cx="400" cy="242" rx="52" ry="14" fill="#A89870" />
      <ellipse cx="400" cy="238" rx="48" ry="12" fill="#2A2018" />
      {/* rope over crossbar */}
      <rect x="338" y="200" width="4" height="52" fill="#5A3A18" />
      <rect x="458" y="200" width="4" height="52" fill="#5A3A18" />
      <rect x="336" y="196" width="128" height="8" rx="3" fill="#5A3A18" />
      <path d="M400,204 L400,240" stroke="#8A6030" strokeWidth="3" strokeDasharray="4 3" />
      {/* woman seated on well edge */}
      <g transform="translate(362,242)">
        <circle cx="0" cy="-24" r="10" fill="#C8956A" />
        {/* head covering */}
        <path d="M-12,-28 Q0,-44 14,-26 Q10,-14 -10,-14 Z" fill="#8A4A20" />
        <path d="M-10,-4 L10,-4 L8,24 L-8,24 Z" fill="#B87A40" />
        {/* arm reaching toward well */}
        <path d="M10,-2 Q24,4 30,14" stroke="#B87A40" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* legs, seated */}
        <path d="M-8,22 L-12,40" stroke="#B87A40" strokeWidth="6" strokeLinecap="round" />
        <path d="M8,22 L10,40" stroke="#B87A40" strokeWidth="6" strokeLinecap="round" />
        {/* water jar beside her */}
        <ellipse cx="34" cy="34" rx="10" ry="14" fill="#8A4A20" />
        <ellipse cx="34" cy="20" rx="7" ry="5" fill="#6A3210" />
      </g>
      {/* Jesus, seated opposite */}
      <g transform="translate(452,252)">
        <circle cx="0" cy="-22" r="10" fill="#1B1A2E" />
        <path d="M-10,-4 L10,-4 L8,22 L-8,22 Z" fill="#1B365D" />
        {/* leaning forward, engaged */}
        <path d="M10,-2 Q18,4 16,14" stroke="#1B365D" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M-8,20 L-10,38" stroke="#1B365D" strokeWidth="6" strokeLinecap="round" />
        <path d="M8,20 L10,38" stroke="#1B365D" strokeWidth="6" strokeLinecap="round" />
      </g>
      {/* short shadow under well (midday) */}
      <ellipse cx="400" cy="305" rx="40" ry="6" fill="#1A0E00" opacity="0.25" />
    </svg>
  );
}

/* ── Rich Young Ruler — man walking away, back to viewer ──────────────── */
function RichRulerArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="rr-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B1A2E" />
          <stop offset="60%" stopColor="#3A2A18" />
          <stop offset="100%" stopColor="#6A4A28" />
        </linearGradient>
        <radialGradient id="rr-glow" cx="0.22" cy="0.6" r="0.3">
          <stop offset="0%" stopColor="#F3D54E" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#F3D54E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#rr-sky)" />
      <rect width="800" height="400" fill="url(#rr-glow)" />
      {/* road going away */}
      <path d="M240,400 L560,400 L490,270 L310,270 Z" fill="#3A2810" opacity="0.5" />
      {/* ground */}
      <path d="M0,310 L800,310 L800,400 L0,400 Z" fill="#2A1A08" />
      {/* possessions left behind, scattered */}
      <g transform="translate(200,295)" opacity="0.7">
        {/* coin bag */}
        <ellipse cx="0" cy="8" rx="18" ry="12" fill="#B8893F" />
        <path d="M-6,-4 Q0,-16 6,-4" stroke="#8A6020" strokeWidth="3" fill="none" />
        <ellipse cx="0" cy="-2" rx="12" ry="6" fill="#8A6020" />
      </g>
      <g transform="translate(260,300)" opacity="0.6">
        {/* ring/jewel */}
        <circle cx="0" cy="0" r="10" fill="none" stroke="#F3D54E" strokeWidth="3" />
        <circle cx="0" cy="0" r="5" fill="#4A8ACA" opacity="0.8" />
      </g>
      <g transform="translate(178,305)" opacity="0.5">
        {/* small chest */}
        <rect x="-16" y="-8" width="32" height="20" rx="2" fill="#5A3A10" />
        <rect x="-16" y="-8" width="32" height="8" rx="2" fill="#7A5A28" />
        <rect x="-3" y="-10" width="6" height="6" rx="1" fill="#B8893F" />
      </g>
      {/* the young man walking away — back to viewer, head slightly bowed */}
      <g transform="translate(490,250)">
        <circle cx="0" cy="-18" r="12" fill="#0F1F3A" />
        <path d="M-12,-4 L12,-4 L10,32 L-10,32 Z" fill="#1B365D" />
        {/* fine cloak */}
        <path d="M-12,-4 Q-26,14 -22,44" stroke="#1B365D" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M12,-4 Q26,14 22,44" stroke="#1B365D" strokeWidth="8" strokeLinecap="round" fill="none" />
        {/* arms at sides, dejected */}
        <path d="M-11,4 Q-22,14 -20,26" stroke="#0F1F3A" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M11,4 Q22,14 20,26" stroke="#0F1F3A" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* feet walking away */}
        <path d="M-10,30 L-14,50" stroke="#0F1F3A" strokeWidth="6" strokeLinecap="round" />
        <path d="M10,30 L8,50" stroke="#0F1F3A" strokeWidth="6" strokeLinecap="round" />
      </g>
      {/* Jesus, standing still, watching */}
      <g transform="translate(260,264)" opacity="0.8">
        <circle cx="0" cy="-18" r="11" fill="#0F1F3A" />
        <path d="M-10,-4 L10,-4 L8,28 L-8,28 Z" fill="#009681" opacity="0.7" />
        <path d="M-8,24 Q-12,38 -8,48" stroke="#009681" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.7" />
        <path d="M8,24 Q12,38 8,48" stroke="#009681" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.7" />
      </g>
    </svg>
  );
}

/* ── Bartimaeus — blind man on road edge, arms raised, crowd surging ───── */
function BartimaeusArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="bart-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E87722" stopOpacity="0.5" />
          <stop offset="35%" stopColor="#C4884A" />
          <stop offset="100%" stopColor="#7A4A18" />
        </linearGradient>
        <radialGradient id="bart-dust" cx="0.5" cy="1" r="0.6">
          <stop offset="0%" stopColor="#D4A050" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#D4A050" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#bart-sky)" />
      {/* dust haze from crowd */}
      <rect width="800" height="400" fill="url(#bart-dust)" />
      {/* ground / road */}
      <path d="M0,300 L800,300 L800,400 L0,400 Z" fill="#5A3A10" />
      <path d="M0,315 L800,315" stroke="#8A6030" strokeWidth="1.5" opacity="0.35" />
      {/* crowd surging — multiple heads and bodies */}
      {[130,185,240,295,490,545,600,650,710,760].map((x,i) => (
        <g key={i} transform={`translate(${x},${285 + (i%3)*5})`}>
          <circle cx="0" cy="-16" r="10" fill="#0F1F3A" opacity={0.75 + i%3 * 0.1} />
          <path d="M-8,-2 L8,-2 L6,18 L-6,18 Z" fill="#0F1F3A" opacity={0.7 + i%3 * 0.1} />
        </g>
      ))}
      {/* Bartimaeus — seated on road edge, cloak on ground, arms thrown up */}
      <g transform="translate(396,300)">
        {/* cloak spread on ground */}
        <path d="M-40,8 Q0,18 40,8 L30,-4 Q0,4 -30,-4 Z" fill="#4A2A08" opacity="0.7" />
        {/* seated body */}
        <path d="M-14,0 L14,0 L10,-22 L-10,-22 Z" fill="#1B1A2E" />
        <circle cx="0" cy="-30" r="11" fill="#1B1A2E" />
        {/* cloak over head */}
        <path d="M-13,-26 Q0,-46 14,-26 Q10,-14 -10,-14 Z" fill="#2A1A0A" />
        {/* both arms raised high, desperate */}
        <path d="M12,-18 Q26,-36 22,-52" stroke="#1B1A2E" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M-12,-18 Q-26,-36 -22,-52" stroke="#1B1A2E" strokeWidth="7" strokeLinecap="round" fill="none" />
        {/* hands at top */}
        <circle cx="22" cy="-52" r="5" fill="#C8956A" />
        <circle cx="-22" cy="-52" r="5" fill="#C8956A" />
      </g>
      {/* walking stick beside him */}
      <path d="M430,308 L428,255" stroke="#4A2A08" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

/* ── Talents — one figure digging at night, burying something ─────────── */
function TalentsArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="tal-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#04060E" />
          <stop offset="100%" stopColor="#0A1020" />
        </linearGradient>
        <radialGradient id="tal-moon" cx="0.72" cy="0.22" r="0.18">
          <stop offset="0%" stopColor="#E8E0C8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#E8E0C8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#tal-sky)" />
      <rect width="800" height="400" fill="url(#tal-moon)" />
      {/* stars */}
      {[[60,30],[140,18],[240,45],[380,22],[520,38],[640,14],[720,52],[80,80],[310,60],[580,72]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={i%3===0?1.8:1.2} fill="#E8E0C8" opacity={0.4+i%4*0.15} />
      ))}
      {/* moon */}
      <circle cx="576" cy="88" r="22" fill="#E8E0C8" opacity="0.75" />
      <circle cx="584" cy="82" r="18" fill="#0A1020" />
      {/* tree silhouette */}
      <path d="M580,400 Q574,320 570,240 Q564,170 574,100" stroke="#0A1020" strokeWidth="18" strokeLinecap="round" fill="none" />
      <circle cx="548" cy="145" r="55" fill="#04060E" />
      <circle cx="600" cy="130" r="48" fill="#04060E" />
      <circle cx="575" cy="110" r="42" fill="#0A1020" />
      {/* ground */}
      <path d="M0,320 L800,320 L800,400 L0,400 Z" fill="#0A0C0A" />
      {/* disturbed earth — hole being dug */}
      <ellipse cx="380" cy="332" rx="50" ry="14" fill="#1A1408" />
      <ellipse cx="380" cy="328" rx="38" ry="10" fill="#0A0804" />
      {/* mound of dirt beside */}
      <path d="M340,326 Q320,305 300,318 Q310,330 340,332 Z" fill="#1A1408" />
      {/* figure crouching, digging */}
      <g transform="translate(396,298)">
        <circle cx="0" cy="-20" r="10" fill="#0F1F3A" />
        <path d="M-10,-4 L10,-4 Q14,16 8,28 L-8,28 Q-14,16 -10,-4 Z" fill="#0F1F3A" />
        {/* bent low */}
        <path d="M10,-2 Q28,8 36,22" stroke="#0F1F3A" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M-10,-2 Q-22,4 -28,16" stroke="#0F1F3A" strokeWidth="7" strokeLinecap="round" fill="none" />
      </g>
      {/* shovel */}
      <path d="M424,280 L450,330" stroke="#3A2A10" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="452" cy="334" rx="10" ry="6" fill="#2A1A08" transform="rotate(-30,452,334)" />
      {/* coin bag in the hole */}
      <ellipse cx="372" cy="330" rx="14" ry="9" fill="#B8893F" opacity="0.6" />
      <path d="M366,322 Q372,316 378,322" stroke="#8A6020" strokeWidth="2.5" fill="none" />
    </svg>
  );
}

/* ── Unmerciful Servant — man seizing another by the collar ──────────── */
function DebtArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="debt-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A0E08" />
          <stop offset="100%" stopColor="#2A1A10" />
        </linearGradient>
        <linearGradient id="debt-wall" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0A0804" />
          <stop offset="100%" stopColor="#1A1408" />
        </linearGradient>
      </defs>
      <rect width="800" height="400" fill="url(#debt-bg)" />
      {/* cobblestone alley wall */}
      <rect x="0" y="0" width="800" height="240" fill="url(#debt-wall)" />
      {[0,48,96,144,192].map((y,i) => (
        <path key={i} d={`M0,${y} L800,${y}`} stroke="#2A1A0A" strokeWidth="1" opacity="0.6" />
      ))}
      {[80,200,320,440,560,680].map((x,i) => (
        <path key={i} d={`M${x},${i%2===0?0:48} L${x},${i%2===0?48:96}`} stroke="#2A1A0A" strokeWidth="1" opacity="0.5" />
      ))}
      {/* iron bars suggesting prison */}
      <g opacity="0.25">
        {[580,610,640,670,700].map((x,i) => (
          <rect key={i} x={x} y={0} width="6" height="230" fill="#4A3A28" />
        ))}
        <rect x="570" y="0" width="148" height="6" fill="#4A3A28" />
        <rect x="570" y="220" width="148" height="6" fill="#4A3A28" />
      </g>
      {/* ground */}
      <path d="M0,240 L800,240 L800,400 L0,400 Z" fill="#1A0C04" />
      {/* debtor — groveling, hands together, on knees */}
      <g transform="translate(500,265)">
        <circle cx="0" cy="-8" r="9" fill="#2A1808" />
        <path d="M-9,0 L9,0 L6,22 L-6,22 Z" fill="#2A1808" />
        {/* bent low, on knees */}
        <path d="M-8,20 L-12,38 L-20,42" stroke="#2A1808" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M8,20 L10,38 L18,42" stroke="#2A1808" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* hands clasped together begging */}
        <path d="M-6,2 Q-2,-10 6,-6 Q14,-2 10,8" stroke="#3A2818" strokeWidth="6" strokeLinecap="round" fill="none" />
        <circle cx="-4" cy="-6" r="5" fill="#3A2818" />
      </g>
      {/* unmerciful servant — aggressive, grabbing the man */}
      <g transform="translate(370,240)">
        <circle cx="0" cy="-20" r="11" fill="#0F1F3A" />
        <path d="M-11,-4 L11,-4 L9,28 L-9,28 Z" fill="#1B365D" />
        {/* legs, planted wide, confrontational stance */}
        <path d="M-9,26 L-16,55" stroke="#0F1F3A" strokeWidth="7" strokeLinecap="round" />
        <path d="M9,26 L14,55" stroke="#0F1F3A" strokeWidth="7" strokeLinecap="round" />
        {/* arm extended forward, grabbing */}
        <path d="M11,-4 Q44,10 56,14" stroke="#0F1F3A" strokeWidth="8" strokeLinecap="round" fill="none" />
        {/* other fist clenched */}
        <path d="M-11,-4 Q-26,-2 -30,6" stroke="#0F1F3A" strokeWidth="8" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

/* ── Narrow Gate — a lone figure at a narrow stone gate, wide road beside */
function GateArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="gate-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A0E1A" />
          <stop offset="55%" stopColor="#1B2A4A" />
          <stop offset="100%" stopColor="#2D3A5A" />
        </linearGradient>
        <radialGradient id="gate-light" cx="0.5" cy="0.6" r="0.22">
          <stop offset="0%" stopColor="#F3D54E" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#F3D54E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#gate-sky)" />
      {/* stars */}
      {[[60,22],[180,14],[320,38],[480,18],[640,30],[740,12],[100,60],[420,48]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill="#E8E0C8" opacity="0.5" />
      ))}
      {/* wide road — sweeping left, crowded way */}
      <path d="M0,310 Q280,290 800,320 L800,400 L0,400 Z" fill="#1A1208" opacity="0.8" />
      {/* crowd going wide way */}
      {[80,140,190,240,600,660,720,770].map((x,i) => (
        <g key={i} transform={`translate(${x},${296+i%2*8})`} opacity="0.6">
          <circle cx="0" cy="-12" r="8" fill="#0F1F3A" />
          <path d="M-6,0 L6,0 L4,16 L-4,16 Z" fill="#0F1F3A" />
        </g>
      ))}
      {/* stone wall across middle */}
      <rect x="0" y="220" width="800" height="50" fill="#2A2018" />
      {[0,60,120,180,240,300,360,420,480,540,600,660,720,780].map((x,i) => (
        <rect key={i} x={x+2} y={222} width={56} height={22} rx="1" fill="#1A1408" opacity="0.5" />
      ))}
      {/* wide gate — big opening on the right side, with crowd */}
      <rect x="550" y="150" width="250" height="120" fill="#1A1208" opacity="0.5" />
      <rect x="548" y="148" width="5" height="124" fill="#3A2A18" />
      <rect x="798" y="148" width="5" height="124" fill="#3A2A18" />
      <rect x="548" y="148" width="255" height="8" fill="#3A2A18" />
      {/* narrow gate — small opening center-left, with light beyond */}
      <rect x="354" y="155" width="64" height="113" fill="url(#gate-light)" />
      <rect x="354" y="165" width="64" height="103" fill="#F3D54E" opacity="0.08" />
      {/* gate pillars */}
      <rect x="348" y="150" width="8" height="120" fill="#4A3A28" />
      <rect x="416" y="150" width="8" height="120" fill="#4A3A28" />
      <rect x="348" y="150" width="76" height="8" rx="2" fill="#4A3A28" />
      {/* lone figure at narrow gate, pausing */}
      <g transform="translate(386,248)">
        <circle cx="0" cy="-18" r="9" fill="#1B365D" />
        <path d="M-9,-4 L9,-4 L7,22 L-7,22 Z" fill="#1B365D" />
        <path d="M-7,20 L-9,38" stroke="#1B365D" strokeWidth="5" strokeLinecap="round" />
        <path d="M7,20 L9,38" stroke="#1B365D" strokeWidth="5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* ── Elder Brother — figure outside at night, warm light from windows ─── */
function ElderArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="el-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#020408" />
          <stop offset="100%" stopColor="#0A1008" />
        </linearGradient>
        <radialGradient id="el-window1" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#E87722" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#E87722" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#E87722" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="el-window2" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#F3D54E" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#F3D54E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#el-sky)" />
      {/* stars */}
      {[[50,25],[120,15],[250,40],[370,18],[480,32],[600,20],[700,44],[160,70],[540,58]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.4" fill="#E8E0C8" opacity="0.5" />
      ))}
      {/* farmhouse */}
      <rect x="420" y="120" width="320" height="220" fill="#0A0C08" />
      <path d="M410,120 L580,60 L750,120 Z" fill="#0A0C08" />
      {/* chimney */}
      <rect x="680" y="40" width="20" height="55" fill="#0A0C08" />
      {/* window glow 1 */}
      <rect x="450" y="155" width="75" height="90" rx="3" fill="#E87722" opacity="0.15" />
      <rect x="454" y="159" width="67" height="82" fill="url(#el-window1)" />
      <rect x="454" y="159" width="67" height="82" rx="2" fill="none" stroke="#E87722" strokeWidth="2" opacity="0.5" />
      {/* window glow 2 */}
      <rect x="570" y="155" width="75" height="90" rx="3" fill="#F3D54E" opacity="0.1" />
      <rect x="574" y="159" width="67" height="82" fill="url(#el-window2)" />
      <rect x="574" y="159" width="67" height="82" rx="2" fill="none" stroke="#F3D54E" strokeWidth="2" opacity="0.4" />
      {/* light spilling from door */}
      <path d="M480,340 Q520,320 560,340 L560,400 L480,400 Z" fill="#E87722" opacity="0.18" />
      <rect x="490" y="290" width="60" height="90" fill="#E87722" opacity="0.25" />
      {/* ground */}
      <path d="M0,350 L800,350 L800,400 L0,400 Z" fill="#060808" />
      {/* elder brother — standing with arms crossed, turned away from house */}
      <g transform="translate(230,315)">
        <circle cx="0" cy="-22" r="12" fill="#0F1F3A" />
        <path d="M-12,-4 L12,-4 L10,30 L-10,30 Z" fill="#0F1F3A" />
        {/* arms folded across chest */}
        <path d="M-12,-2 Q-6,6 6,4" stroke="#0F1F3A" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M12,-2 Q6,6 -6,4" stroke="#0F1F3A" strokeWidth="7" strokeLinecap="round" fill="none" />
        {/* legs — standing firm */}
        <path d="M-10,28 L-12,50" stroke="#0F1F3A" strokeWidth="7" strokeLinecap="round" />
        <path d="M10,28 L12,50" stroke="#0F1F3A" strokeWidth="7" strokeLinecap="round" />
        {/* slight turn toward house — he can't fully look away */}
        <path d="M10,-14 Q22,-10 24,-4" stroke="#1B1A2E" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.5" />
      </g>
      {/* field tool beside him — he came from work */}
      <path d="M270,310 L274,355" stroke="#2A1A08" strokeWidth="4" strokeLinecap="round" />
      <path d="M268,310 L282,316" stroke="#2A1A08" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* ── Pharisee & Tax Collector — two figures praying, one front/one back ── */
function PhariseeArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="ph-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A0E18" />
          <stop offset="100%" stopColor="#141E30" />
        </linearGradient>
        <radialGradient id="ph-col-glow" cx="0.3" cy="0.4" r="0.4">
          <stop offset="0%" stopColor="#F3D54E" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#F3D54E" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ph-back-glow" cx="0.72" cy="0.7" r="0.2">
          <stop offset="0%" stopColor="#4A6A9A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#4A6A9A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#ph-bg)" />
      {/* temple columns */}
      {[80, 200, 560, 700].map((x,i) => (
        <g key={i}>
          <rect x={x-15} y={0} width={30} height={380} fill="#1A2040" opacity={0.7} />
          <rect x={x-18} y={0} width={36} height={16} fill="#242A4A" opacity={0.7} />
          <rect x={x-20} y={-6} width={40} height={8} fill="#2A3050" opacity={0.7} />
          <rect x={x-6} y={16} width={4} height={360} fill="#0A0E1A" opacity={0.4} />
          <rect x={x+2} y={16} width={4} height={360} fill="#0A0E1A" opacity={0.4} />
        </g>
      ))}
      {/* floor tiles */}
      {[0,80,160,240,320].map((y,i) => (
        <path key={i} d={`M0,${380-y} L800,${380-y}`} stroke="#1A2040" strokeWidth="1" opacity="0.3" />
      ))}
      {/* pharisee glow */}
      <rect x="100" y="0" width="400" height="400" fill="url(#ph-col-glow)" />
      {/* pharisee — center-front, arms raised, upright posture */}
      <g transform="translate(300,270)">
        <circle cx="0" cy="-28" r="13" fill="#1B2A4A" />
        {/* prayer shawl */}
        <path d="M-16,-22 Q-20,-34 -10,-40 Q0,-48 10,-40 Q20,-34 16,-22" fill="#2A3A5A" />
        <path d="M-14,-4 L14,-4 L12,32 L-12,32 Z" fill="#2A3A5A" />
        <path d="M-12,28 Q-22,44 -18,56" stroke="#2A3A5A" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M12,28 Q22,44 18,56" stroke="#2A3A5A" strokeWidth="7" strokeLinecap="round" fill="none" />
        {/* arms raised in prayer — prominent, confident */}
        <path d="M14,-8 Q36,-24 42,-38" stroke="#2A3A5A" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M-14,-8 Q-36,-24 -42,-38" stroke="#2A3A5A" strokeWidth="8" strokeLinecap="round" fill="none" />
        {/* hands open */}
        <circle cx="42" cy="-40" r="6" fill="#2A3A5A" />
        <circle cx="-42" cy="-40" r="6" fill="#2A3A5A" />
      </g>
      {/* tax collector — far back, head bowed, hand on chest */}
      <rect x="100" y="100" width="600" height="300" fill="url(#ph-back-glow)" />
      <g transform="translate(590,330)" opacity="0.85">
        <circle cx="0" cy="-16" r="9" fill="#0A0E1A" />
        {/* head sharply bowed */}
        <path d="M-9,-2 L9,-2 L7,20 L-7,20 Z" fill="#0A0E1A" />
        <path d="M-7,18 L-9,34" stroke="#0A0E1A" strokeWidth="5" strokeLinecap="round" />
        <path d="M7,18 L9,34" stroke="#0A0E1A" strokeWidth="5" strokeLinecap="round" />
        {/* hand on chest */}
        <path d="M-8,-2 Q-4,8 4,6" stroke="#0A0E1A" strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

/* ── Martha — figure in kitchen doorway, light from the other room ──────── */
function MarthaArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="mar-kitchen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A0E08" />
          <stop offset="100%" stopColor="#2A1808" />
        </linearGradient>
        <radialGradient id="mar-room-light" cx="0.75" cy="0.5" r="0.6">
          <stop offset="0%" stopColor="#E87722" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#E87722" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#E87722" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#mar-kitchen)" />
      {/* wall dividing kitchen from the other room */}
      <rect x="490" y="0" width="22" height="400" fill="#1A0E08" />
      <rect x="702" y="0" width="22" height="400" fill="#1A0E08" />
      {/* the other room — warm orange glow */}
      <rect x="512" y="0" width="190" height="400" fill="#0E0804" />
      <rect x="512" y="0" width="190" height="400" fill="url(#mar-room-light)" />
      {/* doorway opening */}
      <rect x="490" y="100" width="234" height="280" fill="#0E0804" />
      <rect x="490" y="100" width="234" height="280" fill="url(#mar-room-light)" />
      {/* two silhouettes in the other room — seated, in conversation */}
      <g transform="translate(580,290)" opacity="0.6">
        <circle cx="0" cy="-18" r="10" fill="#1A0C04" />
        <path d="M-9,-2 L9,-2 L7,22 L-7,22 Z" fill="#1A0C04" />
      </g>
      <g transform="translate(650,285)" opacity="0.55">
        <circle cx="0" cy="-20" r="11" fill="#1A0C04" />
        <path d="M-10,-4 L10,-4 L8,24 L-8,24 Z" fill="#1A0C04" />
      </g>
      {/* kitchen counter / surface */}
      <rect x="0" y="290" width="490" height="14" fill="#3A2010" />
      {/* dishes and work items on counter */}
      <g transform="translate(80,280)">
        <ellipse cx="0" cy="0" rx="28" ry="8" fill="#2A1808" />
        <ellipse cx="0" cy="-6" rx="22" ry="14" fill="#3A2010" />
        <ellipse cx="0" cy="-6" rx="22" ry="14" fill="none" stroke="#5A3818" strokeWidth="1.5" />
      </g>
      <g transform="translate(170,284)">
        <ellipse cx="0" cy="2" rx="18" ry="6" fill="#2A1808" />
        <ellipse cx="0" cy="-8" rx="10" ry="18" fill="#3A2010" />
        <ellipse cx="0" cy="-24" rx="6" ry="4" fill="#2A1808" />
      </g>
      <g transform="translate(260,286)">
        <ellipse cx="0" cy="0" rx="24" ry="7" fill="#2A1808" />
        <rect x="-20" y="-18" width="40" height="18" rx="3" fill="#3A2010" />
        <ellipse cx="0" cy="-18" rx="22" ry="5" fill="#2A1808" />
      </g>
      {/* martha in the doorway — half in kitchen, looking into other room */}
      <g transform="translate(450,255)">
        <circle cx="0" cy="-22" r="11" fill="#8A4A20" />
        {/* head covering */}
        <path d="M-13,-26 Q0,-44 14,-26 Q10,-12 -10,-12 Z" fill="#5A2810" />
        <path d="M-11,-4 L11,-4 L9,28 L-9,28 Z" fill="#7A4020" />
        <path d="M-9,26 Q-16,40 -12,52" stroke="#7A4020" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M9,26 Q16,40 12,52" stroke="#7A4020" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* arm holding a dish / cloth */}
        <path d="M-10,-2 Q-28,4 -36,14" stroke="#7A4020" strokeWidth="7" strokeLinecap="round" fill="none" />
        <ellipse cx="-40" cy="18" rx="12" ry="6" fill="#5A2810" />
        {/* leaning slightly toward doorway — looking in */}
        <path d="M10,-2 Q20,2 22,10" stroke="#7A4020" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.6" />
      </g>
      {/* light falling on martha from the room */}
      <path d="M490,100 L490,380 L430,380 L430,100 Z" fill="#E87722" opacity="0.06" />
    </svg>
  );
}

/* ── Nicodemus — lone figure approaching a lamp in the dark of night ───── */
function NicodemusArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="nic-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#01010A" />
          <stop offset="100%" stopColor="#03030E" />
        </linearGradient>
        <radialGradient id="nic-lamp" cx="0.6" cy="0.55" r="0.35">
          <stop offset="0%" stopColor="#F3D54E" stopOpacity="0.7" />
          <stop offset="40%" stopColor="#E87722" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#E87722" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#nic-sky)" />
      {/* faint stars */}
      {[[50,18],[150,35],[280,12],[420,44],[530,22],[660,38],[740,14],[100,55],[350,50]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.2" fill="#E8E0C8" opacity="0.4" />
      ))}
      {/* moon sliver */}
      <path d="M700,50 Q724,34 736,60 Q716,56 700,50 Z" fill="#E8E0C8" opacity="0.6" />
      {/* lamp glow — the meeting point */}
      <rect x="200" y="100" width="500" height="350" fill="url(#nic-lamp)" />
      {/* stone wall / building edge */}
      <rect x="560" y="0" width="240" height="400" fill="#030308" />
      {[0,60,120,180,240,300,360].map((y,i) => (
        <path key={i} d={`M560,${y} L800,${y}`} stroke="#0A0A18" strokeWidth="1" opacity="0.5" />
      ))}
      {[600,650,700,750].map((x,i) => (
        <path key={i} d={`M${x},${i%2===0?0:60} L${x},${i%2===0?60:120}`} stroke="#0A0A18" strokeWidth="1" opacity="0.4" />
      ))}
      {/* doorway arch with lamp beside it */}
      <path d="M520,160 Q520,60 600,60 Q680,60 680,160 L680,380 L520,380 Z" fill="#020208" />
      <path d="M522,162 Q522,64 600,64 Q678,64 678,162" fill="none" stroke="#1A1A30" strokeWidth="3" opacity="0.6" />
      {/* oil lamp on ledge */}
      <g transform="translate(510,220)">
        <ellipse cx="0" cy="8" rx="16" ry="5" fill="#3A2A10" />
        <path d="M-14,4 L14,4 L12,-4 L-12,-4 Z" fill="#5A3A18" />
        <ellipse cx="14" cy="0" rx="5" ry="7" fill="#F3D54E" opacity="0.8" />
        <circle cx="14" cy="-6" r="4" fill="#F3D54E" />
        <circle cx="14" cy="-10" r="2" fill="#FFF8E0" opacity="0.9" />
        {/* lamp ledge */}
        <rect x="-22" y="8" width="44" height="8" rx="2" fill="#2A1A08" />
      </g>
      {/* ground */}
      <path d="M0,355 L800,355 L800,400 L0,400 Z" fill="#020206" />
      {/* nicodemus — cloaked, approaching carefully, alone */}
      <g transform="translate(260,310)">
        <circle cx="0" cy="-24" r="11" fill="#0A0A18" />
        {/* hood pulled up */}
        <path d="M-14,-28 Q0,-50 14,-28 Q10,-12 -10,-12 Z" fill="#080818" />
        <path d="M-13,-4 L13,-4 L11,32 L-11,32 Z" fill="#0A0A1A" />
        {/* robe, long */}
        <path d="M-11,28 Q-18,48 -14,60" stroke="#080818" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M11,28 Q18,48 14,60" stroke="#080818" strokeWidth="7" strokeLinecap="round" fill="none" />
        {/* one arm raised slightly — reaching? gesturing? */}
        <path d="M12,-4 Q26,2 28,14" stroke="#0A0A1A" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* staff */}
        <path d="M-16,28 L-18,62" stroke="#1A1A10" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* ── Rich Fool — filled barn, small figure before it, dark sky above ────── */
function RichFoolArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="rf-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#04050A" />
          <stop offset="70%" stopColor="#0E0A04" />
          <stop offset="100%" stopColor="#1A1208" />
        </linearGradient>
        <linearGradient id="rf-barn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A1A08" />
          <stop offset="100%" stopColor="#1A0E04" />
        </linearGradient>
        <radialGradient id="rf-door-glow" cx="0.5" cy="0.8" r="0.35">
          <stop offset="0%" stopColor="#E87722" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#E87722" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#rf-sky)" />
      {/* single cold star — a fading one */}
      <circle cx="400" cy="35" r="2.5" fill="#E8E0C8" opacity="0.5" />
      <circle cx="400" cy="35" r="5" fill="#E8E0C8" opacity="0.08" />
      {/* ground */}
      <path d="M0,340 L800,340 L800,400 L0,400 Z" fill="#0A0804" />
      {/* the barn — large, imposing, new construction */}
      <path d="M140,345 L140,160 L400,80 L660,160 L660,345 Z" fill="url(#rf-barn)" />
      {/* roof */}
      <path d="M130,162 L400,74 L670,162 Z" fill="#1A0E04" />
      <path d="M130,162 L400,74 L670,162" stroke="#2A1A08" strokeWidth="3" fill="none" opacity="0.7" />
      {/* barn planks */}
      {[200,260,320,380,440,500,560,620].map((x,i) => (
        <path key={i} d={`M${x},160 L${x},345`} stroke="#120C04" strokeWidth="2" opacity="0.4" />
      ))}
      {/* barn door (big, open, light spilling) */}
      <rect x="320" y="230" width="160" height="115" fill="#0E0804" />
      <rect x="320" y="230" width="160" height="115" fill="url(#rf-door-glow)" />
      {/* grain / harvest visible inside */}
      <path d="M320,345 Q360,310 400,320 Q440,310 480,345 Z" fill="#B8893F" opacity="0.35" />
      {/* barn door frame */}
      <rect x="318" y="228" width="5" height="117" fill="#2A1A08" />
      <rect x="477" y="228" width="5" height="117" fill="#2A1A08" />
      <rect x="318" y="226" width="164" height="6" fill="#2A1A08" />
      {/* center post */}
      <rect x="399" y="228" width="4" height="117" fill="#2A1A08" opacity="0.5" />
      {/* figure in front — triumphant stance, hands on hips */}
      <g transform="translate(400,325)">
        <circle cx="0" cy="-22" r="11" fill="#1A1408" />
        <path d="M-11,-4 L11,-4 L9,26 L-9,26 Z" fill="#1A1408" />
        <path d="M-9,24 L-11,42" stroke="#1A1408" strokeWidth="6" strokeLinecap="round" />
        <path d="M9,24 L11,42" stroke="#1A1408" strokeWidth="6" strokeLinecap="round" />
        {/* arms out, hands on hips — satisfied posture */}
        <path d="M-11,-2 Q-28,4 -32,14" stroke="#1A1408" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M11,-2 Q28,4 32,14" stroke="#1A1408" strokeWidth="7" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

/* ── Ten Virgins — five lit lamps and five dark ones, a closed door ──── */
function VirginsArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="vir-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06040E" />
          <stop offset="100%" stopColor="#0A0814" />
        </linearGradient>
      </defs>
      <rect width="800" height="400" fill="url(#vir-bg)" />
      {/* floor */}
      <path d="M0,350 L800,350 L800,400 L0,400 Z" fill="#060408" />
      {/* the closed door — center back */}
      <rect x="340" y="120" width="120" height="230" rx="4" fill="#0A0808" />
      <rect x="340" y="120" width="120" height="230" rx="4" fill="none" stroke="#2A1A10" strokeWidth="3" opacity="0.7" />
      {/* door arch */}
      <path d="M340,120 Q340,80 400,80 Q460,80 460,120" fill="#0A0808" />
      <path d="M340,120 Q340,80 400,80 Q460,80 460,120" fill="none" stroke="#2A1A10" strokeWidth="3" opacity="0.7" />
      {/* door panels */}
      <rect x="350" y="135" width="46" height="80" rx="2" fill="none" stroke="#1A1010" strokeWidth="1.5" opacity="0.5" />
      <rect x="404" y="135" width="46" height="80" rx="2" fill="none" stroke="#1A1010" strokeWidth="1.5" opacity="0.5" />
      <rect x="350" y="228" width="46" height="100" rx="2" fill="none" stroke="#1A1010" strokeWidth="1.5" opacity="0.5" />
      <rect x="404" y="228" width="46" height="100" rx="2" fill="none" stroke="#1A1010" strokeWidth="1.5" opacity="0.5" />
      {/* door handle */}
      <circle cx="422" cy="240" r="6" fill="#2A1A10" />

      {/* FIVE LIT LAMPS — left side */}
      {[80, 140, 200, 260, 320].map((x, i) => (
        <g key={i} transform={`translate(${x}, 270)`}>
          {/* lamp body */}
          <ellipse cx="0" cy="8" rx="14" ry="5" fill="#3A2A10" />
          <path d="M-12,4 L12,4 L10,-4 L-10,-4 Z" fill="#7A5A28" />
          <ellipse cx="12" cy="-2" rx="5" ry="7" fill="#F3D54E" opacity="0.85" />
          <circle cx="12" cy="-8" r="3.5" fill="#F3D54E" />
          <circle cx="12" cy="-12" r="2" fill="#FFF8E0" opacity="0.9" />
          {/* glow */}
          <ellipse cx="12" cy="-8" rx="18" ry="14" fill="#F3D54E" opacity="0.12" />
          {/* handle */}
          <path d="M-12,0 Q-22,-4 -22,-12 Q-22,-20 -12,-16" stroke="#5A3A18" strokeWidth="2" fill="none" />
        </g>
      ))}

      {/* FIVE DARK LAMPS — right side */}
      {[480, 540, 600, 660, 720].map((x, i) => (
        <g key={i} transform={`translate(${x}, 270)`}>
          <ellipse cx="0" cy="8" rx="14" ry="5" fill="#1A1008" opacity="0.7" />
          <path d="M-12,4 L12,4 L10,-4 L-10,-4 Z" fill="#2A1A08" opacity="0.7" />
          <ellipse cx="12" cy="-2" rx="5" ry="7" fill="#1A1008" opacity="0.5" />
          {/* cold wick — no glow */}
          <circle cx="12" cy="-8" r="3" fill="#1A1008" opacity="0.5" />
          <path d="M-12,0 Q-22,-4 -22,-12 Q-22,-20 -12,-16" stroke="#2A1A08" strokeWidth="2" fill="none" opacity="0.5" />
        </g>
      ))}

      {/* dividing line — two sides */}
      <path d="M400,240 L400,380" stroke="#1A1010" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />

      {/* figures behind the lamps — small, waiting */}
      {[80, 140, 200, 260, 320].map((x, i) => (
        <g key={i} transform={`translate(${x}, 235)`} opacity="0.6">
          <circle cx="0" cy="-10" r="8" fill="#1A2A3A" />
          <path d="M-7,0 L7,0 L5,16 L-5,16 Z" fill="#1A2A3A" />
        </g>
      ))}
      {[480, 540, 600, 660, 720].map((x, i) => (
        <g key={i} transform={`translate(${x}, 235)`} opacity="0.4">
          <circle cx="0" cy="-10" r="8" fill="#1A1010" />
          <path d="M-7,0 L7,0 L5,16 L-5,16 Z" fill="#1A1010" />
        </g>
      ))}
    </svg>
  );
}

/* ── Peter on Water — figure on dark water, a hand reaching from above ── */
function WaterArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="wat-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#020408" />
          <stop offset="55%" stopColor="#060C1A" />
          <stop offset="100%" stopColor="#081422" />
        </linearGradient>
        <linearGradient id="wat-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A1828" />
          <stop offset="100%" stopColor="#040A10" />
        </linearGradient>
        <radialGradient id="wat-moon" cx="0.5" cy="0.25" r="0.25">
          <stop offset="0%" stopColor="#E8E0C8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#E8E0C8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#wat-sky)" />
      <rect width="800" height="400" fill="url(#wat-moon)" />
      {/* moon */}
      <circle cx="400" cy="60" r="28" fill="#E8E0C8" opacity="0.65" />
      <circle cx="412" cy="54" r="22" fill="#020408" />
      {/* moon reflection on water */}
      <ellipse cx="400" cy="290" rx="28" ry="8" fill="#E8E0C8" opacity="0.12" />
      {/* dark churning water */}
      <path d="M0,240 Q100,225 200,240 Q300,255 400,240 Q500,225 600,240 Q700,255 800,240 L800,400 L0,400 Z" fill="url(#wat-water)" />
      {/* waves */}
      {[0,1,2,3].map(i => (
        <path key={i} d={`M0,${258+i*22} Q100,${248+i*22} 200,${260+i*22} Q300,${272+i*22} 400,${260+i*22} Q500,${248+i*22} 600,${260+i*22} Q700,${272+i*22} 800,${260+i*22}`}
          stroke="#1A3050" strokeWidth="1.5" fill="none" opacity={0.6 - i*0.1} />
      ))}
      {/* white caps on waves */}
      {[[120,248],[350,256],[590,250],[680,264]].map(([x,y],i) => (
        <path key={i} d={`M${x-18},${y} Q${x},${y-8} ${x+18},${y}`} stroke="#E8E0C8" strokeWidth="2" fill="none" opacity="0.25" />
      ))}
      {/* boat in far background */}
      <g transform="translate(640,248)" opacity="0.45">
        <path d="M-50,10 Q0,-4 50,10 L40,22 L-40,22 Z" fill="#0A1020" />
        <path d="M0,22 L0,-20" stroke="#0A1020" strokeWidth="3" />
        <path d="M0,-20 L30,0 L0,0 Z" fill="#0A1020" opacity="0.5" />
      </g>
      {/* peter — standing on water, one arm raised, one beginning to sink */}
      <g transform="translate(370,244)">
        <circle cx="0" cy="-28" r="11" fill="#1B1A2E" />
        <path d="M-11,-12 L11,-12 L9,16 L-9,16 Z" fill="#1B365D" />
        {/* cloak */}
        <path d="M-11,-12 Q-20,2 -16,20" stroke="#1B365D" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M11,-12 Q20,2 16,20" stroke="#1B365D" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* feet just on water surface — one sinking */}
        <path d="M-9,14 L-10,32" stroke="#1B365D" strokeWidth="5" strokeLinecap="round" />
        <path d="M9,14 L10,32" stroke="#1B365D" strokeWidth="5" strokeLinecap="round" />
        {/* arm reaching desperately upward */}
        <path d="M-10,-14 Q-24,-34 -20,-50" stroke="#1B365D" strokeWidth="7" strokeLinecap="round" fill="none" />
        <circle cx="-20" cy="-52" r="5" fill="#C8956A" />
        {/* other arm out for balance */}
        <path d="M10,-14 Q28,-10 34,-4" stroke="#1B1A2E" strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>
      {/* the hand reaching from above — divine, reaching down to meet him */}
      <g transform="translate(340,160)">
        {/* arm coming from upper area */}
        <path d="M0,-40 Q0,-10 4,10" stroke="#E8E0C8" strokeWidth="9" strokeLinecap="round" fill="none" opacity="0.75" />
        {/* hand */}
        <path d="M-10,12 Q-12,28 -4,30 Q4,32 8,18 L4,8 Z" fill="#E8E0C8" opacity="0.75" />
        <path d="M8,18 Q14,34 20,32 Q26,28 22,16" stroke="#E8E0C8" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.75" />
        <path d="M4,8 Q12,4 18,14" stroke="#E8E0C8" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.75" />
      </g>
    </svg>
  );
}

/* ── Pool of Bethesda — figure on a mat beside still water ────────────── */
function PoolArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="pool-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A6A8A" />
          <stop offset="45%" stopColor="#7A9AB0" />
          <stop offset="100%" stopColor="#C4A870" />
        </linearGradient>
        <linearGradient id="pool-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A4A6A" />
          <stop offset="100%" stopColor="#1A2A3A" />
        </linearGradient>
        <radialGradient id="pool-sun" cx="0.7" cy="0.2" r="0.2">
          <stop offset="0%" stopColor="#F3D54E" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#F3D54E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#pool-sky)" />
      <rect width="800" height="400" fill="url(#pool-sun)" />
      {/* sun */}
      <circle cx="560" cy="70" r="24" fill="#F3D54E" opacity="0.85" />
      {/* stone columns / portico */}
      {[80, 180, 580, 680].map((x,i) => (
        <g key={i}>
          <rect x={x-12} y={40} width={24} height={220} fill="#8A7A5A" opacity="0.7" />
          <rect x={x-14} y={35} width={28} height={10} fill="#9A8A6A" opacity="0.7" />
        </g>
      ))}
      {/* lintel across top */}
      <rect x="68" y="35" width="136" height="10" fill="#7A6A4A" opacity="0.5" />
      <rect x="568" y="35" width="136" height="10" fill="#7A6A4A" opacity="0.5" />
      {/* pool — still water */}
      <rect x="100" y="220" width="600" height="130" rx="4" fill="url(#pool-water)" />
      <rect x="100" y="220" width="600" height="130" rx="4" fill="none" stroke="#2A4A6A" strokeWidth="2" opacity="0.5" />
      {/* pool steps leading to water */}
      <rect x="100" y="320" width="600" height="8" fill="#3A5A7A" opacity="0.4" />
      <rect x="100" y="328" width="600" height="8" fill="#2A4A6A" opacity="0.5" />
      {/* reflection ripple */}
      <ellipse cx="450" cy="235" rx="50" ry="6" fill="#F3D54E" opacity="0.1" />
      {[0,1,2,3].map(i => (
        <path key={i} d={`M${150+i*120},${230+i*8} Q${210+i*120},${224+i*8} ${270+i*120},${230+i*8}`}
          stroke="#3A6A8A" strokeWidth="1.2" fill="none" opacity="0.3" />
      ))}
      {/* stone ground / walkway */}
      <rect x="0" y="350" width="800" height="50" fill="#D4A870" />
      <rect x="0" y="205" width="800" height="18" fill="#C4A060" opacity="0.7" />
      {/* stone edge of pool */}
      <rect x="90" y="205" width="620" height="18" fill="#A08850" />
      {/* the man on his mat — lying beside the pool */}
      <g transform="translate(300,230)">
        {/* mat on the ground */}
        <rect x="-60" y="8" width="120" height="22" rx="4" fill="#7A5A28" opacity="0.7" />
        <path d="M-56,10 L56,10" stroke="#5A3A10" strokeWidth="1.5" opacity="0.5" />
        <path d="M-56,18 L56,18" stroke="#5A3A10" strokeWidth="1.5" opacity="0.5" />
        <path d="M-56,26 L56,26" stroke="#5A3A10" strokeWidth="1.5" opacity="0.5" />
        {/* body lying on mat */}
        <path d="M-50,10 Q-20,0 30,4 L52,12 Q20,20 -30,16 Z" fill="#1B1A2E" />
        <circle cx="-44" cy="6" r="9" fill="#1B1A2E" />
      </g>
      {/* standing figure — looking down at the man */}
      <g transform="translate(430,204)">
        <circle cx="0" cy="-22" r="11" fill="#1B1A2E" />
        <path d="M-11,-4 L11,-4 L9,26 L-9,26 Z" fill="#009681" opacity="0.85" />
        <path d="M-9,24 Q-14,38 -10,48" stroke="#009681" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.85" />
        <path d="M9,24 Q14,38 10,48" stroke="#009681" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.85" />
        {/* arm extended downward — offering hand */}
        <path d="M-10,-4 Q-24,10 -28,24" stroke="#009681" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.85" />
        <circle cx="-28" cy="26" r="5" fill="#2EBCA8" opacity="0.8" />
      </g>
      {/* other figures in background — lying, waiting */}
      {[[170,215],[560,218],[640,216]].map(([x,y],i) => (
        <g key={i} transform={`translate(${x},${y})`} opacity="0.4">
          <rect x="-30" y="6" width="60" height="12" rx="3" fill="#5A4020" />
          <path d="M-26,6 Q0,-2 24,2 L26,10 Q0,16 -26,12 Z" fill="#0A0A1A" />
          <circle cx="-22" cy="4" r="7" fill="#0A0A1A" />
        </g>
      ))}
    </svg>
  );
}

const ART = {
  prodigal:  ProdigalArt,
  samaritan: SamaritanArt,
  widow:     WidowArt,
  sower:     SowerArt,
  zacchaeus: ZacchaeusArt,
  well:      WellArt,
  richRuler: RichRulerArt,
  bartimaeus:BartimaeusArt,
  talents:   TalentsArt,
  debt:      DebtArt,
  gate:      GateArt,
  elder:     ElderArt,
  pharisee:  PhariseeArt,
  martha:    MarthaArt,
  nicodemus: NicodemusArt,
  richFool:  RichFoolArt,
  virgins:   VirginsArt,
  water:     WaterArt,
  pool:      PoolArt,
};

export default function StoryArt({ storyId, accentColor, className }) {
  const Art = ART[storyId];
  if (!Art) return null;
  return (
    <div className={`story-art ${className || ''}`}>
      <Art />
    </div>
  );
}
