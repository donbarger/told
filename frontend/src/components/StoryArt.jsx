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
          <stop offset="0%" stopColor="#0C1830" />
          <stop offset="100%" stopColor="#243858" />
        </linearGradient>
        <radialGradient id="sam-lamp" cx="0.48" cy="0.62" r="0.55">
          <stop offset="0%" stopColor="#F3D54E" stopOpacity="0.75" />
          <stop offset="40%" stopColor="#E87722" stopOpacity="0.35" />
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
        <path d="M-50,4 Q-20,-10 20,-6 L40,4 Q20,14 -20,12 Z" fill="#3A2830" />
        <circle cx="-38" cy="-2" r="9" fill="#8A5038" />
      </g>
      {/* samaritan kneeling over him */}
      <g transform="translate(390,295)">
        {/* body bent forward */}
        <path d="M-10,0 Q0,-24 14,-30" stroke="#1B365D" strokeWidth="10" strokeLinecap="round" fill="none" />
        <circle cx="14" cy="-38" r="9" fill="#A06840" />
        {/* arm reaching down */}
        <path d="M6,-24 Q10,-4 16,6" stroke="#1B365D" strokeWidth="7" strokeLinecap="round" fill="none" />
        {/* kneeling legs */}
        <path d="M-10,0 L-18,14" stroke="#1B365D" strokeWidth="8" strokeLinecap="round" />
        <path d="M-4,4 L-4,18" stroke="#1B365D" strokeWidth="8" strokeLinecap="round" />
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

/* ── The Fight — woman in courthouse hallway, fist raised to knock again ── */
function WidowArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="wid-hall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1C1C1C" />
          <stop offset="100%" stopColor="#2A2418" />
        </linearGradient>
        <radialGradient id="wid-overhead" cx="0.5" cy="0" r="0.5">
          <stop offset="0%" stopColor="#D4C890" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#D4C890" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#wid-hall)" />
      <rect width="800" height="400" fill="url(#wid-overhead)" />
      {/* receding hallway — perspective */}
      <path d="M0,0 L320,180 L320,400 L0,400 Z" fill="#141410" />
      <path d="M800,0 L480,180 L480,400 L800,400 Z" fill="#141410" />
      <path d="M320,180 L480,180 L480,400 L320,400 Z" fill="#1C1C18" />
      {/* ceiling line */}
      <path d="M0,0 L320,180 M800,0 L480,180" stroke="#2A2A20" strokeWidth="2" opacity="0.6" />
      {/* floor line */}
      <path d="M0,400 L320,400 M480,400 L800,400" stroke="#2A2A20" strokeWidth="1" opacity="0.3" />
      {/* overhead fluorescent lights receding */}
      {[[400,10,120,6],[400,90,80,5],[400,140,50,4],[400,162,28,3]].map(([x,y,w,h],i) => (
        <g key={i}>
          <rect x={x-w/2} y={y} width={w} height={h} rx="2" fill="#D4C890" opacity={0.55-i*0.1} />
          <rect x={x-w/2-10} y={y+h} width={w+20} height={2} fill="#D4C890" opacity={0.08-i*0.01} />
        </g>
      ))}
      {/* identical closed doors receding — denial after denial */}
      {[[110,60,180,260],[250,100,120,200],[335,130,80,150]].map(([x,y,w,h],i) => (
        <g key={i} opacity={0.7-i*0.15}>
          <rect x={x} y={y} width={w} height={h} rx="3" fill="#1A1208" />
          <rect x={x} y={y} width={w} height={h} rx="3" fill="none" stroke="#3A3020" strokeWidth="2" />
          <rect x={x+w*0.38} y={y+h*0.42} width={w*0.12} height={w*0.06} rx="2" fill="#4A3A20" />
          <circle cx={x+w*0.6} cy={y+h*0.5} r={w*0.055} fill="#4A3A20" />
        </g>
      ))}
      {/* mirror doors right side */}
      {[[690,60,180,260],[550,100,120,200],[465,130,80,150]].map(([x,y,w,h],i) => (
        <g key={i} opacity={0.7-i*0.15}>
          <rect x={x} y={y} width={w} height={h} rx="3" fill="#1A1208" />
          <rect x={x} y={y} width={w} height={h} rx="3" fill="none" stroke="#3A3020" strokeWidth="2" />
          <circle cx={x+w*0.4} cy={y+h*0.5} r={w*0.055} fill="#4A3A20" />
        </g>
      ))}
      {/* crumpled rejection notices on floor */}
      {[[200,385],[260,390],[340,388],[460,387],[540,391]].map(([x,y],i) => (
        <ellipse key={i} cx={x} cy={y} rx="16" ry="7" fill="#2A2418" opacity="0.8" transform={`rotate(${i*15-20},${x},${y})`} />
      ))}
      {/* the woman — standing at the far door, fist raised to knock again */}
      <g transform="translate(400,270)">
        {/* body */}
        <circle cx="0" cy="-26" r="12" fill="#A06840" />
        {/* head covering / hair */}
        <path d="M-14,-30 Q0,-50 14,-30 Q10,-14 -10,-14 Z" fill="#5A2C10" />
        <path d="M-12,-4 L12,-4 L10,28 L-10,28 Z" fill="#8A4828" />
        {/* coat — she's been here all day */}
        <path d="M-12,-4 Q-22,8 -18,34" stroke="#7A3C1C" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M12,-4 Q22,8 18,34" stroke="#7A3C1C" strokeWidth="7" strokeLinecap="round" fill="none" />
        {/* legs */}
        <path d="M-10,26 L-12,52" stroke="#7A3C1C" strokeWidth="6" strokeLinecap="round" />
        <path d="M10,26 L12,52" stroke="#7A3C1C" strokeWidth="6" strokeLinecap="round" />
        {/* arm raised — fist about to knock, again */}
        <path d="M12,-8 Q28,-24 32,-38" stroke="#8A4828" strokeWidth="7" strokeLinecap="round" fill="none" />
        <rect x="26" y="-46" width="14" height="12" rx="3" fill="#A06840" />
        {/* other arm — small bag at her side, documents */}
        <path d="M-12,-4 Q-26,8 -28,20" stroke="#8A4828" strokeWidth="6" strokeLinecap="round" fill="none" />
        <rect x="-36" y="14" width="18" height="24" rx="2" fill="#5A2C10" />
      </g>
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
          <stop offset="0%" stopColor="#2A2848" />
          <stop offset="55%" stopColor="#6A4828" />
          <stop offset="100%" stopColor="#9A6A38" />
        </linearGradient>
        <radialGradient id="rr-glow" cx="0.22" cy="0.6" r="0.4">
          <stop offset="0%" stopColor="#F3D54E" stopOpacity="0.55" />
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
        <circle cx="0" cy="-18" r="12" fill="#8A5830" />
        <path d="M-12,-4 L12,-4 L10,32 L-10,32 Z" fill="#3A5A80" />
        {/* fine cloak */}
        <path d="M-12,-4 Q-26,14 -22,44" stroke="#3A5A80" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M12,-4 Q26,14 22,44" stroke="#3A5A80" strokeWidth="8" strokeLinecap="round" fill="none" />
        {/* arms at sides, dejected */}
        <path d="M-11,4 Q-22,14 -20,26" stroke="#2A4A70" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M11,4 Q22,14 20,26" stroke="#2A4A70" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* feet walking away */}
        <path d="M-10,30 L-14,50" stroke="#2A4A70" strokeWidth="6" strokeLinecap="round" />
        <path d="M10,30 L8,50" stroke="#2A4A70" strokeWidth="6" strokeLinecap="round" />
      </g>
      {/* Jesus, standing still, watching */}
      <g transform="translate(260,264)" opacity="0.9">
        <circle cx="0" cy="-18" r="11" fill="#A07848" />
        <path d="M-10,-4 L10,-4 L8,28 L-8,28 Z" fill="#009681" />
        <path d="M-8,24 Q-12,38 -8,48" stroke="#009681" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M8,24 Q12,38 8,48" stroke="#009681" strokeWidth="7" strokeLinecap="round" fill="none" />
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

/* ── The Portfolio — figure frozen at a dark desk, sealed envelope untouched */
function TalentsArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="tal-room" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#141410" />
          <stop offset="100%" stopColor="#201E18" />
        </linearGradient>
        <radialGradient id="tal-lamp" cx="0.5" cy="0.48" r="0.52">
          <stop offset="0%" stopColor="#C4A840" stopOpacity="0.75" />
          <stop offset="50%" stopColor="#C4A840" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#C4A840" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tal-window" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#2A3A5A" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#2A3A5A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#tal-room)" />
      {/* window — city outside, life going on */}
      <rect x="560" y="40" width="180" height="240" rx="4" fill="#0E1828" />
      <rect x="560" y="40" width="180" height="240" rx="4" fill="url(#tal-window)" />
      <rect x="560" y="40" width="180" height="240" rx="4" fill="none" stroke="#1A2030" strokeWidth="3" />
      {/* window panes */}
      <path d="M650,40 L650,280" stroke="#1A2030" strokeWidth="2" />
      <path d="M560,160 L740,160" stroke="#1A2030" strokeWidth="2" />
      {/* city lights in window */}
      {[[580,200],[600,220],[620,190],[640,210],[670,225],[690,195],[710,215],[725,200]].map(([x,y],i) => (
        <rect key={i} x={x} y={y} width={i%3===0?8:5} height={i%2===0?18:12} fill="#4A6A9A" opacity={0.5+i%3*0.15} />
      ))}
      {[[575,80],[595,100],[615,70],[635,90],[655,75],[675,95],[700,80],[720,100]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="#E8D890" opacity={0.3+i%3*0.1} />
      ))}
      {/* desk surface */}
      <rect x="80" y="270" width="620" height="16" rx="2" fill="#1A1408" />
      <rect x="80" y="286" width="620" height="8" rx="1" fill="#0E0C08" />
      {/* desk lamp — angled, casting cone of light */}
      <path d="M240,270 L260,200 L290,195" stroke="#2A2418" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M266,192 L316,192 L330,215 L252,215 Z" fill="#2A2418" />
      {/* lamp glow on desk */}
      <rect x="100" y="200" width="500" height="200" fill="url(#tal-lamp)" />
      {/* sealed envelope — the talent, untouched */}
      <g transform="translate(380,255)">
        <rect x="-80" y="-30" width="160" height="100" rx="4" fill="#C4A840" opacity="0.35" />
        <rect x="-80" y="-30" width="160" height="100" rx="4" fill="none" stroke="#C4A840" strokeWidth="2" opacity="0.75" />
        {/* envelope flap lines */}
        <path d="M-80,-30 L0,20 L80,-30" stroke="#C4A840" strokeWidth="1.5" opacity="0.7" fill="none" />
        <path d="M-80,70 L0,20 L80,70" stroke="#C4A840" strokeWidth="1.5" opacity="0.6" fill="none" />
        {/* wax seal — still intact */}
        <circle cx="0" cy="22" r="10" fill="#8A2020" opacity="0.9" />
        <circle cx="0" cy="22" r="10" fill="none" stroke="#C44A4A" strokeWidth="1.5" opacity="0.7" />
      </g>
      {/* figure slumped at desk — head down on arms, frozen */}
      <g transform="translate(390,268)">
        {/* arms folded on desk */}
        <path d="M-80,-4 Q-40,-12 0,-10 Q40,-12 80,-4" stroke="#2A2018" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.9" />
        {/* head resting on arms */}
        <circle cx="0" cy="-22" r="18" fill="#7A4828" />
        {/* hair shadow on top */}
        <path d="M-14,-30 Q0,-48 14,-30" fill="#3A2010" />
      </g>
      {/* months-old coffee cup, dusty */}
      <g transform="translate(540,260)">
        <ellipse cx="0" cy="8" rx="16" ry="5" fill="#0E0C08" />
        <path d="M-14,4 L14,4 L12,-18 L-12,-18 Z" fill="#1A1808" />
        <ellipse cx="0" cy="-18" rx="14" ry="4" fill="#0E0C08" />
        <path d="M14,-6 Q22,-6 22,2 Q22,8 14,8" stroke="#1A1808" strokeWidth="3" fill="none" />
      </g>
    </svg>
  );
}

/* ── The Debt — office hallway, suit grabs smaller figure, forgiveness torn on floor */
function DebtArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="debt-hall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D8D4C8" />
          <stop offset="100%" stopColor="#A8A498" />
        </linearGradient>
        <linearGradient id="debt-wall-l" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B8B4A8" />
          <stop offset="100%" stopColor="#C8C4B8" />
        </linearGradient>
        <linearGradient id="debt-wall-r" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C8C4B8" />
          <stop offset="100%" stopColor="#B0AC9E" />
        </linearGradient>
      </defs>
      {/* fluorescent office corridor */}
      <rect x="0" y="0" width="800" height="400" fill="url(#debt-hall)" />
      {/* left wall */}
      <path d="M0,0 L280,140 L280,400 L0,400 Z" fill="url(#debt-wall-l)" />
      {/* right wall */}
      <path d="M800,0 L520,140 L520,400 L800,400 Z" fill="url(#debt-wall-r)" />
      {/* ceiling */}
      <path d="M0,0 L280,140 L520,140 L800,0 Z" fill="#E0DCD0" />
      {/* fluorescent strip lights */}
      {[[400,8,200,10],[400,60,130,7],[400,98,80,5],[400,122,50,4]].map(([x,y,w,h],i) => (
        <rect key={i} x={x-w/2} y={y} width={w} height={h} rx="2" fill="#F8F4E0" opacity={0.9-i*0.1} />
      ))}
      {/* floor — glossy tile */}
      <path d="M280,400 L520,400 L520,140 L280,140 Z" fill="#C0BC B0" />
      <path d="M280,400 L520,400 L520,140 L280,140 Z" fill="#C0BCB0" />
      {[160,200,240,280,320,360].map((y,i) => (
        <path key={i} d={`M${280+(y-140)*0.5},${y} L${520-(y-140)*0.5},${y}`} stroke="#B0ACA0" strokeWidth="1" opacity="0.4" />
      ))}
      {/* torn document on floor — the forgiven debt, discarded */}
      <g transform="translate(390,370)">
        <path d="M-40,-6 Q-10,-12 20,-8 L22,8 Q-8,14 -38,8 Z" fill="#F0ECD8" opacity="0.9" transform="rotate(-12)" />
        <path d="M10,-10 Q40,-4 42,10 L20,14 Q18,2 10,-10 Z" fill="#E8E4D0" opacity="0.85" transform="rotate(8)" />
        {/* red FORGIVEN stamp faintly visible */}
        <text x="-30" y="4" fontSize="8" fill="#C44A4A" opacity="0.4" fontFamily="sans-serif" fontWeight="bold" transform="rotate(-12)">FORGIVEN</text>
      </g>
      {/* debtor — backed against wall, hands raised, pleading */}
      <g transform="translate(490,260)">
        <circle cx="0" cy="-20" r="11" fill="#4A4A4A" />
        <path d="M-10,-4 L10,-4 L8,26 L-8,26 Z" fill="#3A3A3A" />
        <path d="M-8,24 L-10,50" stroke="#3A3A3A" strokeWidth="6" strokeLinecap="round" />
        <path d="M8,24 L10,50" stroke="#3A3A3A" strokeWidth="6" strokeLinecap="round" />
        {/* both hands raised — surrender/pleading */}
        <path d="M-10,-4 Q-26,-14 -28,-28" stroke="#4A4A4A" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M10,-4 Q26,-14 28,-28" stroke="#4A4A4A" strokeWidth="7" strokeLinecap="round" fill="none" />
        <circle cx="-28" cy="-32" r="6" fill="#C8956A" />
        <circle cx="28" cy="-32" r="6" fill="#C8956A" />
      </g>
      {/* the suit — powerful, grabbing, blocking the hallway */}
      <g transform="translate(330,248)">
        <circle cx="0" cy="-22" r="13" fill="#1A1A2A" />
        {/* suit jacket */}
        <path d="M-14,-6 L14,-6 L12,30 L-12,30 Z" fill="#1A1A2A" />
        {/* tie */}
        <path d="M-2,-6 L2,-6 L3,20 L0,28 L-3,20 Z" fill="#8A1A1A" />
        {/* lapels */}
        <path d="M-14,-6 Q-6,-14 0,-10 Q6,-14 14,-6" stroke="#2A2A3A" strokeWidth="2" fill="none" opacity="0.5" />
        {/* legs wide, dominant stance */}
        <path d="M-12,28 L-18,58" stroke="#1A1A2A" strokeWidth="8" strokeLinecap="round" />
        <path d="M12,28 L16,58" stroke="#1A1A2A" strokeWidth="8" strokeLinecap="round" />
        {/* arm extended — grabbing collar of debtor */}
        <path d="M14,-4 Q50,8 62,14" stroke="#1A1A2A" strokeWidth="9" strokeLinecap="round" fill="none" />
        {/* hand at end, gripping */}
        <path d="M62,10 Q74,10 74,18 Q74,26 62,24" stroke="#1A1A2A" strokeWidth="5" strokeLinecap="round" fill="none" />
        {/* other arm — folder/documents under arm */}
        <path d="M-14,-4 Q-28,4 -32,14" stroke="#1A1A2A" strokeWidth="8" strokeLinecap="round" fill="none" />
        <rect x="-48" y="6" width="24" height="30" rx="2" fill="#2A2A1A" transform="rotate(-10,-48,6)" />
      </g>
    </svg>
  );
}

/* ── The Gate — iron estate gate at night, warm inside, figure lying outside */
function GateArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="gate-night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#080E1A" />
          <stop offset="100%" stopColor="#101828" />
        </linearGradient>
        <radialGradient id="gate-inside" cx="0.72" cy="0.5" r="0.55">
          <stop offset="0%" stopColor="#E87722" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#E87722" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#E87722" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gate-outside" cx="0.28" cy="0.7" r="0.3">
          <stop offset="0%" stopColor="#1B2A4A" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1B2A4A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#gate-night)" />
      {/* warm interior — the world inside the gate */}
      <rect x="420" y="0" width="380" height="400" fill="#0E0804" />
      <rect x="420" y="0" width="380" height="400" fill="url(#gate-inside)" />
      {/* outside — cold blue */}
      <rect x="0" y="0" width="380" height="400" fill="url(#gate-outside)" />
      {/* faint stars outside only */}
      {[[40,30],[90,18],[160,42],[250,22],[340,38]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.3" fill="#E8E0C8" opacity="0.4" />
      ))}
      {/* the estate — mansion silhouette inside */}
      <rect x="520" y="80" width="240" height="200" fill="#0A0604" opacity="0.8" />
      <path d="M510,80 L640,30 L770,80 Z" fill="#0A0604" opacity="0.8" />
      {/* mansion windows — warm and lit */}
      {[[550,110,50,55],[640,110,50,55],[550,195,50,40],[640,195,50,40]].map(([x,y,w,h],i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="2" fill="#E87722" opacity={0.35+i%2*0.1} />
      ))}
      {/* ground */}
      <path d="M0,330 L800,330 L800,400 L0,400 Z" fill="#060808" />
      {/* stone wall */}
      <rect x="0" y="230" width="800" height="50" fill="#1A1810" />
      {[0,70,140,210,280,350,420,490,560,630,700,770].map((x,i) => (
        <rect key={i} x={x+2} y={233} width={65} height={20} rx="1" fill="#0E0C08" opacity="0.6" />
      ))}
      {/* iron gate — bars, ornate, separating the two worlds */}
      <rect x="340" y="120" width="10" height="165" fill="#3A3828" />
      <rect x="450" y="120" width="10" height="165" fill="#3A3828" />
      <rect x="338" y="118" width="124" height="10" fill="#3A3828" />
      <rect x="338" y="278" width="124" height="8" fill="#3A3828" />
      {/* vertical bars */}
      {[355,372,389,406,423,440].map((x,i) => (
        <g key={i}>
          <rect x={x} y={128} width={6} height={148} fill="#484838" />
          {/* spear tips */}
          <path d={`M${x+3},128 L${x-2},116 L${x+3},110 L${x+8},116 Z`} fill="#484838" />
        </g>
      ))}
      {/* horizontal crossbar on gate */}
      <rect x="338" y="190" width="124" height="6" fill="#1A1810" opacity="0.8" />
      {/* figure lying outside the gate — Lazarus */}
      <g transform="translate(200,315)">
        <ellipse cx="0" cy="8" rx="75" ry="14" fill="#080808" opacity="0.4" />
        {/* body lying at base of wall — rags, visible */}
        <path d="M-65,6 Q-20,-8 30,-4 L60,8 Q20,18 -40,14 Z" fill="#4A3828" />
        <circle cx="-52" cy="2" r="11" fill="#8A5830" />
        {/* hand outstretched toward gate */}
        <path d="M50,4 Q72,-2 82,-10" stroke="#7A5030" strokeWidth="5" strokeLinecap="round" fill="none" />
        <circle cx="84" cy="-12" r="6" fill="#8A5830" />
      </g>
      {/* light from inside barely reaching outside — the gap */}
      <path d="M420,230 L420,330 L380,330 L380,230 Z" fill="#E87722" opacity="0.04" />
    </svg>
  );
}

/* ── Elder Brother — figure outside at night, warm light from windows ─── */
function ElderArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="el-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0C1A2E" />
          <stop offset="100%" stopColor="#182C18" />
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
        <circle cx="0" cy="-22" r="12" fill="#8A5A28" />
        <path d="M-12,-4 L12,-4 L10,30 L-10,30 Z" fill="#6A3C18" />
        {/* arms folded across chest */}
        <path d="M-12,-2 Q-6,6 6,4" stroke="#7A4820" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M12,-2 Q6,6 -6,4" stroke="#7A4820" strokeWidth="7" strokeLinecap="round" fill="none" />
        {/* legs — standing firm */}
        <path d="M-10,28 L-12,50" stroke="#6A3C18" strokeWidth="7" strokeLinecap="round" />
        <path d="M10,28 L12,50" stroke="#6A3C18" strokeWidth="7" strokeLinecap="round" />
        {/* slight turn toward house — he can't fully look away */}
        <path d="M10,-14 Q22,-10 24,-4" stroke="#8A5A28" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7" />
      </g>
      {/* field tool beside him — he came from work */}
      <path d="M270,310 L274,355" stroke="#2A1A08" strokeWidth="4" strokeLinecap="round" />
      <path d="M268,310 L282,316" stroke="#2A1A08" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* ── The Better Prayer — prayer breakfast, two postures, morning community room */
function PhariseeArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="ph-room" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D8D4C0" />
          <stop offset="100%" stopColor="#B8B4A0" />
        </linearGradient>
        <linearGradient id="ph-window-light" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E8E0C0" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#E8E0C0" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="ph-back-shadow" cx="0.8" cy="0.7" r="0.25">
          <stop offset="0%" stopColor="#505040" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#505040" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* community room — morning light */}
      <rect width="800" height="400" fill="url(#ph-room)" />
      {/* morning windows along left wall */}
      {[60,200].map((x,i) => (
        <g key={i}>
          <rect x={x} y={40} width={80} height={200} rx="3" fill="#B8D4E8" opacity="0.7" />
          <rect x={x} y={40} width={80} height={200} rx="3" fill="url(#ph-window-light)" />
          <rect x={x} y={40} width={80} height={200} rx="3" fill="none" stroke="#A0A090" strokeWidth="2" />
          <path d={`M${x+40},40 L${x+40},240`} stroke="#A0A090" strokeWidth="1.5" />
          <path d={`M${x},140 L${x+80},140`} stroke="#A0A090" strokeWidth="1.5" />
        </g>
      ))}
      <rect x="0" y="0" width="320" height="400" fill="url(#ph-window-light)" opacity="0.3" />
      {/* round tables — prayer breakfast setup */}
      {[[310,310,70],[560,330,55],[680,305,48]].map(([x,y,r],i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx={r} ry={r*0.35} fill="#8A7A58" opacity={0.8-i*0.1} />
          {/* coffee cups on tables */}
          <ellipse cx={x+r*0.4} cy={y-4} rx="7" ry="3" fill="#5A4A30" opacity={0.7-i*0.1} />
        </g>
      ))}
      {/* chairs */}
      {[[280,290],[340,290],[300,330],[320,330]].map(([x,y],i) => (
        <rect key={i} x={x-10} y={y} width={20} height={14} rx="3" fill="#6A6050" opacity="0.5" />
      ))}
      {/* pharisee — front of room, standing, upright, slightly elevated */}
      <g transform="translate(285,248)">
        <circle cx="0" cy="-24" r="13" fill="#2A2A3A" />
        {/* business casual — blazer */}
        <path d="M-14,-6 L14,-6 L12,30 L-12,30 Z" fill="#3A3A4A" />
        {/* lapels */}
        <path d="M-14,-6 Q-4,-16 0,-10 Q4,-16 14,-6" stroke="#2A2A3A" strokeWidth="2" fill="#2A2A3A" opacity="0.5" />
        {/* shirt/tie visible */}
        <path d="M-2,-6 L2,-6 L3,18 L0,24 L-3,18 Z" fill="#1B365D" opacity="0.7" />
        {/* legs */}
        <path d="M-12,28 L-14,52" stroke="#2A2A3A" strokeWidth="7" strokeLinecap="round" />
        <path d="M12,28 L14,52" stroke="#2A2A3A" strokeWidth="7" strokeLinecap="round" />
        {/* arms partly raised — speaking/presenting posture */}
        <path d="M-14,-4 Q-32,-8 -38,-2" stroke="#2A2A3A" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M14,-4 Q32,-8 38,-2" stroke="#2A2A3A" strokeWidth="7" strokeLinecap="round" fill="none" />
        {/* coffee cup in hand */}
        <rect x="36" y="-8" width="10" height="12" rx="2" fill="#5A4A30" opacity="0.7" />
      </g>
      {/* tax collector — back corner, alone at separate table, head down, hand on chest */}
      <rect x="460" y="0" width="340" height="400" fill="url(#ph-back-shadow)" />
      <g transform="translate(620,310)" opacity="0.8">
        <circle cx="0" cy="-20" r="11" fill="#2A2820" />
        <path d="M-10,-4 L10,-4 L8,24 L-8,24 Z" fill="#2A2820" />
        {/* head bowed sharply — not performing, just present */}
        <circle cx="0" cy="-30" r="11" fill="#2A2820" />
        <path d="M-11,-32 Q0,-48 11,-32" fill="#1A1818" opacity="0.7" />
        {/* legs */}
        <path d="M-8,22 L-10,42" stroke="#2A2820" strokeWidth="6" strokeLinecap="round" />
        <path d="M8,22 L10,42" stroke="#2A2820" strokeWidth="6" strokeLinecap="round" />
        {/* hand pressed to chest — the single gesture */}
        <path d="M-8,-6 Q0,0 8,-2" stroke="#2A2820" strokeWidth="7" strokeLinecap="round" fill="none" />
        {/* solitary coffee cup in front of him — untouched */}
        <ellipse cx="28" cy="22" rx="10" ry="4" fill="#4A3A20" opacity="0.5" />
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

/* ── Nicodemus — suited professional alone at night with a single lamp ───── */
function NicodemusArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="nic-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0E0C1A" />
          <stop offset="100%" stopColor="#100E20" />
        </linearGradient>
        <radialGradient id="nic-glow" cx="0.55" cy="0.6" r="0.5">
          <stop offset="0%" stopColor="#F3D54E" stopOpacity="0.75" />
          <stop offset="35%" stopColor="#E87722" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#E87722" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#nic-bg)" />
      <rect width="800" height="400" fill="url(#nic-glow)" />
      {/* floor */}
      <rect x="0" y="340" width="800" height="60" fill="#030208" />
      {/* back wall — dark, almost invisible */}
      <rect x="0" y="0" width="800" height="345" fill="#040310" />
      {/* table */}
      <path d="M310,310 L490,310 L490,320 L310,320 Z" fill="#1A1008" />
      <path d="M320,318 L324,348" stroke="#120C06" strokeWidth="5" strokeLinecap="round" />
      <path d="M476,318 L480,348" stroke="#120C06" strokeWidth="5" strokeLinecap="round" />
      {/* table leg cross-brace */}
      <path d="M322,335 L478,335" stroke="#100A04" strokeWidth="3" opacity="0.6" />
      {/* desk lamp — warm glow source */}
      <g transform="translate(440,200)">
        {/* base */}
        <ellipse cx="0" cy="48" rx="20" ry="6" fill="#1A1008" />
        <rect x="-4" y="14" width="8" height="34" fill="#1A1008" rx="2" />
        {/* arm */}
        <path d="M0,14 Q-8,-4 -18,-12" stroke="#1A1008" strokeWidth="5" strokeLinecap="round" fill="none" />
        {/* shade */}
        <path d="M-36,-12 L0,-22 L0,-2 L-30,-2 Z" fill="#2A1A08" />
        {/* bulb glow */}
        <ellipse cx="-18" cy="-8" rx="10" ry="8" fill="#F3D54E" opacity="0.7" />
        <circle cx="-18" cy="-8" r="5" fill="#FFF8E0" opacity="0.9" />
      </g>
      {/* briefcase on floor beside chair — identity marker */}
      <g transform="translate(230,310)">
        <rect x="-22" y="-28" width="44" height="30" rx="3" fill="#1A1008" />
        <rect x="-22" y="-28" width="44" height="4" rx="2" fill="#241408" />
        <path d="M-8,-28 Q-8,-36 0,-36 Q8,-36 8,-28" fill="none" stroke="#2A1A08" strokeWidth="3" />
        <path d="M-22,-14 L22,-14" stroke="#2A1A0A" strokeWidth="1.5" opacity="0.5" />
        <rect x="-4" y="-17" width="8" height="6" rx="1" fill="#241408" />
      </g>
      {/* chair */}
      <path d="M270,310 L270,260" stroke="#100A04" strokeWidth="6" strokeLinecap="round" />
      <path d="M340,310 L340,260" stroke="#100A04" strokeWidth="6" strokeLinecap="round" />
      <path d="M260,265 L350,265" stroke="#100A04" strokeWidth="8" strokeLinecap="round" />
      {/* chair back */}
      <path d="M265,265 L265,200" stroke="#100A04" strokeWidth="5" strokeLinecap="round" />
      <path d="M345,265 L345,200" stroke="#100A04" strokeWidth="5" strokeLinecap="round" />
      <path d="M262,200 L348,200" stroke="#100A04" strokeWidth="7" strokeLinecap="round" />
      {/* nicodemus — seated, leaning slightly forward, suit visible */}
      <g transform="translate(305,262)">
        {/* head */}
        <circle cx="0" cy="-16" r="14" fill="#9A7050" />
        {/* suit jacket — charcoal, visible against dark bg */}
        <path d="M-18,0 L18,0 L15,48 L-15,48 Z" fill="#2A2A3C" />
        {/* shirt collar / tie */}
        <path d="M-5,0 L0,-4 L5,0 L3,18 L-3,18 Z" fill="#E8E0D0" opacity="0.75" />
        <path d="M0,-4 L2,12 L-1,22 L-2,12 Z" fill="#3A5A90" opacity="0.9" />
        {/* lapels */}
        <path d="M-18,0 Q-8,-8 -5,0" fill="#222234" />
        <path d="M18,0 Q8,-8 5,0" fill="#222234" />
        {/* arms on table — leaning in */}
        <path d="M-18,6 Q-32,18 -28,40" stroke="#2A2A3C" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M18,6 Q32,18 30,40" stroke="#2A2A3C" strokeWidth="8" strokeLinecap="round" fill="none" />
        {/* hands on table */}
        <ellipse cx="-26" cy="42" rx="7" ry="5" fill="#9A7050" />
        <ellipse cx="30" cy="42" rx="7" ry="5" fill="#9A7050" />
        {/* legs */}
        <path d="M-14,46 L-12,72" stroke="#2A2A3C" strokeWidth="8" strokeLinecap="round" />
        <path d="M14,46 L12,72" stroke="#2A2A3C" strokeWidth="8" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* ── Rich Fool — glass office at night, laptop charts, one fading star ────── */
function RichFoolArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="rf-night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06091A" />
          <stop offset="100%" stopColor="#0A0F1E" />
        </linearGradient>
        <linearGradient id="rf-office" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0E0E18" />
          <stop offset="100%" stopColor="#121220" />
        </linearGradient>
        <radialGradient id="rf-screen" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#1AFF88" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#1AFF88" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="rf-city" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#020408" />
          <stop offset="100%" stopColor="#0A0C18" />
        </linearGradient>
      </defs>
      {/* sky beyond window */}
      <rect width="800" height="400" fill="url(#rf-night)" />
      {/* city skyline through floor-to-ceiling glass */}
      {/* glass wall frame */}
      <rect x="60" y="20" width="680" height="300" fill="url(#rf-city)" opacity="0.85" />
      {/* city buildings — distant lights */}
      {[
        [80,180,60,140],[160,200,40,100],[220,170,50,130],[290,195,35,105],[350,160,65,140],
        [430,185,45,115],[500,175,55,125],[570,190,40,110],[630,165,60,135],[700,200,45,100]
      ].map(([x,y,w,h],i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill="#0C0E18" rx="1" />
      ))}
      {/* building windows — tiny glowing squares */}
      {[
        [90,200],[100,210],[90,220],[120,190],[130,200],[170,215],[180,225],[170,235],
        [230,185],[240,195],[260,180],[300,205],[310,215],[360,175],[370,185],[380,165],
        [440,198],[450,208],[460,188],[510,190],[520,200],[580,204],[590,214],[640,180],
        [650,190],[660,170],[710,214],[720,204]
      ].map(([x,y],i) => (
        <rect key={i} x={x} y={y} width="6" height="5" fill="#F3D54E" opacity={0.12 + (i%5)*0.04} rx="0.5" />
      ))}
      {/* glass panels / mullions */}
      {[60, 230, 400, 570, 740].map((x, i) => (
        <rect key={i} x={x} y="20" width="3" height="300" fill="#0A0A14" opacity="0.7" />
      ))}
      <rect x="60" y="20" width="680" height="3" fill="#0A0A14" opacity="0.7" />
      <rect x="60" y="160" width="680" height="3" fill="#0A0A14" opacity="0.4" />
      <rect x="60" y="318" width="680" height="3" fill="#0A0A14" opacity="0.7" />
      {/* the single fading star — visible high in the glass */}
      <circle cx="400" cy="55" r="2" fill="#E8E0C8" opacity="0.45" />
      <circle cx="400" cy="55" r="6" fill="#E8E0C8" opacity="0.06" />
      {/* interior — conference room overlay */}
      <rect x="0" y="320" width="800" height="80" fill="#060608" />
      {/* conference table edge */}
      <path d="M80,345 L720,345 L720,370 L80,370 Z" rx="3" fill="#0E0C10" />
      <path d="M80,342 L720,342" stroke="#18161E" strokeWidth="2" opacity="0.8" />
      {/* laptop screen glow */}
      <rect x="330" y="240" width="180" height="110" rx="4" fill="#040810" />
      <rect x="340" y="248" width="160" height="90" rx="2" fill="#050E08" />
      {/* screen content — green charts */}
      <rect x="340" y="248" width="160" height="90" rx="2" fill="url(#rf-screen)" />
      {/* chart bars */}
      {[[348,300,8,28],[360,292,8,36],[372,285,8,43],[384,278,8,50],[396,272,8,56],[408,266,8,62],[420,274,8,54],[432,268,8,60],[444,260,8,68],[456,264,8,64],[468,258,8,70],[480,252,8,76]].map(([x,y,w,h],i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill="#1AFF88" opacity={0.25 + (i%3)*0.06} rx="1" />
      ))}
      {/* chart line on top */}
      <polyline points="348,300 360,292 372,285 384,278 396,272 408,266 420,274 432,268 444,260 456,264 468,258 480,252" fill="none" stroke="#1AFF88" strokeWidth="1.5" opacity="0.5" />
      {/* laptop hinge / base */}
      <path d="M326,338 L474,338 L474,344 L326,344 Z" fill="#0E0C10" rx="1" />
      {/* screen glow spilling onto table and face */}
      <rect x="300" y="280" width="240" height="80" fill="#1AFF88" opacity="0.03" />
      {/* figure seated — leaning back, satisfied */}
      <g transform="translate(400,320)">
        <circle cx="0" cy="-28" r="13" fill="#9A7050" />
        {/* shirt collar */}
        <path d="M-5,-16 L0,-20 L5,-16 L3,0 L-3,0 Z" fill="#E8E0D0" opacity="0.8" />
        {/* jacket */}
        <path d="M-18,-4 L18,-4 L15,28 L-15,28 Z" fill="#2A2840" />
        <path d="M-18,-4 Q-8,-14 -5,-16" fill="#222038" />
        <path d="M18,-4 Q8,-14 5,-16" fill="#222038" />
        {/* arms — one on table near laptop, one back */}
        <path d="M-17,2 Q-28,12 -32,26" stroke="#2A2840" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M17,2 Q30,10 36,22" stroke="#2A2840" strokeWidth="8" strokeLinecap="round" fill="none" />
        {/* legs */}
        <path d="M-12,26 L-10,48" stroke="#2A2840" strokeWidth="8" strokeLinecap="round" />
        <path d="M12,26 L10,48" stroke="#2A2840" strokeWidth="8" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* ── Ten Virgins — left: 5 entering warmth; right: 5 at closed door ──── */
function VirginsArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="vir-bg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#120C06" />
          <stop offset="48%" stopColor="#06040A" />
          <stop offset="100%" stopColor="#04030A" />
        </linearGradient>
        <radialGradient id="vir-warm" cx="0.18" cy="0.5" r="0.4">
          <stop offset="0%" stopColor="#E87722" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#F3D54E" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#E87722" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#vir-bg)" />
      <rect width="800" height="400" fill="url(#vir-warm)" />
      {/* floor */}
      <rect x="0" y="355" width="800" height="45" fill="#060408" />
      {/* corridor ceiling line */}
      <rect x="0" y="40" width="800" height="3" fill="#0A0810" opacity="0.5" />

      {/* LEFT SIDE — open door into warmth */}
      {/* warm light flooding through open doorway */}
      <path d="M40,40 L200,40 L200,355 L40,355 Z" fill="#E87722" opacity="0.08" />
      <path d="M40,40 L180,40 L180,355 L40,355 Z" fill="#F3D54E" opacity="0.04" />
      {/* open door — pushed back against wall */}
      <path d="M40,50 L40,350 L72,350 L72,50 Z" fill="#2A1A08" />
      <path d="M40,50 L72,50" stroke="#3A2208" strokeWidth="2" />
      <path d="M40,350 L72,350" stroke="#3A2208" strokeWidth="2" />
      {/* door panels */}
      <rect x="45" y="70" width="22" height="100" rx="1" fill="none" stroke="#3A2208" strokeWidth="1" opacity="0.5" />
      <rect x="45" y="185" width="22" height="130" rx="1" fill="none" stroke="#3A2208" strokeWidth="1" opacity="0.5" />
      {/* warm light on floor through doorway */}
      <path d="M72,355 L200,355 L240,400 L0,400 Z" fill="#E87722" opacity="0.08" />

      {/* 5 lit-candle figures walking in — processional, forward motion */}
      {[200, 240, 280, 320, 355].map((x, i) => {
        const forward = i < 3;
        return (
          <g key={i} transform={`translate(${x}, 295)`}>
            {/* figure */}
            <circle cx="0" cy="-28" r="10" fill="#2A1C10" opacity={0.85 - i*0.05} />
            <path d="M-10,-10 L10,-10 L8,22 L-8,22 Z" fill="#2A1C10" opacity={0.85 - i*0.05} />
            {/* flowing robe — motion */}
            <path d={forward ? "M-8,20 Q-14,36 -10,52" : "M-8,20 Q-12,36 -10,52"} stroke="#1A1008" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.7" />
            <path d={forward ? "M8,20 Q14,36 12,52" : "M8,20 Q10,36 10,52"} stroke="#1A1008" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.7" />
            {/* candle arm raised */}
            <path d="M10,-10 Q20,-20 20,-32" stroke="#2A1C10" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.8" />
            {/* lit candle */}
            <rect x="16" y="-44" width="8" height="16" rx="2" fill="#D4A860" opacity="0.9" />
            <ellipse cx="20" cy="-44" rx="4" ry="6" fill="#F3D54E" opacity="0.9" />
            <circle cx="20" cy="-48" r="3" fill="#FFF8E0" opacity="0.9" />
            {/* candle glow */}
            <circle cx="20" cy="-46" r="12" fill="#F3D54E" opacity={0.14 + (3-i)*0.03} />
          </g>
        );
      })}

      {/* RIGHT SIDE — closed door, cold and dark */}
      {/* closed door — solid, no light */}
      <rect x="560" y="50" width="100" height="305" rx="3" fill="#0C0808" />
      <rect x="560" y="50" width="100" height="305" rx="3" fill="none" stroke="#1A1010" strokeWidth="2.5" opacity="0.6" />
      {/* door arch */}
      <path d="M560,52 Q560,20 610,20 Q660,20 660,52" fill="#0C0808" />
      <path d="M560,52 Q560,20 610,20 Q660,20 660,52" fill="none" stroke="#1A1010" strokeWidth="2.5" opacity="0.6" />
      {/* door panels */}
      <rect x="570" y="70" width="40" height="90" rx="2" fill="none" stroke="#160E0E" strokeWidth="1.5" opacity="0.4" />
      <rect x="618" y="70" width="36" height="90" rx="2" fill="none" stroke="#160E0E" strokeWidth="1.5" opacity="0.4" />
      <rect x="570" y="174" width="40" height="140" rx="2" fill="none" stroke="#160E0E" strokeWidth="1.5" opacity="0.4" />
      <rect x="618" y="174" width="36" height="140" rx="2" fill="none" stroke="#160E0E" strokeWidth="1.5" opacity="0.4" />
      {/* door handle */}
      <circle cx="640" cy="220" r="7" fill="#1A1010" />
      {/* hand pressed flat against door — one figure closest */}
      <path d="M558,200 Q548,196 542,204 Q536,212 544,218 Q550,222 558,218" fill="#1A1008" opacity="0.55" />

      {/* 5 dark-candle figures at closed door */}
      {[740, 710, 680, 450, 420].map((x, i) => (
        <g key={i} transform={`translate(${x}, 295)`}>
          <circle cx="0" cy="-28" r="10" fill="#100C0C" opacity={0.55 + i*0.04} />
          <path d="M-10,-10 L10,-10 L8,22 L-8,22 Z" fill="#100C0C" opacity={0.55 + i*0.04} />
          <path d="M-8,20 Q-12,36 -10,52" stroke="#0E0808" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.5" />
          <path d="M8,20 Q10,36 10,52" stroke="#0E0808" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.5" />
          {/* arm with dead candle */}
          <path d="M10,-10 Q18,-18 18,-28" stroke="#100C0C" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.6" />
          {/* unlit candle — dark */}
          <rect x="14" y="-38" width="8" height="14" rx="2" fill="#1A1008" opacity="0.6" />
          {/* no flame, no glow */}
        </g>
      ))}
    </svg>
  );
}

/* ── Peter on Water — sinking from waist, arm up, divine hand reaching down ── */
function WaterArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="wat-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06091E" />
          <stop offset="40%" stopColor="#0C1430" />
          <stop offset="100%" stopColor="#101C38" />
        </linearGradient>
        <linearGradient id="wat-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#102040" />
          <stop offset="100%" stopColor="#060E1C" />
        </linearGradient>
        <radialGradient id="wat-divine" cx="0.46" cy="0.3" r="0.42">
          <stop offset="0%" stopColor="#E8E0C8" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#E8E0C8" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#E8E0C8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#wat-sky)" />
      {/* divine glow — faint heavenly light breaking through storm */}
      <rect width="800" height="400" fill="url(#wat-divine)" />
      {/* storm clouds — heavy, tearing */}
      <path d="M0,0 Q80,30 160,10 Q240,0 310,40 Q370,70 440,30 Q520,0 590,50 Q650,80 720,40 Q760,20 800,30 L800,0 L0,0 Z" fill="#050810" opacity="0.85" />
      <path d="M0,20 Q60,50 130,28 Q200,10 270,55 Q330,80 400,50 Q470,20 540,60 Q600,88 680,55 Q730,34 800,50 L800,20 Z" fill="#06091A" opacity="0.7" />
      {/* lightning in clouds */}
      <path d="M620,25 L610,52 L622,52 L608,80" stroke="#E8E0C8" strokeWidth="2" fill="none" opacity="0.25" strokeLinecap="round" strokeLinejoin="round" />
      {/* dark churning water — high surface, waves tossing */}
      <path d="M0,205 Q60,188 130,210 Q200,228 280,205 Q360,182 440,208 Q520,228 600,205 Q680,184 800,210 L800,400 L0,400 Z" fill="url(#wat-water)" />
      {/* violent waves */}
      {[0,1,2,3,4].map(i => (
        <path key={i}
          d={`M0,${225+i*26} Q80,${212+i*26} 170,${228+i*26} Q260,${244+i*26} 350,${228+i*26} Q440,${212+i*26} 540,${228+i*26} Q630,${244+i*26} 720,${228+i*26} Q760,${220+i*26} 800,${228+i*26}`}
          stroke="#102240" strokeWidth="2" fill="none" opacity={0.65 - i*0.08} />
      ))}
      {/* white water / foam on wave crests */}
      {[[90,215],[240,208],[510,216],[660,210],[350,222],[170,230]].map(([x,y],i) => (
        <path key={i} d={`M${x-22},${y} Q${x},${y-10} ${x+22},${y}`} stroke="#E8E0C8" strokeWidth="2.5" fill="none" opacity="0.18" />
      ))}
      {/* boat — far background, disciples watching in horror */}
      <g transform="translate(660,210)" opacity="0.5">
        <path d="M-55,14 Q0,-2 55,14 L44,28 L-44,28 Z" fill="#0A1022" />
        <path d="M0,28 L0,-14" stroke="#0A1022" strokeWidth="4" />
        <path d="M0,-14 L34,4 L0,4 Z" fill="#0A1022" opacity="0.4" />
        {/* small figures in boat */}
        {[-28,-10,12,30].map((bx,i) => (
          <circle key={i} cx={bx} cy="14" r="5" fill="#0C1428" opacity="0.7" />
        ))}
      </g>
      {/* water surface ripples around sinking body */}
      <ellipse cx="390" cy="218" rx="48" ry="12" fill="none" stroke="#E8E0C8" strokeWidth="1.5" opacity="0.14" />
      <ellipse cx="390" cy="218" rx="72" ry="18" fill="none" stroke="#E8E0C8" strokeWidth="1" opacity="0.07" />
      {/* peter — sinking from waist down, only torso and raised arm visible */}
      <g transform="translate(390,218)">
        {/* water breaking around his hips — just the surface splash */}
        <path d="M-32,0 Q-20,-12 -8,2 Q0,8 8,2 Q20,-12 32,0" fill="#182E4A" opacity="0.7" />
        {/* torso — submerged below waist, only upper body visible */}
        <path d="M-14,-40 L14,-40 L12,-10 L-12,-10 Z" fill="#3A6090" />
        {/* cloak/robe wet and heavy — dragged down */}
        <path d="M-14,-40 Q-22,-28 -18,-12" stroke="#3A6090" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M14,-40 Q22,-28 18,-12" stroke="#3A6090" strokeWidth="7" strokeLinecap="round" fill="none" />
        {/* head — looking up in terror */}
        <circle cx="0" cy="-54" r="13" fill="#A07050" />
        {/* face turned upward */}
        <path d="M-5,-58 Q0,-64 5,-58" fill="none" stroke="#7A4A28" strokeWidth="1.5" opacity="0.6" />
        {/* left arm — desperately thrust straight up */}
        <path d="M-12,-42 Q-16,-62 -10,-88" stroke="#3A6090" strokeWidth="8" strokeLinecap="round" fill="none" />
        {/* hand spread wide, straining upward */}
        <circle cx="-10" cy="-92" r="7" fill="#A07050" />
        <path d="M-16,-92 Q-22,-98 -20,-106" stroke="#A07050" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M-10,-94 Q-8,-102 -6,-108" stroke="#A07050" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M-4,-92 Q-2,-100 2,-104" stroke="#A07050" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* right arm — flailing for balance */}
        <path d="M12,-42 Q32,-36 40,-28" stroke="#2A4870" strokeWidth="7" strokeLinecap="round" fill="none" />
      </g>
      {/* divine hand and arm — reaching down through the storm break */}
      {/* faint parting in clouds where arm descends */}
      <path d="M340,0 Q360,20 370,40 Q380,60 368,80" fill="none" stroke="#E8E0C8" strokeWidth="1" opacity="0.1" />
      <g transform="translate(362,80)">
        {/* arm — luminous, otherworldly */}
        <path d="M0,-60 Q-2,-30 0,-4" stroke="#D8D0C0" strokeWidth="11" strokeLinecap="round" fill="none" opacity="0.7" />
        {/* wrist */}
        <ellipse cx="0" cy="-2" rx="8" ry="6" fill="#D8D0C0" opacity="0.7" />
        {/* hand reaching toward peter's hand — fingers extended */}
        <path d="M-8,-2 Q-14,10 -10,20 Q-6,28 0,26 Q8,24 10,14 L6,0 Z" fill="#D8D0C0" opacity="0.7" />
        {/* fingers */}
        <path d="M10,14 Q18,24 20,18 Q22,10 16,4" stroke="#D8D0C0" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.7" />
        <path d="M6,0 Q16,-6 20,4" stroke="#D8D0C0" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.7" />
        <path d="M-8,-2 Q-18,-8 -16,4" stroke="#D8D0C0" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7" />
        {/* divine glow around the hand */}
        <circle cx="0" cy="12" r="24" fill="#E8E0C8" opacity="0.06" />
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

/* ── Blind Man — man at pool edge, hands raised to eyes, first light ─────── */
function BlindManArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="bm-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#060A10" />
          <stop offset="60%" stopColor="#0E1C30" />
          <stop offset="100%" stopColor="#182840" />
        </linearGradient>
        <linearGradient id="bm-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A1828" />
          <stop offset="100%" stopColor="#060E18" />
        </linearGradient>
        <radialGradient id="bm-glow" cx="0.5" cy="0.55" r="0.48">
          <stop offset="0%" stopColor="#4A8AB0" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#2A5A80" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#4A8AB0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#bm-sky)" />
      <rect width="800" height="400" fill="url(#bm-glow)" />
      {/* pool water */}
      <ellipse cx="400" cy="310" rx="260" ry="55" fill="url(#bm-water)" opacity="0.9" />
      <ellipse cx="400" cy="310" rx="260" ry="55" fill="none" stroke="#2A5A80" strokeWidth="1.5" opacity="0.5" />
      {/* pool edge / steps */}
      <path d="M120,295 L680,295 L680,315 L120,315 Z" fill="#1A2A3C" opacity="0.8" />
      <path d="M140,280 L660,280 L680,295 L120,295 Z" fill="#1E3040" opacity="0.7" />
      {/* water ripples */}
      <ellipse cx="400" cy="312" rx="80" ry="12" fill="none" stroke="#3A6888" strokeWidth="1" opacity="0.5" />
      <ellipse cx="400" cy="312" rx="140" ry="20" fill="none" stroke="#2A5070" strokeWidth="0.8" opacity="0.35" />
      {/* figure — kneeling at pool edge, hands raised to face */}
      <g transform="translate(395,255)">
        {/* head */}
        <circle cx="0" cy="-26" r="13" fill="#9A7050" />
        {/* torso */}
        <path d="M-12,-12 L12,-12 L10,24 L-10,24 Z" fill="#3A5878" />
        {/* both arms raised, hands near eyes */}
        <path d="M-10,-8 Q-28,-22 -36,-18" stroke="#9A7050" strokeWidth="7" strokeLinecap="round" fill="none" />
        <circle cx="-36" cy="-18" r="5" fill="#9A7050" />
        <path d="M10,-8 Q28,-22 36,-18" stroke="#9A7050" strokeWidth="7" strokeLinecap="round" fill="none" />
        <circle cx="36" cy="-18" r="5" fill="#9A7050" />
        {/* kneeling legs */}
        <path d="M-10,24 Q-14,38 -20,44" stroke="#2A4060" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M10,24 Q14,38 20,44" stroke="#2A4060" strokeWidth="8" strokeLinecap="round" fill="none" />
      </g>
      {/* first light on the water surface */}
      <ellipse cx="400" cy="295" rx="60" ry="8" fill="#4A8AB0" opacity="0.18" />
      {/* distant colonnade */}
      {[160, 240, 560, 640].map((x, i) => (
        <rect key={i} x={x - 5} y="180" width="10" height="100" fill="#1A2A3C" opacity="0.45" />
      ))}
      <rect x="140" y="178" width="520" height="8" fill="#1A2A3C" opacity="0.4" />
    </svg>
  );
}

/* ── Woman Caught in Adultery — public square, stones on ground, alone ───── */
function AdulteryArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="ad-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#100810" />
          <stop offset="55%" stopColor="#1C1028" />
          <stop offset="100%" stopColor="#281838" />
        </linearGradient>
        <linearGradient id="ad-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A1428" />
          <stop offset="100%" stopColor="#0E0C18" />
        </linearGradient>
        <radialGradient id="ad-glow" cx="0.48" cy="0.58" r="0.42">
          <stop offset="0%" stopColor="#8A6AB0" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#8A6AB0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#ad-sky)" />
      <rect width="800" height="400" fill="url(#ad-glow)" />
      {/* ground */}
      <rect x="0" y="300" width="800" height="100" fill="url(#ad-ground)" />
      {/* courtyard paving lines */}
      {[320, 360, 400, 440, 480].map((x, i) => (
        <line key={i} x1={x} y1="300" x2={x - 40} y2="400" stroke="#1E1828" strokeWidth="1" opacity="0.6" />
      ))}
      <line x1="0" y1="340" x2="800" y2="340" stroke="#1E1828" strokeWidth="1" opacity="0.4" />
      {/* stones scattered on ground — the ones not thrown */}
      {[[250,320],[290,332],[330,316],[370,328],[440,322],[480,336],[510,318]].map(([x,y],i) => (
        <ellipse key={i} cx={x} cy={y} rx="9" ry="6" fill="#3A2848" opacity="0.75" />
      ))}
      {/* figure — crouching low, head down */}
      <g transform="translate(400,278)">
        <circle cx="0" cy="-10" r="12" fill="#A07858" />
        {/* shawl/head covering draped */}
        <path d="M-14,-8 Q-24,0 -22,18 L22,18 Q24,0 14,-8 Z" fill="#4A3468" opacity="0.9" />
        <path d="M-14,-18 Q0,-28 14,-18" stroke="#4A3468" strokeWidth="4" fill="none" opacity="0.8" />
        {/* crouching posture — forward lean */}
        <path d="M-10,18 Q-18,34 -26,40" stroke="#2A1E38" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M10,18 Q18,34 26,40" stroke="#2A1E38" strokeWidth="8" strokeLinecap="round" fill="none" />
        {/* arms forward — bracing */}
        <path d="M-10,8 Q-22,18 -30,14" stroke="#A07858" strokeWidth="6" strokeLinecap="round" fill="none" />
        <circle cx="-30" cy="14" r="5" fill="#A07858" />
      </g>
      {/* writing in dirt — partial marks on the ground */}
      <path d="M340,358 Q360,350 380,358" stroke="#5A4870" strokeWidth="2" fill="none" opacity="0.6" strokeDasharray="4 3" />
      <path d="M390,354 Q405,346 420,352" stroke="#5A4870" strokeWidth="2" fill="none" opacity="0.5" strokeDasharray="3 4" />
      <path d="M428,360 Q444,350 456,358" stroke="#5A4870" strokeWidth="2" fill="none" opacity="0.6" strokeDasharray="5 2" />
      {/* distant crowd departing — small figures walking away */}
      {[[140,255],[175,248],[210,258],[620,252],[655,245],[688,255]].map(([x,y],i) => (
        <g key={i} transform={`translate(${x},${y})`} opacity="0.4">
          <circle cx="0" cy="-12" r="6" fill="#1A1428" />
          <rect x="-5" y="-6" width="10" height="18" fill="#1A1428" />
        </g>
      ))}
    </svg>
  );
}

/* ── Hidden Treasure / Pearl — merchant at lamp-lit table, pearl in hand ─── */
function TreasureArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="tr-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#100C08" />
          <stop offset="60%" stopColor="#201808" />
          <stop offset="100%" stopColor="#281E10" />
        </linearGradient>
        <radialGradient id="tr-lamp" cx="0.5" cy="0.52" r="0.5">
          <stop offset="0%" stopColor="#F3D54E" stopOpacity="0.75" />
          <stop offset="35%" stopColor="#E87722" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#E87722" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tr-pearl" cx="0.38" cy="0.35" r="0.6">
          <stop offset="0%" stopColor="#F0EEE8" />
          <stop offset="60%" stopColor="#C8C4B8" />
          <stop offset="100%" stopColor="#A8A098" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#tr-bg)" />
      <rect width="800" height="400" fill="url(#tr-lamp)" />
      {/* wooden table surface */}
      <path d="M180,240 L620,240 L660,400 L140,400 Z" fill="#2A1E0C" />
      <path d="M180,240 L620,240 L620,248 L180,248 Z" fill="#3A2A10" />
      {/* table edge highlight */}
      <line x1="180" y1="240" x2="620" y2="240" stroke="#5A3A18" strokeWidth="2" opacity="0.6" />
      {/* scattered inventory items — other gems, strings of beads */}
      <ellipse cx="270" cy="268" rx="22" ry="10" fill="#1B365D" opacity="0.6" />
      <path d="M244,268 Q270,256 296,268" stroke="#2EBCA8" strokeWidth="2" fill="none" opacity="0.5" />
      <ellipse cx="530" cy="275" rx="18" ry="8" fill="#3A2A08" opacity="0.7" />
      {[505,518,531,544,557].map((x,i) => (
        <circle key={i} cx={x} cy="268" r="4" fill="#C4973A" opacity="0.65" />
      ))}
      {/* small open boxes/pouches */}
      <rect x="220" y="252" width="28" height="20" rx="3" fill="#2A1A08" stroke="#5A3818" strokeWidth="1.5" opacity="0.7" />
      <rect x="560" y="260" width="24" height="16" rx="2" fill="#2A1A08" stroke="#5A3818" strokeWidth="1.5" opacity="0.7" />
      {/* lamp */}
      <ellipse cx="400" cy="192" rx="18" ry="8" fill="#C4973A" opacity="0.9" />
      <rect x="394" y="150" width="12" height="42" fill="#C4973A" opacity="0.8" />
      <ellipse cx="400" cy="148" rx="8" ry="6" fill="#F3D54E" opacity="0.9" />
      {/* flame */}
      <path d="M396,140 Q400,128 404,140 Q400,136 396,140 Z" fill="#F3D54E" />
      <path d="M397,140 Q400,132 403,140 Q400,137 397,140 Z" fill="#FFFFFF" opacity="0.7" />
      {/* merchant figure */}
      <g transform="translate(398,262)">
        {/* head */}
        <circle cx="0" cy="-28" r="14" fill="#9A7050" />
        {/* beard */}
        <path d="M-8,-14 Q0,-6 8,-14" stroke="#7A5030" strokeWidth="4" fill="none" opacity="0.7" />
        {/* torso leaning forward over table */}
        <path d="M-13,-12 L13,-12 L10,12 L-10,12 Z" fill="#3A2810" />
        {/* arm extended — holding pearl up to light */}
        <path d="M10,-8 Q26,-14 34,-22" stroke="#9A7050" strokeWidth="7" strokeLinecap="round" fill="none" />
        {/* pearl in hand */}
        <circle cx="36" cy="-24" r="10" fill="url(#tr-pearl)" />
        <circle cx="33" cy="-27" r="3" fill="#FFFFFF" opacity="0.6" />
        {/* other hand on table */}
        <path d="M-10,-4 Q-22,4 -30,8" stroke="#9A7050" strokeWidth="6" strokeLinecap="round" fill="none" />
        <circle cx="-30" cy="8" r="5" fill="#9A7050" />
      </g>
    </svg>
  );
}

/* ── Laborers — day-labor square, single figure, late afternoon sun ──────── */
function LaborersArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="lb-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0C1808" />
          <stop offset="50%" stopColor="#1A2C10" />
          <stop offset="100%" stopColor="#243818" />
        </linearGradient>
        <linearGradient id="lb-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A2010" />
          <stop offset="100%" stopColor="#0E1408" />
        </linearGradient>
        <radialGradient id="lb-sun" cx="0.78" cy="0.28" r="0.35">
          <stop offset="0%" stopColor="#E87722" stopOpacity="0.65" />
          <stop offset="50%" stopColor="#C4973A" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#E87722" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#lb-sky)" />
      <rect width="800" height="400" fill="url(#lb-sun)" />
      {/* ground */}
      <rect x="0" y="300" width="800" height="100" fill="url(#lb-ground)" />
      {/* distant vineyard rows */}
      {[0,1,2,3,4,5,6].map(i => (
        <line key={i} x1={80 + i*100} y1="220" x2={80 + i*100} y2="300" stroke="#2A3818" strokeWidth="2" opacity="0.5" />
      ))}
      <line x1="60" y1="260" x2="740" y2="260" stroke="#2A3818" strokeWidth="1" opacity="0.35" />
      {/* stone wall of vineyard */}
      <path d="M0,295 L800,295 L800,308 L0,308 Z" fill="#2A2818" opacity="0.7" />
      {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
        <rect key={i} x={i*80 + 4} y="282" width="68" height="14" rx="3" fill="#242018" opacity="0.6" />
      ))}
      {/* gate post */}
      <rect x="382" y="240" width="16" height="60" fill="#302818" opacity="0.8" />
      <rect x="402" y="240" width="16" height="60" fill="#302818" opacity="0.8" />
      {/* lone figure — standing, waiting, leaning slightly */}
      <g transform="translate(240,272)">
        {/* shadow */}
        <ellipse cx="0" cy="28" rx="18" ry="6" fill="#0A1008" opacity="0.5" />
        {/* head */}
        <circle cx="0" cy="-28" r="13" fill="#8A6040" />
        {/* torso */}
        <path d="M-11,-14 L11,-14 L9,20 L-9,20 Z" fill="#3A4828" />
        {/* legs */}
        <path d="M-9,20 L-11,50" stroke="#2A3018" strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M9,20 L11,50" stroke="#2A3018" strokeWidth="9" strokeLinecap="round" fill="none" />
        {/* arms down at sides */}
        <path d="M-10,-10 Q-16,4 -14,18" stroke="#8A6040" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M10,-10 Q16,4 14,18" stroke="#8A6040" strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>
      {/* other hired figures in the distance — walking away already */}
      {[[520,248],[560,242],[600,250],[640,244]].map(([x,y],i) => (
        <g key={i} transform={`translate(${x},${y})`} opacity="0.35">
          <circle cx="0" cy="-12" r="6" fill="#1A2810" />
          <rect x="-5" y="-6" width="10" height="18" fill="#1A2810" />
          <path d="M-5,12 L-6,24" stroke="#1A2810" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M5,12 L6,24" stroke="#1A2810" strokeWidth="4" strokeLinecap="round" fill="none" />
        </g>
      ))}
      {/* late afternoon shadows -- long on the ground */}
      <path d="M233,300 L200,340 L280,340 L247,300 Z" fill="#080E08" opacity="0.3" />
    </svg>
  );
}

/* ── Among the Tombs — dark hillside tombs, shoreline below, a boat ─────── */
function LegionArt() {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="lg-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#080810" />
          <stop offset="55%" stopColor="#10101C" />
          <stop offset="100%" stopColor="#181824" />
        </linearGradient>
        <linearGradient id="lg-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A0C18" />
          <stop offset="100%" stopColor="#060810" />
        </linearGradient>
        <radialGradient id="lg-boat-glow" cx="0.7" cy="0.6" r="0.3">
          <stop offset="0%" stopColor="#8A7AC0" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#8A7AC0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#lg-sky)" />
      <rect width="800" height="400" fill="url(#lg-boat-glow)" />
      {/* stars */}
      {[[100,40],[160,28],[250,55],[340,22],[500,35],[600,18],[700,42],[750,60],[80,70],[420,48]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill="#C8C0D8" opacity="0.6" />
      ))}
      {/* hillside with tombs — left side */}
      <path d="M0,160 Q80,100 160,130 Q220,110 260,150 L260,300 L0,300 Z" fill="#0E0C18" />
      {/* tomb openings carved in hillside */}
      {[[60,180],[100,200],[140,175],[175,195]].map(([x,y],i) => (
        <g key={i}>
          <path d={`M${x-14},${y+20} L${x-14},${y} Q${x},${y-16} ${x+14},${y} L${x+14},${y+20} Z`}
            fill="#050508" stroke="#1E1A28" strokeWidth="1.5" />
        </g>
      ))}
      {/* figure -- crouching on hillside, broken chains visible */}
      <g transform="translate(80,240)">
        <circle cx="0" cy="-20" r="11" fill="#7A5840" />
        {/* ragged clothing */}
        <path d="M-10,-8 L10,-8 L8,14 L-8,14 Z" fill="#1E1828" opacity="0.8" />
        {/* arms braced against ground */}
        <path d="M-8,10 Q-20,18 -30,16" stroke="#7A5840" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M8,10 Q20,18 30,16" stroke="#7A5840" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* broken chain link on wrist */}
        <path d="M24,14 Q32,18 30,24" stroke="#4A4050" strokeWidth="3" fill="none" opacity="0.8" />
        {/* crouching legs */}
        <path d="M-8,14 Q-12,26 -18,30" stroke="#181420" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M8,14 Q12,26 18,30" stroke="#181420" strokeWidth="7" strokeLinecap="round" fill="none" />
      </g>
      {/* shoreline */}
      <path d="M220,295 Q400,270 800,290 L800,320 Q400,300 220,320 Z" fill="#0A0C18" opacity="0.8" />
      <path d="M240,300 Q420,282 800,298" stroke="#1A1C2E" strokeWidth="2" fill="none" opacity="0.6" />
      {/* water */}
      <rect x="220" y="295" width="580" height="105" fill="url(#lg-water)" />
      {/* gentle waves */}
      <path d="M280,315 Q320,308 360,315 Q400,322 440,315" stroke="#1A1E30" strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M480,325 Q530,318 580,325 Q630,332 680,325" stroke="#1A1E30" strokeWidth="1.5" fill="none" opacity="0.4" />
      {/* boat on far water */}
      <path d="M600,285 Q640,280 680,285 L675,305 L605,305 Z" fill="#1A1828" opacity="0.85" />
      {/* boat sail or mast */}
      <line x1="640" y1="285" x2="640" y2="252" stroke="#2A2438" strokeWidth="3" opacity="0.7" />
      {/* light from the boat */}
      <ellipse cx="640" cy="292" rx="35" ry="10" fill="#8A7AC0" opacity="0.15" />
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
  blindMan:  BlindManArt,
  adultery:  AdulteryArt,
  treasure:  TreasureArt,
  laborers:  LaborersArt,
  legion:    LegionArt,
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
