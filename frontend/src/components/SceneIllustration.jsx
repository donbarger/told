import React from 'react';

/*
  Scene illustrations — CSS-only cinematic stills.
  Each SCENE_KEY maps to a distinct visual with:
    - A background gradient (sky/atmosphere)
    - A midground layer (environment)
    - A foreground element (character silhouette)
    - A mood overlay color
*/

const SCENES = {

  departure: {
    label: 'The Departure',
    bg: 'linear-gradient(180deg, #1a0f30 0%, #3a1a05 60%, #0a0500 100%)',
    description: 'A young man walks out of a family home at dusk, suitcase in hand',
    elements: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="si-svg">
        {/* Sky */}
        <defs>
          <radialGradient id="dusk" cx="70%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#C06020" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#1a0f30" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="220" fill="url(#dusk)"/>
        {/* House silhouette */}
        <polygon points="60,140 60,100 90,75 120,100 120,140" fill="#0a0500" opacity="0.9"/>
        <rect x="85" y="115" width="10" height="25" fill="#D4A017" opacity="0.5"/>
        {/* Road */}
        <ellipse cx="250" cy="200" rx="180" ry="30" fill="#0a0500" opacity="0.5"/>
        <polygon points="200,200 250,160 300,200" fill="#1a1008" opacity="0.6"/>
        {/* Walking figure */}
        <g transform="translate(230,148)">
          <circle cx="0" cy="-30" r="8" fill="#2a1a08"/>
          <rect x="-5" y="-22" width="10" height="22" fill="#2a1a08" rx="2"/>
          <line x1="-5" y1="-5" x2="-14" y2="8" stroke="#2a1a08" strokeWidth="4" strokeLinecap="round"/>
          <line x1="5" y1="-5" x2="14" y2="4" stroke="#2a1a08" strokeWidth="4" strokeLinecap="round"/>
          <line x1="-3" y1="0" x2="-8" y2="18" stroke="#2a1a08" strokeWidth="4" strokeLinecap="round"/>
          <line x1="3" y1="0" x2="5" y2="18" stroke="#2a1a08" strokeWidth="4" strokeLinecap="round"/>
          {/* Suitcase */}
          <rect x="10" y="-2" width="12" height="9" fill="#3a2a10" rx="1"/>
          <line x1="13" y1="-4" x2="18" y2="-4" stroke="#3a2a10" strokeWidth="2"/>
        </g>
        {/* Father watching */}
        <g transform="translate(95,132)" opacity="0.7">
          <circle cx="0" cy="-20" r="6" fill="#1a0a04"/>
          <rect x="-4" y="-14" width="8" height="14" fill="#1a0a04" rx="2"/>
        </g>
      </svg>
    ),
  },

  cityNight: {
    label: 'City Lights',
    bg: 'linear-gradient(180deg, #050510 0%, #0a0520 40%, #1a0a00 100%)',
    description: 'City skyline at night, glittering lights',
    elements: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="si-svg">
        <defs>
          <radialGradient id="cityGlow" cx="50%" cy="80%" r="60%">
            <stop offset="0%" stopColor="#D4601A" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#050510" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="220" fill="url(#cityGlow)"/>
        {/* Buildings */}
        {[
          [20,60,40,160],[70,40,35,160],[115,80,25,140],[150,30,50,160],
          [210,55,30,145],[250,20,45,160],[305,70,30,150],[345,45,40,160]
        ].map(([x,y,w,h],i) => (
          <rect key={i} x={x} y={y} width={w} height={h} fill="#0a0818" opacity="0.95"/>
        ))}
        {/* Windows */}
        {[
          [30,75],[55,90],[160,45],[165,65],[255,35],[260,55],[265,75],
          [310,85],[350,60],[80,55],[122,95],[215,70]
        ].map(([x,y],i) => (
          <rect key={i} x={x} y={y} width="5" height="5" fill="#D4A017" opacity={0.4 + Math.random()*0.4} rx="0.5"/>
        ))}
        {/* Street level figure */}
        <g transform="translate(195,160)">
          <circle cx="0" cy="-22" r="6" fill="#1a0a00"/>
          <rect x="-4" y="-16" width="8" height="16" fill="#1a0a00" rx="1"/>
          <line x1="-4" y1="-8" x2="-10" y2="-2" stroke="#1a0a00" strokeWidth="3"/>
          <line x1="4" y1="-8" x2="10" y2="-2" stroke="#1a0a00" strokeWidth="3"/>
          <line x1="-2" y1="0" x2="-4" y2="14" stroke="#1a0a00" strokeWidth="3"/>
          <line x1="2" y1="0" x2="4" y2="14" stroke="#1a0a00" strokeWidth="3"/>
        </g>
      </svg>
    ),
  },

  party: {
    label: 'Wild Living',
    bg: 'linear-gradient(180deg, #0a0018 0%, #1a0030 50%, #2a0510 100%)',
    description: 'A crowded rooftop bar at night, people partying',
    elements: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="si-svg">
        <defs>
          <radialGradient id="partyLight1" cx="30%" cy="40%" r="30%">
            <stop offset="0%" stopColor="#8020C0" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#0a0018" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="partyLight2" cx="70%" cy="50%" r="35%">
            <stop offset="0%" stopColor="#C04020" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#0a0018" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="220" fill="url(#partyLight1)"/>
        <rect width="400" height="220" fill="url(#partyLight2)"/>
        {/* Floor */}
        <rect x="0" y="170" width="400" height="50" fill="#0a0008" opacity="0.8"/>
        {/* Crowd silhouettes */}
        {[
          [50,155],[90,148],[130,160],[170,152],[215,158],[260,150],[300,155],[340,149]
        ].map(([x,y],i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <circle cx="0" cy="-20" r={5+i%2} fill="#0a0008" opacity="0.9"/>
            <rect x="-4" y="-15" width="8" height={14+i%3} fill="#0a0008" rx="1" opacity="0.9"/>
          </g>
        ))}
        {/* Central figure (protagonist) */}
        <g transform="translate(195,152)">
          <circle cx="0" cy="-22" r="7" fill="#1a0808"/>
          <rect x="-5" y="-15" width="10" height="15" fill="#1a0808" rx="1"/>
          <line x1="-5" y1="-8" x2="-12" y2="-2" stroke="#1a0808" strokeWidth="3.5"/>
          <line x1="5" y1="-8" x2="12" y2="-14" stroke="#1a0808" strokeWidth="3.5"/>
          <line x1="-2" y1="0" x2="-4" y2="14" stroke="#1a0808" strokeWidth="3.5"/>
          <line x1="2" y1="0" x2="4" y2="14" stroke="#1a0808" strokeWidth="3.5"/>
        </g>
        {/* Light beams */}
        <line x1="200" y1="0" x2="100" y2="170" stroke="#8020C0" strokeWidth="1" opacity="0.15"/>
        <line x1="200" y1="0" x2="300" y2="170" stroke="#C04020" strokeWidth="1" opacity="0.12"/>
      </svg>
    ),
  },

  apartment: {
    label: 'The Apartment',
    bg: 'linear-gradient(180deg, #0a0800 0%, #150f03 60%, #080600 100%)',
    description: 'A sparse apartment interior at night, figure sitting alone',
    elements: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="si-svg">
        <defs>
          <radialGradient id="lampLight" cx="60%" cy="30%" r="35%">
            <stop offset="0%" stopColor="#D4A017" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="#0a0800" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="220" fill="url(#lampLight)"/>
        {/* Window */}
        <rect x="260" y="30" width="80" height="100" fill="#0a1520" rx="2" opacity="0.9"/>
        <line x1="300" y1="30" x2="300" y2="130" stroke="#1a2030" strokeWidth="2"/>
        <line x1="260" y1="80" x2="340" y2="80" stroke="#1a2030" strokeWidth="2"/>
        {/* City glow through window */}
        <rect x="262" y="32" width="76" height="96" fill="#1a2040" rx="1" opacity="0.5"/>
        {[270,284,298,312,326].map((x,i) => (
          <rect key={i} x={x} y={35+i*5%20} width="5" height="4" fill="#D4A017" opacity="0.3" rx="0.5"/>
        ))}
        {/* Couch */}
        <rect x="60" y="155" width="220" height="40" fill="#1a1408" rx="4" opacity="0.9"/>
        <rect x="55" y="145" width="30" height="50" fill="#1a1408" rx="4" opacity="0.9"/>
        <rect x="245" y="145" width="30" height="50" fill="#1a1408" rx="4" opacity="0.9"/>
        {/* Figure sitting */}
        <g transform="translate(165,148)">
          <circle cx="0" cy="-22" r="7" fill="#1a1008"/>
          <rect x="-6" y="-15" width="12" height="15" fill="#1a1008" rx="2"/>
          <line x1="-6" y1="-5" x2="-14" y2="2" stroke="#1a1008" strokeWidth="3.5"/>
          <line x1="6" y1="-5" x2="14" y2="2" stroke="#1a1008" strokeWidth="3.5"/>
          {/* Phone glow */}
          <rect x="10" y="-2" width="8" height="12" fill="#2a4a8a" rx="1" opacity="0.7"/>
        </g>
        {/* Floor lamp */}
        <line x1="310" y1="120" x2="315" y2="200" stroke="#2a2010" strokeWidth="3"/>
        <ellipse cx="313" cy="118" rx="12" ry="8" fill="#1a1508" opacity="0.8"/>
      </svg>
    ),
  },

  moneyRunning: {
    label: 'Running Dry',
    bg: 'linear-gradient(180deg, #0a0a00 0%, #1a1200 60%, #0a0800 100%)',
    description: 'Empty wallet, credit card declined, bare refrigerator',
    elements: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="si-svg">
        <defs>
          <radialGradient id="coldLight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#304060" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#0a0a00" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="220" fill="url(#coldLight)"/>
        {/* ATM screen */}
        <rect x="150" y="50" width="100" height="70" fill="#0a1020" rx="4" opacity="0.95"/>
        <rect x="158" y="58" width="84" height="55" fill="#081830" rx="2" opacity="0.9"/>
        <text x="200" y="82" textAnchor="middle" fill="#cc2020" fontSize="9" fontFamily="monospace">DECLINED</text>
        <text x="200" y="96" textAnchor="middle" fill="#8a9ab0" fontSize="7" fontFamily="monospace">BALANCE: $0.00</text>
        {/* Figure at ATM */}
        <g transform="translate(200,155)">
          <circle cx="0" cy="-22" r="7" fill="#1a1008"/>
          <rect x="-5" y="-15" width="10" height="15" fill="#1a1008" rx="1"/>
          <line x1="-5" y1="-8" x2="-12" y2="-2" stroke="#1a1008" strokeWidth="3.5"/>
          <line x1="5" y1="-8" x2="8" y2="-18" stroke="#1a1008" strokeWidth="3.5"/>
          <line x1="-2" y1="0" x2="-5" y2="15" stroke="#1a1008" strokeWidth="3.5"/>
          <line x1="2" y1="0" x2="3" y2="15" stroke="#1a1008" strokeWidth="3.5"/>
        </g>
        {/* Dollar signs floating away */}
        {['$','$','$'].map((s,i) => (
          <text key={i} x={80+i*90} y={40+i*15} fill="#D4A017" fontSize="14" opacity={0.1+i*0.08}>{s}</text>
        ))}
      </svg>
    ),
  },

  loneliness: {
    label: 'Alone',
    bg: 'linear-gradient(180deg, #040408 0%, #0a0a14 60%, #060406 100%)',
    description: 'Figure sitting alone at a bar, empty stool beside them',
    elements: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="si-svg">
        <defs>
          <radialGradient id="barLight" cx="50%" cy="20%" r="40%">
            <stop offset="0%" stopColor="#8B6914" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#040408" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="220" fill="url(#barLight)"/>
        {/* Bar counter */}
        <rect x="0" y="145" width="400" height="15" fill="#1a1008" rx="2" opacity="0.95"/>
        <rect x="0" y="160" width="400" height="60" fill="#0f0a04" opacity="0.95"/>
        {/* Bottles on shelf */}
        {[60,90,130,165,210,250,290,330].map((x,i) => (
          <g key={i}>
            <rect x={x} y={50+i%3*8} width={8+i%2*3} height={40-i%2*5} fill={`hsl(${30+i*15},40%,${8+i%3*3}%)`} rx="2" opacity="0.8"/>
          </g>
        ))}
        {/* Mirror / shelf line */}
        <rect x="0" y="48" width="400" height="3" fill="#2a2010" opacity="0.6"/>
        <rect x="0" y="95" width="400" height="2" fill="#2a2010" opacity="0.4"/>
        {/* Bar stool + figure */}
        <g transform="translate(160,142)">
          <circle cx="0" cy="-50" r="7" fill="#1a1008"/>
          <rect x="-5" y="-43" width="10" height="13" fill="#1a1008" rx="1"/>
          <line x1="-5" y1="-35" x2="-12" y2="-30" stroke="#1a1008" strokeWidth="3"/>
          <line x1="5" y1="-35" x2="12" y2="-30" stroke="#1a1008" strokeWidth="3"/>
          <line x1="-2" y1="-30" x2="-4" y2="-14" stroke="#1a1008" strokeWidth="3"/>
          <line x1="2" y1="-30" x2="4" y2="-14" stroke="#1a1008" strokeWidth="3"/>
          {/* Stool */}
          <ellipse cx="0" cy="-10" rx="14" ry="4" fill="#2a1a08" opacity="0.8"/>
          <line x1="-8" y1="-8" x2="-10" y2="8" stroke="#2a1a08" strokeWidth="3"/>
          <line x1="8" y1="-8" x2="10" y2="8" stroke="#2a1a08" strokeWidth="3"/>
          {/* Drink */}
          <rect x="18" y="-42" width="8" height="14" fill="#1a2a3a" rx="1" opacity="0.8"/>
        </g>
        {/* Empty stool beside */}
        <g transform="translate(210,142)" opacity="0.4">
          <ellipse cx="0" cy="-10" rx="14" ry="4" fill="#2a1a08"/>
          <line x1="-8" y1="-8" x2="-10" y2="8" stroke="#2a1a08" strokeWidth="3"/>
          <line x1="8" y1="-8" x2="10" y2="8" stroke="#2a1a08" strokeWidth="3"/>
        </g>
      </svg>
    ),
  },

  streetWork: {
    label: 'Survival',
    bg: 'linear-gradient(180deg, #080808 0%, #101010 60%, #060606 100%)',
    description: 'Grim warehouse or street corner work, grey dawn',
    elements: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="si-svg">
        <defs>
          <linearGradient id="greyDawn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a2020" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#080808" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <rect width="400" height="220" fill="url(#greyDawn)"/>
        {/* Warehouse wall */}
        <rect x="0" y="60" width="400" height="160" fill="#0c0c0c" opacity="0.9"/>
        <rect x="0" y="56" width="400" height="8" fill="#181818" opacity="0.9"/>
        {/* Loading dock */}
        <rect x="60" y="100" width="120" height="120" fill="#080808" opacity="0.95"/>
        <rect x="65" y="105" width="110" height="110" fill="#0a0a0a" opacity="0.9"/>
        {/* Cardboard boxes */}
        {[[120,160],[150,155],[130,135],[165,140]].map(([x,y],i) => (
          <rect key={i} x={x} y={y} width={25+i*3} height={20+i*2} fill="#1a1208" rx="1" opacity="0.9"/>
        ))}
        {/* Hunched figure */}
        <g transform="translate(190,162)">
          <circle cx="0" cy="-28" r="7" fill="#101008"/>
          <rect x="-5" y="-21" width="10" height="16" fill="#101008" rx="1"/>
          {/* Hunched posture — arms forward/down */}
          <line x1="-5" y1="-12" x2="-18" y2="-2" stroke="#101008" strokeWidth="4" strokeLinecap="round"/>
          <line x1="5" y1="-12" x2="18" y2="-2" stroke="#101008" strokeWidth="4" strokeLinecap="round"/>
          <line x1="-2" y1="-5" x2="-4" y2="12" stroke="#101008" strokeWidth="4" strokeLinecap="round"/>
          <line x1="2" y1="-5" x2="4" y2="12" stroke="#101008" strokeWidth="4" strokeLinecap="round"/>
        </g>
        {/* Single bare bulb */}
        <circle cx="200" cy="70" r="4" fill="#D4A017" opacity="0.6"/>
        <line x1="200" y1="60" x2="200" y2="66" stroke="#2a2010" strokeWidth="2"/>
        <circle cx="200" cy="70" r="20" fill="#D4A017" opacity="0.05"/>
      </svg>
    ),
  },

  pigstyMoment: {
    label: 'Rock Bottom',
    bg: 'linear-gradient(180deg, #060606 0%, #0e0e0a 60%, #060604 100%)',
    description: 'Cold warehouse corner, single figure hunched in shadow',
    elements: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="si-svg">
        <defs>
          <radialGradient id="singleLight" cx="50%" cy="35%" r="25%">
            <stop offset="0%" stopColor="#8B6914" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#060606" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="220" fill="url(#singleLight)"/>
        {/* Concrete floor */}
        <rect x="0" y="175" width="400" height="45" fill="#080806" opacity="0.95"/>
        {/* Pallet */}
        <rect x="120" y="160" width="160" height="18" fill="#1a1208" opacity="0.9" rx="1"/>
        {[130,155,180,205,230,255].map((x,i) => (
          <rect key={i} x={x} y={163} width="4" height="12" fill="#0a0a06" opacity="0.8"/>
        ))}
        {/* Figure sitting hunched on pallet */}
        <g transform="translate(200,160)">
          <circle cx="0" cy="-30" r="8" fill="#0f0f08"/>
          {/* Hunched over — head down */}
          <path d="M-8,-22 Q0,-15 8,-22" fill="#0f0f08"/>
          <rect x="-7" y="-22" width="14" height="18" fill="#0f0f08" rx="2"/>
          {/* Arms wrapped around knees */}
          <line x1="-7" y1="-10" x2="-15" y2="4" stroke="#0f0f08" strokeWidth="5" strokeLinecap="round"/>
          <line x1="7" y1="-10" x2="15" y2="4" stroke="#0f0f08" strokeWidth="5" strokeLinecap="round"/>
          <line x1="-4" y1="-4" x2="-6" y2="8" stroke="#0f0f08" strokeWidth="5" strokeLinecap="round"/>
          <line x1="4" y1="-4" x2="6" y2="8" stroke="#0f0f08" strokeWidth="5" strokeLinecap="round"/>
        </g>
        {/* Distant open door — light from outside */}
        <rect x="330" y="80" width="50" height="100" fill="#1a1810" opacity="0.3" rx="1"/>
        <rect x="332" y="82" width="46" height="96" fill="#3a3020" opacity="0.2" rx="1"/>
      </svg>
    ),
  },

  longRoad: {
    label: 'The Long Walk',
    bg: 'linear-gradient(180deg, #0a0500 0%, #1a1000 50%, #0a0800 100%)',
    description: 'A lone figure walking a long empty road at dawn, seen from behind',
    elements: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="si-svg">
        <defs>
          <radialGradient id="dawn" cx="50%" cy="55%" r="50%">
            <stop offset="0%" stopColor="#8B3A00" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#0a0500" stopOpacity="0"/>
          </radialGradient>
          <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1008" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#0a0800" stopOpacity="0.9"/>
          </linearGradient>
        </defs>
        <rect width="400" height="220" fill="url(#dawn)"/>
        {/* Road — perspective */}
        <polygon points="170,120 230,120 350,220 50,220" fill="url(#roadGrad)" opacity="0.9"/>
        {/* Road markings */}
        {[140,155,168,180].map((y,i) => (
          <rect key={i} x={198-i*2} y={y} width="4" height="8" fill="#2a2010" opacity={0.5-i*0.1} rx="1"/>
        ))}
        {/* Distant horizon glow */}
        <ellipse cx="200" cy="120" rx="100" ry="20" fill="#C05010" opacity="0.12"/>
        {/* Small distant figure walking away */}
        <g transform="translate(200,115)" opacity="0.85">
          <circle cx="0" cy="-12" r="4" fill="#1a0800"/>
          <rect x="-3" y="-8" width="6" height="8" fill="#1a0800" rx="1"/>
          <line x1="-3" y1="-4" x2="-6" y2="0" stroke="#1a0800" strokeWidth="2.5"/>
          <line x1="3" y1="-4" x2="6" y2="0" stroke="#1a0800" strokeWidth="2.5"/>
          <line x1="-1" y1="0" x2="-2" y2="7" stroke="#1a0800" strokeWidth="2.5"/>
          <line x1="1" y1="0" x2="2" y2="7" stroke="#1a0800" strokeWidth="2.5"/>
        </g>
        {/* Flat fields */}
        <rect x="0" y="118" width="170" height="15" fill="#0f0c04" opacity="0.8"/>
        <rect x="230" y="118" width="170" height="15" fill="#0f0c04" opacity="0.8"/>
      </svg>
    ),
  },

  fatherRunning: {
    label: 'The Father Runs',
    bg: 'linear-gradient(180deg, #1a0800 0%, #3a1800 40%, #8B3A00 80%, #D4A017 100%)',
    description: 'Golden sunrise, father running down a road toward returning son',
    elements: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="si-svg">
        <defs>
          <radialGradient id="sunrise" cx="50%" cy="100%" r="80%">
            <stop offset="0%" stopColor="#D4A017" stopOpacity="0.9"/>
            <stop offset="40%" stopColor="#8B3A00" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#1a0800" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="220" fill="url(#sunrise)"/>
        {/* Road */}
        <polygon points="160,100 240,100 380,220 20,220" fill="#2a1408" opacity="0.7"/>
        {/* Oak tree silhouette */}
        <rect x="330" y="100" width="8" height="120" fill="#0a0600" opacity="0.9"/>
        <ellipse cx="334" cy="95" rx="28" ry="22" fill="#0a0600" opacity="0.85"/>
        {/* Father — running figure, larger, arms open */}
        <g transform="translate(230,130)">
          <circle cx="0" cy="-30" r="9" fill="#0f0800"/>
          <rect x="-6" y="-21" width="12" height="18" fill="#0f0800" rx="2"/>
          {/* Running pose — leaning forward */}
          <line x1="-6" y1="-12" x2="-22" y2="-20" stroke="#0f0800" strokeWidth="5" strokeLinecap="round"/>
          <line x1="6" y1="-12" x2="20" y2="-4" stroke="#0f0800" strokeWidth="5" strokeLinecap="round"/>
          <line x1="-3" y1="-3" x2="-12" y2="14" stroke="#0f0800" strokeWidth="5" strokeLinecap="round"/>
          <line x1="3" y1="-3" x2="8" y2="14" stroke="#0f0800" strokeWidth="5" strokeLinecap="round"/>
        </g>
        {/* Son — smaller, approaching */}
        <g transform="translate(160,140)" opacity="0.8">
          <circle cx="0" cy="-22" r="6" fill="#1a0a00"/>
          <rect x="-4" y="-16" width="8" height="14" fill="#1a0a00" rx="1"/>
          <line x1="-4" y1="-8" x2="-10" y2="-3" stroke="#1a0a00" strokeWidth="3"/>
          <line x1="4" y1="-8" x2="10" y2="-3" stroke="#1a0a00" strokeWidth="3"/>
          <line x1="-2" y1="-2" x2="-4" y2="12" stroke="#1a0a00" strokeWidth="3"/>
          <line x1="2" y1="-2" x2="4" y2="12" stroke="#1a0a00" strokeWidth="3"/>
        </g>
        {/* Sun glow on horizon */}
        <ellipse cx="200" cy="220" rx="120" ry="40" fill="#D4A017" opacity="0.2"/>
      </svg>
    ),
  },

  embrace: {
    label: 'The Embrace',
    bg: 'linear-gradient(180deg, #1a0a00 0%, #4a2200 50%, #D4A017 120%)',
    description: 'Two figures embracing on a road, golden light',
    elements: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="si-svg">
        <defs>
          <radialGradient id="goldenLight" cx="50%" cy="90%" r="70%">
            <stop offset="0%" stopColor="#D4A017" stopOpacity="0.8"/>
            <stop offset="60%" stopColor="#8B3A00" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#1a0a00" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="220" fill="url(#goldenLight)"/>
        {/* Road */}
        <polygon points="155,105 245,105 370,220 30,220" fill="#2a1408" opacity="0.6"/>
        {/* Two figures embracing */}
        <g transform="translate(200,140)">
          {/* Father */}
          <circle cx="-8" cy="-35" r="9" fill="#0f0800"/>
          <rect x="-16" y="-26" width="14" height="20" fill="#0f0800" rx="2"/>
          <line x1="-16" y1="-16" x2="-6" y2="-26" stroke="#0f0800" strokeWidth="5" strokeLinecap="round"/>
          <line x1="-2" y1="-16" x2="8" y2="-26" stroke="#0f0800" strokeWidth="5" strokeLinecap="round"/>
          <line x1="-12" y1="-6" x2="-14" y2="12" stroke="#0f0800" strokeWidth="4.5" strokeLinecap="round"/>
          <line x1="-4" y1="-6" x2="-2" y2="12" stroke="#0f0800" strokeWidth="4.5" strokeLinecap="round"/>
          {/* Son */}
          <circle cx="10" cy="-30" r="7" fill="#1a1008"/>
          <rect x="4" y="-23" width="12" height="17" fill="#1a1008" rx="2"/>
          <line x1="4" y1="-14" x2="-4" y2="-24" stroke="#1a1008" strokeWidth="4" strokeLinecap="round"/>
          <line x1="16" y1="-14" x2="6" y2="-24" stroke="#1a1008" strokeWidth="4" strokeLinecap="round"/>
          <line x1="6" y1="-6" x2="4" y2="10" stroke="#1a1008" strokeWidth="4" strokeLinecap="round"/>
          <line x1="12" y1="-6" x2="14" y2="10" stroke="#1a1008" strokeWidth="4" strokeLinecap="round"/>
        </g>
        {/* Radiant golden halo behind figures */}
        <ellipse cx="200" cy="130" rx="50" ry="40" fill="#D4A017" opacity="0.07"/>
      </svg>
    ),
  },

  feast: {
    label: 'The Feast',
    bg: 'linear-gradient(180deg, #1a0800 0%, #3a1200 50%, #6a2a00 100%)',
    description: 'A warmly lit home interior, table full of food, family gathered',
    elements: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="si-svg">
        <defs>
          <radialGradient id="warmHome" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#D4601A" stopOpacity="0.7"/>
            <stop offset="100%" stopColor="#1a0800" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="220" fill="url(#warmHome)"/>
        {/* Table */}
        <ellipse cx="200" cy="170" rx="130" ry="22" fill="#2a1408" opacity="0.95"/>
        <rect x="75" y="170" width="250" height="12" fill="#2a1408" rx="2" opacity="0.9"/>
        {/* Food on table */}
        {[120,155,195,235,270].map((x,i) => (
          <ellipse key={i} cx={x} cy="168" rx={10+i%2*4} ry="6" fill={`hsl(${20+i*15},60%,${12+i%3*4}%)`} opacity="0.8"/>
        ))}
        {/* Candles */}
        {[140,200,260].map((x,i) => (
          <g key={i}>
            <rect x={x-2} y={145} width="4" height="22" fill="#3a2a10" rx="1" opacity="0.9"/>
            <ellipse cx={x} cy={143} rx="5" ry="3" fill="#D4A017" opacity="0.8"/>
            <ellipse cx={x} cy={141} rx="3" ry="5" fill="#D4A017" opacity="0.6"/>
          </g>
        ))}
        {/* Family figures around table */}
        {[100,160,200,240,300].map((x,i) => (
          <g key={i} transform={`translate(${x},155)`}>
            <circle cx="0" cy="-20" r={6+i%2} fill="#1a0a00" opacity="0.85"/>
            <rect x="-5" y="-14" width="10" height="14" fill="#1a0a00" rx="1" opacity="0.85"/>
          </g>
        ))}
        {/* Windows - warm interior light spilling out */}
        <rect x="20" y="40" width="50" height="65" fill="#3a2010" rx="2" opacity="0.6"/>
        <rect x="330" y="40" width="50" height="65" fill="#3a2010" rx="2" opacity="0.6"/>
      </svg>
    ),
  },

  penthouse: {
    label: 'The High Floor',
    bg: 'linear-gradient(180deg, #04060e 0%, #080a1a 60%, #040610 100%)',
    description: 'Floor-to-ceiling windows of a luxury high-rise, city far below',
    elements: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="si-svg">
        <defs>
          <linearGradient id="pentWindow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#050b1c"/>
            <stop offset="100%" stopColor="#091424"/>
          </linearGradient>
          <radialGradient id="pentGlow" cx="50%" cy="30%" r="55%">
            <stop offset="0%" stopColor="#1a2848" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#04060e" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="220" fill="url(#pentGlow)"/>
        {/* Floor */}
        <rect x="0" y="192" width="400" height="28" fill="#050508" opacity="0.95"/>
        <rect x="60" y="194" width="280" height="10" fill="#0a0c14" opacity="0.5" rx="1"/>
        {/* Massive window */}
        <rect x="55" y="5" width="290" height="187" fill="url(#pentWindow)" rx="1" opacity="0.98"/>
        {/* Window frame */}
        <rect x="52" y="4" width="4" height="189" fill="#0c0e18" opacity="0.9"/>
        <rect x="344" y="4" width="4" height="189" fill="#0c0e18" opacity="0.9"/>
        <rect x="52" y="189" width="296" height="4" fill="#0c0e18" opacity="0.9"/>
        {/* City far below — tiny lights at extreme depth */}
        {[148,156,163,169,175,181].map((y, row) =>
          [65,78,91,105,119,133,147,162,177,192,207,222,237,252,267,282,297,312,325,338].map((x, col) => (
            <rect key={`${row}-${col}`} x={x} y={y} width="3" height="2"
              fill={col % 4 === 0 ? '#D4A017' : col % 4 === 1 ? '#4a6888' : col % 3 === 0 ? '#3a5878' : '#2a3a58'}
              opacity={0.12 + row * 0.03 + (col % 5) * 0.03}/>
          ))
        )}
        {/* Distant skyline */}
        {[[65,104,22,85],[94,95,16,94],[116,108,20,81],[143,90,18,99],[167,100,25,89],[198,86,20,103],[224,97,18,92],[248,91,24,98],[278,106,16,83],[300,89,22,100],[328,98,20,91]].map(([x,y,w,h],i)=>(
          <rect key={i} x={x} y={y} width={w} height={h} fill="#050a14" opacity="0.75"/>
        ))}
        {/* City horizon glow */}
        <ellipse cx="200" cy="185" rx="160" ry="14" fill="#1a3660" opacity="0.1"/>
        {/* Standing figure — confident, looking out */}
        <g transform="translate(308,168)">
          <circle cx="0" cy="-36" r="8" fill="#0c0e1c"/>
          <rect x="-6" y="-28" width="12" height="23" fill="#0c0e1c" rx="2"/>
          <line x1="-6" y1="-18" x2="-16" y2="-8" stroke="#0c0e1c" strokeWidth="4" strokeLinecap="round"/>
          <line x1="6" y1="-18" x2="14" y2="-10" stroke="#0c0e1c" strokeWidth="4" strokeLinecap="round"/>
          <line x1="-3" y1="-5" x2="-5" y2="12" stroke="#0c0e1c" strokeWidth="4" strokeLinecap="round"/>
          <line x1="3" y1="-5" x2="5" y2="12" stroke="#0c0e1c" strokeWidth="4" strokeLinecap="round"/>
        </g>
        {/* Champagne flute */}
        <g transform="translate(102,172)">
          <polygon points="-6,-25 6,-25 3,0 -3,0" fill="#162030" opacity="0.8"/>
          <rect x="-1" y="0" width="2" height="14" fill="#162030" opacity="0.8"/>
          <rect x="-6" y="14" width="12" height="2" fill="#162030" opacity="0.8"/>
          <circle cx="0" cy="-20" r="1.5" fill="#D4A017" opacity="0.45"/>
          <circle cx="-2" cy="-16" r="1" fill="#D4A017" opacity="0.3"/>
          <circle cx="2" cy="-12" r="1" fill="#D4A017" opacity="0.25"/>
        </g>
        <rect x="86" y="173" width="32" height="3" fill="#0c0e16" opacity="0.8" rx="1"/>
      </svg>
    ),
  },

  bottleService: {
    label: 'VIP',
    bg: 'linear-gradient(180deg, #0a0018 0%, #180030 45%, #260008 100%)',
    description: 'VIP club section, bottle service with sparklers, celebrating',
    elements: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="si-svg">
        <defs>
          <radialGradient id="vipPurple" cx="30%" cy="30%" r="45%">
            <stop offset="0%" stopColor="#6010a0" stopOpacity="0.55"/>
            <stop offset="100%" stopColor="#0a0018" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="vipPink" cx="70%" cy="40%" r="40%">
            <stop offset="0%" stopColor="#a01030" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#0a0018" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="vipSpot" cx="50%" cy="10%" r="35%">
            <stop offset="0%" stopColor="#D4A017" stopOpacity="0.25"/>
            <stop offset="100%" stopColor="#0a0018" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="220" fill="url(#vipPurple)"/>
        <rect width="400" height="220" fill="url(#vipPink)"/>
        <rect width="400" height="220" fill="url(#vipSpot)"/>
        {/* Booth back */}
        <path d="M30,130 Q200,110 370,130 L370,220 L30,220 Z" fill="#0a0008" opacity="0.85"/>
        {/* Table */}
        <ellipse cx="200" cy="162" rx="100" ry="14" fill="#180010" opacity="0.95"/>
        {/* Bottles — champagne/vodka silhouettes */}
        {[[140,130,8,32],[162,122,8,40],[184,126,8,36],[216,122,9,40],[240,128,8,34],[264,132,7,30]].map(([x,y,w,h],i)=>(
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} fill={i%2===0?"#0a1020":"#100810"} rx="3" opacity="0.9"/>
            <rect x={x+1} y={y-6} width={w-2} height="8" fill={i%2===0?"#0a1020":"#100810"} rx="2" opacity="0.9"/>
          </g>
        ))}
        {/* Sparklers on main bottles */}
        {[[168,120],[222,120]].map(([cx,cy],b)=>
          Array.from({length:12},(_,i)=>{
            const angle = (i/12)*Math.PI*2;
            const r = 14+i%3*3;
            return <line key={`${b}-${i}`} x1={cx} y1={cy} x2={cx+Math.cos(angle)*r} y2={cy+Math.sin(angle)*r} stroke="#D4A017" strokeWidth="0.8" opacity={0.6-i*0.03}/>;
          })
        )}
        {/* Crowd silhouettes */}
        {[[45,148],[75,140],[340,148],[365,142],[110,152],[300,152]].map(([x,y],i)=>(
          <g key={i} transform={`translate(${x},${y})`}>
            <circle cx="0" cy="-18" r={5+i%2} fill="#080008" opacity="0.85"/>
            <rect x="-4" y="-13" width="8" height="13" fill="#080008" rx="1" opacity="0.85"/>
          </g>
        ))}
        {/* Central figure — arms raised, celebrating */}
        <g transform="translate(200,148)">
          <circle cx="0" cy="-24" r="7" fill="#120008"/>
          <rect x="-5" y="-17" width="10" height="17" fill="#120008" rx="1"/>
          <line x1="-5" y1="-10" x2="-18" y2="-22" stroke="#120008" strokeWidth="4" strokeLinecap="round"/>
          <line x1="5" y1="-10" x2="18" y2="-22" stroke="#120008" strokeWidth="4" strokeLinecap="round"/>
          <line x1="-2" y1="0" x2="-4" y2="14" stroke="#120008" strokeWidth="4" strokeLinecap="round"/>
          <line x1="2" y1="0" x2="4" y2="14" stroke="#120008" strokeWidth="4" strokeLinecap="round"/>
        </g>
        {/* Light beams */}
        <line x1="200" y1="0" x2="80" y2="180" stroke="#6010a0" strokeWidth="1.5" opacity="0.1"/>
        <line x1="200" y1="0" x2="320" y2="180" stroke="#a01030" strokeWidth="1.5" opacity="0.08"/>
      </svg>
    ),
  },

  drinkingAlone: {
    label: 'Last Call',
    bg: 'linear-gradient(180deg, #060300 0%, #100800 60%, #080500 100%)',
    description: 'Solitary drinking, amber lamp, bottle and glass on a table',
    elements: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="si-svg">
        <defs>
          <radialGradient id="drinkAmber" cx="50%" cy="35%" r="30%">
            <stop offset="0%" stopColor="#c07010" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#060300" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="220" fill="url(#drinkAmber)"/>
        {/* Table surface */}
        <rect x="40" y="148" width="320" height="10" fill="#100800" rx="2" opacity="0.95"/>
        <rect x="40" y="158" width="320" height="62" fill="#080500" opacity="0.95"/>
        {/* Bottle — half empty */}
        <rect x="225" y="90" width="18" height="58" fill="#0a1408" rx="4" opacity="0.9"/>
        <rect x="228" y="82" width="12" height="12" fill="#0a1408" rx="2" opacity="0.9"/>
        <rect x="230" y="76" width="8" height="8" fill="#0a1408" rx="2" opacity="0.9"/>
        {/* Liquid in bottle — half level */}
        <rect x="225" y="118" width="18" height="30" fill="#1a3010" rx="0 0 4 4" opacity="0.7"/>
        {/* Glass */}
        <polygon points="248,148 258,148 255,115 251,115" fill="#1a2030" opacity="0.75"/>
        <rect x="248" y="130" width="10" height="18" fill="#c07010" rx="0 0 3 3" opacity="0.25"/>
        {/* Overhead lamp */}
        <line x1="200" y1="0" x2="200" y2="22" stroke="#1a1008" strokeWidth="2"/>
        <ellipse cx="200" cy="30" rx="22" ry="10" fill="#1a1008" opacity="0.9"/>
        <ellipse cx="200" cy="28" rx="18" ry="8" fill="#D4A017" opacity="0.55"/>
        <circle cx="200" cy="30" rx="24" ry="24" fill="#c07010" opacity="0.04"/>
        {/* Figure hunched at table */}
        <g transform="translate(165,147)">
          <circle cx="0" cy="-38" r="8" fill="#0e0800"/>
          {/* Hunched — head low over table */}
          <rect x="-7" y="-30" width="14" height="20" fill="#0e0800" rx="2"/>
          <line x1="-7" y1="-20" x2="-20" y2="-10" stroke="#0e0800" strokeWidth="4.5" strokeLinecap="round"/>
          <line x1="7" y1="-20" x2="20" y2="-12" stroke="#0e0800" strokeWidth="4.5" strokeLinecap="round"/>
          <line x1="-3" y1="-10" x2="-5" y2="4" stroke="#0e0800" strokeWidth="4.5" strokeLinecap="round"/>
          <line x1="3" y1="-10" x2="5" y2="4" stroke="#0e0800" strokeWidth="4.5" strokeLinecap="round"/>
        </g>
        {/* Empty glass nearby */}
        <polygon points="172,148 180,148 178,125 174,125" fill="#1a2030" opacity="0.45"/>
      </svg>
    ),
  },

  morningAfter: {
    label: 'Morning',
    bg: 'linear-gradient(180deg, #141410 0%, #1c1c18 60%, #0c0c0a 100%)',
    description: 'Harsh morning light through blinds, regret, bottles on floor',
    elements: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="si-svg">
        <defs>
          <linearGradient id="morningGrey" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#383830" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#141410" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <rect width="400" height="220" fill="url(#morningGrey)"/>
        {/* Blind light stripes from right wall */}
        {[18,34,50,66,82,98,114,130,146,162].map((y,i)=>(
          <rect key={i} x="0" y={y} width="400" height="8" fill="#303028" opacity={0.22-i*0.01} rx="0"/>
        ))}
        {/* Bed — mattress on floor */}
        <rect x="20" y="130" width="360" height="50" fill="#1a1810" rx="4" opacity="0.9"/>
        <rect x="20" y="125" width="360" height="15" fill="#141210" rx="2" opacity="0.9"/>
        {/* Rumpled sheets */}
        <path d="M20,130 Q80,125 140,132 Q200,138 260,130 Q320,122 380,130 L380,155 L20,155 Z" fill="#181612" opacity="0.7"/>
        {/* Figure on bed edge, head in hands */}
        <g transform="translate(200,128)">
          <circle cx="0" cy="-28" r="8" fill="#101008"/>
          {/* Head bowed into hands */}
          <rect x="-7" y="-20" width="14" height="18" fill="#101008" rx="2"/>
          <line x1="-7" y1="-10" x2="-18" y2="-4" stroke="#101008" strokeWidth="5" strokeLinecap="round"/>
          <line x1="7" y1="-10" x2="18" y2="-4" stroke="#101008" strokeWidth="5" strokeLinecap="round"/>
          {/* Elbows on knees */}
          <line x1="-3" y1="-2" x2="-10" y2="10" stroke="#101008" strokeWidth="5" strokeLinecap="round"/>
          <line x1="3" y1="-2" x2="10" y2="10" stroke="#101008" strokeWidth="5" strokeLinecap="round"/>
        </g>
        {/* Bottles on floor */}
        <g transform="translate(80,175)">
          <rect x="0" y="-40" width="10" height="40" fill="#0a1010" rx="3" opacity="0.85"/>
          <rect x="2" y="-48" width="6" height="10" fill="#0a1010" rx="2" opacity="0.85"/>
        </g>
        <g transform="translate(110,180)" opacity="0.7">
          <rect x="0" y="-30" width="10" height="30" fill="#0a1010" rx="3" opacity="0.85"/>
          <rect x="2" y="-38" width="6" height="10" fill="#0a1010" rx="2" opacity="0.85"/>
        </g>
        {/* Can on floor */}
        <rect x="305" y="158" width="12" height="22" fill="#181810" rx="2" opacity="0.7"/>
        {/* Phone face down */}
        <rect x="265" y="172" width="24" height="14" fill="#0c0c0c" rx="2" opacity="0.8"/>
        {/* Harsh light bar on wall */}
        <rect x="340" y="0" width="60" height="220" fill="#282820" opacity="0.18"/>
      </svg>
    ),
  },

  wealthDisplay: {
    label: 'Cash Out',
    bg: 'linear-gradient(180deg, #0e0800 0%, #1a1000 55%, #100a00 100%)',
    description: 'Cash spread on table, credit cards, phone showing balance, flush with money',
    elements: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="si-svg">
        <defs>
          <radialGradient id="richGold" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#c08010" stopOpacity="0.45"/>
            <stop offset="100%" stopColor="#0e0800" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="220" fill="url(#richGold)"/>
        {/* Table surface */}
        <rect x="30" y="120" width="340" height="8" fill="#1a1008" rx="2" opacity="0.95"/>
        <rect x="30" y="128" width="340" height="92" fill="#100a00" opacity="0.95"/>
        {/* Bills scattered — rectangles at angles */}
        {[
          [80,95,-15],[110,88,8],[145,92,-5],[170,85,12],[95,108,20],[130,105,-8],
          [220,90,10],[255,88,-12],[285,95,6],[240,108,-18],[270,106,14]
        ].map(([x,y,rot],i)=>(
          <g key={i} transform={`translate(${x},${y}) rotate(${rot})`}>
            <rect x="-18" y="-9" width="36" height="18" fill={i%3===0?"#1a2808":i%3===1?"#1c2a0a":"#182606"} rx="1" opacity="0.85"/>
            <text x="0" y="4" textAnchor="middle" fill="#4a7020" fontSize="7" fontFamily="monospace" opacity="0.6">$100</text>
          </g>
        ))}
        {/* Phone showing balance */}
        <g transform="translate(200,105)">
          <rect x="-20" y="-35" width="40" height="70" fill="#0c0c10" rx="4" opacity="0.95"/>
          <rect x="-17" y="-32" width="34" height="64" fill="#080814" rx="3" opacity="0.9"/>
          <text x="0" y="-15" textAnchor="middle" fill="#4a8a30" fontSize="7" fontFamily="monospace" opacity="0.7">BALANCE</text>
          <text x="0" y="0" textAnchor="middle" fill="#D4A017" fontSize="9" fontFamily="monospace" opacity="0.85">$138,420</text>
        </g>
        {/* Credit cards fanned */}
        {[[-20,-10],[-8,-5],[4,0],[16,5]].map(([dx,dy],i)=>(
          <g key={i} transform={`translate(${85+dx*3},${115+dy}) rotate(${-15+i*8})`}>
            <rect x="-22" y="-13" width="44" height="26" fill={['#1a1a2a','#2a1a0a','#0a2a1a','#1a0a2a'][i]} rx="2" opacity="0.85"/>
          </g>
        ))}
        {/* Figure — standing back, triumphant */}
        <g transform="translate(335,118)">
          <circle cx="0" cy="-28" r="7" fill="#180c00"/>
          <rect x="-5" y="-21" width="10" height="18" fill="#180c00" rx="1"/>
          <line x1="-5" y1="-12" x2="-15" y2="-20" stroke="#180c00" strokeWidth="4" strokeLinecap="round"/>
          <line x1="5" y1="-12" x2="12" y2="-18" stroke="#180c00" strokeWidth="4" strokeLinecap="round"/>
          <line x1="-2" y1="-3" x2="-4" y2="12" stroke="#180c00" strokeWidth="4" strokeLinecap="round"/>
          <line x1="2" y1="-3" x2="4" y2="12" stroke="#180c00" strokeWidth="4" strokeLinecap="round"/>
        </g>
        {/* Gold shimmer */}
        <ellipse cx="200" cy="110" rx="140" ry="30" fill="#D4A017" opacity="0.04"/>
      </svg>
    ),
  },

  coldStreet: {
    label: 'Outside',
    bg: 'linear-gradient(180deg, #040608 0%, #060810 60%, #040608 100%)',
    description: 'Sitting on a street corner at night, alone, under a streetlamp',
    elements: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="si-svg">
        <defs>
          <radialGradient id="streetDark" cx="40%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#D4A017" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="#040608" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="lampCone" cx="37%" cy="22%" r="40%">
            <stop offset="0%" stopColor="#D4A017" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="#040608" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="220" fill="url(#streetDark)"/>
        <rect width="400" height="220" fill="url(#lampCone)"/>
        {/* Sidewalk */}
        <rect x="0" y="175" width="400" height="45" fill="#060608" opacity="0.95"/>
        {/* Wall */}
        <rect x="0" y="0" width="80" height="220" fill="#050508" opacity="0.85"/>
        <rect x="0" y="0" width="82" height="220" fill="#060608" opacity="0.4"/>
        {/* Streetlamp */}
        <line x1="150" y1="0" x2="150" y2="180" stroke="#0e0e10" strokeWidth="4"/>
        <line x1="150" y1="5" x2="178" y2="5" stroke="#0e0e10" strokeWidth="3"/>
        <ellipse cx="178" cy="8" rx="10" ry="6" fill="#D4A017" opacity="0.7"/>
        <ellipse cx="178" cy="8" rx="14" ry="10" fill="#D4A017" opacity="0.2"/>
        {/* Street light cone */}
        <polygon points="168,14 188,14 230,175 126,175" fill="#D4A017" opacity="0.04"/>
        {/* Figure sitting against wall/curb */}
        <g transform="translate(62,172)">
          {/* Head down */}
          <circle cx="0" cy="-42" r="8" fill="#0a0808"/>
          <rect x="-6" y="-34" width="12" height="20" fill="#0a0808" rx="2"/>
          {/* Arms on knees, hunched */}
          <line x1="-6" y1="-22" x2="-18" y2="-10" stroke="#0a0808" strokeWidth="5" strokeLinecap="round"/>
          <line x1="6" y1="-22" x2="16" y2="-10" stroke="#0a0808" strokeWidth="5" strokeLinecap="round"/>
          {/* Knees up */}
          <line x1="-3" y1="-14" x2="-10" y2="2" stroke="#0a0808" strokeWidth="5" strokeLinecap="round"/>
          <line x1="3" y1="-14" x2="10" y2="2" stroke="#0a0808" strokeWidth="5" strokeLinecap="round"/>
        </g>
        {/* Distant pedestrians — indifferent, walking by */}
        <g transform="translate(260,162)" opacity="0.4">
          <circle cx="0" cy="-20" r="5" fill="#080808"/>
          <rect x="-3" y="-15" width="6" height="15" fill="#080808" rx="1"/>
        </g>
        <g transform="translate(300,158)" opacity="0.3">
          <circle cx="0" cy="-18" r="4" fill="#080808"/>
          <rect x="-3" y="-14" width="6" height="14" fill="#080808" rx="1"/>
        </g>
        {/* Cup / bag near figure */}
        <rect x="42" y="164" width="10" height="12" fill="#0c0a08" rx="1" opacity="0.8"/>
        {/* Cold sky stars — very faint */}
        {[200,230,270,320,350,370,380,290,310].map((x,i)=>(
          <circle key={i} cx={x} cy={15+i*8%40} r="1" fill="#6a8aaa" opacity="0.15"/>
        ))}
      </svg>
    ),
  },

  roadsideHelp: {
    label: 'Helping Hand',
    bg: 'linear-gradient(180deg, #060810 0%, #0a1020 50%, #060810 100%)',
    description: 'One figure kneeling beside another on the ground, night setting',
    elements: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="si-svg">
        <defs>
          <radialGradient id="helpLight" cx="50%" cy="55%" r="35%">
            <stop offset="0%" stopColor="#4a6888" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#060810" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="220" fill="url(#helpLight)"/>
        <rect x="0" y="175" width="400" height="45" fill="#060608" opacity="0.95"/>
        {/* Ground figure */}
        <g transform="translate(185,172)">
          <circle cx="0" cy="-8" r="7" fill="#0a0808" opacity="0.9"/>
          <rect x="-18" y="-5" width="36" height="10" fill="#0a0808" rx="2" opacity="0.9"/>
          <line x1="-18" y1="0" x2="-30" y2="2" stroke="#0a0808" strokeWidth="4" strokeLinecap="round"/>
          <line x1="18" y1="0" x2="28" y2="4" stroke="#0a0808" strokeWidth="4" strokeLinecap="round"/>
        </g>
        {/* Kneeling helper */}
        <g transform="translate(220,162)">
          <circle cx="0" cy="-30" r="7" fill="#0c0a08"/>
          <rect x="-5" y="-23" width="10" height="16" fill="#0c0a08" rx="1"/>
          <line x1="-5" y1="-14" x2="-16" y2="-4" stroke="#0c0a08" strokeWidth="4" strokeLinecap="round"/>
          <line x1="5" y1="-14" x2="8" y2="-4" stroke="#0c0a08" strokeWidth="4" strokeLinecap="round"/>
          <line x1="-2" y1="-7" x2="-5" y2="8" stroke="#0c0a08" strokeWidth="4" strokeLinecap="round"/>
          <line x1="2" y1="-7" x2="8" y2="8" stroke="#0c0a08" strokeWidth="4" strokeLinecap="round"/>
        </g>
        <ellipse cx="200" cy="172" rx="60" ry="8" fill="#4a6888" opacity="0.06"/>
      </svg>
    ),
  },

  officePower: {
    label: 'The Office',
    bg: 'linear-gradient(180deg, #04060c 0%, #080a18 60%, #040610 100%)',
    description: 'Sleek office at night, figure behind a desk with city lights behind',
    elements: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="si-svg">
        <defs>
          <radialGradient id="officeGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#2a4080" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#04060c" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="220" fill="url(#officeGlow)"/>
        <rect x="0" y="185" width="400" height="35" fill="#04060a" opacity="0.95"/>
        <rect x="60" y="10" width="280" height="160" fill="#050a1a" rx="1" opacity="0.9"/>
        {[80,104,130,156,182,208,234,260,286,312].map((x,col) =>
          [25,45,65,85,105,125,145].map((y,row) => (
            <rect key={`${col}-${row}`} x={x} y={y} width="12" height="8"
              fill={col%3===0&&row%2===0 ? '#4a7aaa' : col%4===1 ? '#D4A017' : '#1a2a4a'}
              opacity={0.15 + (col%3)*0.05 + (row%2)*0.08}/>
          ))
        )}
        <rect x="80" y="175" width="240" height="12" fill="#0c0e18" rx="2" opacity="0.9"/>
        <g transform="translate(290,170)">
          <circle cx="0" cy="-30" r="7" fill="#0c0e1c"/>
          <rect x="-5" y="-23" width="10" height="18" fill="#0c0e1c" rx="1"/>
          <line x1="-5" y1="-14" x2="-12" y2="-6" stroke="#0c0e1c" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="5" y1="-14" x2="12" y2="-6" stroke="#0c0e1c" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="-2" y1="-5" x2="-3" y2="10" stroke="#0c0e1c" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="2" y1="-5" x2="3" y2="10" stroke="#0c0e1c" strokeWidth="3.5" strokeLinecap="round"/>
        </g>
      </svg>
    ),
  },

  waterMeeting: {
    label: 'The Meeting',
    bg: 'linear-gradient(180deg, #08101a 0%, #10182a 60%, #080c14 100%)',
    description: 'Two figures at a park bench or water fountain, afternoon light',
    elements: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="si-svg">
        <defs>
          <radialGradient id="parkLight" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor="#3a5878" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#08101a" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="220" fill="url(#parkLight)"/>
        <rect x="0" y="180" width="400" height="40" fill="#060808" opacity="0.9"/>
        <rect x="120" y="158" width="160" height="8" fill="#141c10" rx="2" opacity="0.85"/>
        <line x1="130" y1="166" x2="130" y2="185" stroke="#141c10" strokeWidth="4"/>
        <line x1="270" y1="166" x2="270" y2="185" stroke="#141c10" strokeWidth="4"/>
        {/* Figure 1 */}
        <g transform="translate(165,156)">
          <circle cx="0" cy="-28" r="7" fill="#0c100a"/>
          <rect x="-5" y="-21" width="10" height="15" fill="#0c100a" rx="1"/>
          <line x1="-5" y1="-12" x2="-12" y2="-6" stroke="#0c100a" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="5" y1="-12" x2="10" y2="-6" stroke="#0c100a" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="-2" y1="-6" x2="-4" y2="8" stroke="#0c100a" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="2" y1="-6" x2="4" y2="8" stroke="#0c100a" strokeWidth="3.5" strokeLinecap="round"/>
        </g>
        {/* Figure 2 */}
        <g transform="translate(235,156)">
          <circle cx="0" cy="-28" r="7" fill="#0e0c0a"/>
          <rect x="-5" y="-21" width="10" height="15" fill="#0e0c0a" rx="1"/>
          <line x1="-5" y1="-12" x2="-10" y2="-6" stroke="#0e0c0a" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="5" y1="-12" x2="12" y2="-6" stroke="#0e0c0a" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="-2" y1="-6" x2="-4" y2="8" stroke="#0e0c0a" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="2" y1="-6" x2="4" y2="8" stroke="#0e0c0a" strokeWidth="3.5" strokeLinecap="round"/>
        </g>
        <rect x="50" y="110" width="10" height="70" fill="#0a0e08" opacity="0.7"/>
        <ellipse cx="55" cy="105" rx="20" ry="15" fill="#0a0e08" opacity="0.65"/>
        <rect x="340" y="120" width="8" height="60" fill="#0a0e08" opacity="0.7"/>
        <ellipse cx="344" cy="115" rx="16" ry="12" fill="#0a0e08" opacity="0.65"/>
      </svg>
    ),
  },

  walkingAway: {
    label: 'Walking Away',
    bg: 'linear-gradient(180deg, #080c14 0%, #10182a 60%, #040810 100%)',
    description: 'Solitary figure walking away from warm light into darkness, head bowed',
    elements: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="si-svg">
        <defs>
          <radialGradient id="doorLight" cx="20%" cy="55%" r="30%">
            <stop offset="0%" stopColor="#D4A017" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#080c14" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="220" fill="url(#doorLight)"/>
        <rect x="0" y="180" width="400" height="40" fill="#060608" opacity="0.95"/>
        {/* Door behind — warm light spilling out */}
        <rect x="30" y="80" width="55" height="100" fill="#2a1808" rx="2" opacity="0.9"/>
        <rect x="33" y="83" width="49" height="94" fill="#6a3a12" rx="1" opacity="0.4"/>
        {/* Walking figure — smaller, moving right/away */}
        <g transform="translate(250,170)">
          <circle cx="0" cy="-30" r="7" fill="#0e0808" opacity="0.9"/>
          <rect x="-5" y="-23" width="10" height="16" fill="#0e0808" rx="1" opacity="0.9"/>
          {/* Walking pose */}
          <line x1="-5" y1="-14" x2="-12" y2="-6" stroke="#0e0808" strokeWidth="4" strokeLinecap="round" opacity="0.9"/>
          <line x1="5" y1="-14" x2="8" y2="-6" stroke="#0e0808" strokeWidth="4" strokeLinecap="round" opacity="0.9"/>
          <line x1="-2" y1="-7" x2="-6" y2="10" stroke="#0e0808" strokeWidth="4" strokeLinecap="round" opacity="0.9"/>
          <line x1="2" y1="-7" x2="8" y2="10" stroke="#0e0808" strokeWidth="4" strokeLinecap="round" opacity="0.9"/>
        </g>
      </svg>
    ),
  },

  crowdWatching: {
    label: 'The Crowd',
    bg: 'linear-gradient(180deg, #080810 0%, #101020 60%, #060608 100%)',
    description: 'Dense crowd from behind, heads and shoulders, a passage through the middle',
    elements: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="si-svg">
        <defs>
          <radialGradient id="crowdLight" cx="50%" cy="40%" r="40%">
            <stop offset="0%" stopColor="#3a3a6a" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#080810" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="220" fill="url(#crowdLight)"/>
        <rect x="0" y="175" width="400" height="45" fill="#060608" opacity="0.95"/>
        {[40,72,105,140,175,230,265,300,335,365].map((x,i) => (
          <g key={i} transform={`translate(${x},${160 + i%3*5})`} opacity={0.7 + i%3*0.1}>
            <circle cx="0" cy="-24" r={6+i%3} fill="#0a0810" opacity="0.9"/>
            <rect x="-5" y="-18" width="10" height={16+i%2*3} fill="#0a0810" rx="1" opacity="0.9"/>
          </g>
        ))}
        {/* Gap in crowd for figure to move through */}
        <g transform="translate(200,158)">
          <circle cx="0" cy="-20" r="5" fill="#1a1028"/>
          <rect x="-3" y="-15" width="6" height="15" fill="#1a1028" rx="1"/>
        </g>
      </svg>
    ),
  },

  courthouse: {
    label: 'The Courthouse',
    bg: 'linear-gradient(180deg, #060808 0%, #0c1010 60%, #060808 100%)',
    description: 'Stone steps of a courthouse at dawn, lone figure ascending',
    elements: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="si-svg">
        <defs>
          <radialGradient id="courtGlow" cx="50%" cy="30%" r="40%">
            <stop offset="0%" stopColor="#3a5878" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="#060808" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="220" fill="url(#courtGlow)"/>
        {/* Building columns */}
        {[80,120,160,200,240,280,320].map((x,i) => (
          <rect key={i} x={x} y={20} width={16} height={130} fill="#0c0e10" rx="1" opacity="0.85"/>
        ))}
        {/* Pediment */}
        <polygon points="60,20 340,20 200,0" fill="#0c0e10" opacity="0.85"/>
        {/* Steps */}
        {[0,1,2,3,4].map(i => (
          <rect key={i} x={40+i*15} y={150+i*12} width={320-i*30} height={12} fill="#0a0c0e" rx="1" opacity="0.9}"/>
        ))}
        {/* Figure on steps */}
        <g transform="translate(195,155)">
          <circle cx="0" cy="-28" r="6" fill="#0a0a10"/>
          <rect x="-4" y="-22" width="8" height="15" fill="#0a0a10" rx="1"/>
          <line x1="-4" y1="-12" x2="-10" y2="-5" stroke="#0a0a10" strokeWidth="3" strokeLinecap="round"/>
          <line x1="4" y1="-12" x2="10" y2="-5" stroke="#0a0a10" strokeWidth="3" strokeLinecap="round"/>
          <line x1="-2" y1="-7" x2="-4" y2="8" stroke="#0a0a10" strokeWidth="3" strokeLinecap="round"/>
          <line x1="2" y1="-7" x2="4" y2="8" stroke="#0a0a10" strokeWidth="3" strokeLinecap="round"/>
        </g>
        <ellipse cx="200" cy="30" rx="80" ry="8" fill="#3a5878" opacity="0.06"/>
      </svg>
    ),
  },

  abundance: {
    label: 'The Harvest',
    bg: 'linear-gradient(180deg, #081008 0%, #122010 60%, #081008 100%)',
    description: 'Open field, golden dawn, figure with arms wide, crops behind',
    elements: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="si-svg">
        <defs>
          <radialGradient id="fieldGlow" cx="50%" cy="80%" r="60%">
            <stop offset="0%" stopColor="#7a9a2a" stopOpacity="0.35"/>
            <stop offset="40%" stopColor="#4a6a18" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="#081008" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="sunRise" cx="50%" cy="50%" r="30%">
            <stop offset="0%" stopColor="#c07a10" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#081008" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="220" fill="url(#sunRise)"/>
        <rect width="400" height="220" fill="url(#fieldGlow)"/>
        {/* Horizon field */}
        <rect x="0" y="145" width="400" height="75" fill="#0a140a" opacity="0.8"/>
        {/* Crop stalks */}
        {[20,45,70,95,120,145,170,195,220,245,270,295,320,345,370].map((x,i) => (
          <g key={i}>
            <line x1={x} y1={145} x2={x+i%3-1} y2={105+i%4*5} stroke="#2a4010" strokeWidth="2" opacity="0.7"/>
            <ellipse cx={x+i%3-1} cy={100+i%4*5} rx="5" ry="8" fill="#3a5a10" opacity="0.6"/>
          </g>
        ))}
        {/* Figure with arms spread wide */}
        <g transform="translate(200,142)">
          <circle cx="0" cy="-32" r="8" fill="#1a2a08"/>
          <rect x="-6" y="-24" width="12" height="20" fill="#1a2a08" rx="2"/>
          {/* Arms wide */}
          <line x1="-6" y1="-16" x2="-28" y2="-10" stroke="#1a2a08" strokeWidth="5" strokeLinecap="round"/>
          <line x1="6" y1="-16" x2="28" y2="-10" stroke="#1a2a08" strokeWidth="5" strokeLinecap="round"/>
          <line x1="-3" y1="-4" x2="-6" y2="14" stroke="#1a2a08" strokeWidth="5" strokeLinecap="round"/>
          <line x1="3" y1="-4" x2="6" y2="14" stroke="#1a2a08" strokeWidth="5" strokeLinecap="round"/>
        </g>
        <ellipse cx="200" cy="120" rx="60" ry="15" fill="#c07a10" opacity="0.08"/>
      </svg>
    ),
  },

  homeGate: {
    label: 'The Gate',
    bg: 'linear-gradient(180deg, #080808 0%, #141010 60%, #080808 100%)',
    description: 'Upscale house exterior at night, warm windows, figure at the gate outside',
    elements: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="si-svg">
        <defs>
          <radialGradient id="homeWarm" cx="60%" cy="40%" r="40%">
            <stop offset="0%" stopColor="#c07020" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#080808" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="220" fill="url(#homeWarm)"/>
        <rect x="0" y="180" width="400" height="40" fill="#060606" opacity="0.95"/>
        {/* House */}
        <rect x="160" y="60" width="200" height="130" fill="#0c0a08" rx="2" opacity="0.9"/>
        <polygon points="148,62 372,62 260,30" fill="#0c0a08" opacity="0.9"/>
        {/* Warm windows */}
        {[[180,80],[250,80],[310,80],[195,125],[280,125]].map(([x,y],i) => (
          <rect key={i} x={x} y={y} width="28" height="22" fill="#c07020" rx="1" opacity={0.3+i%2*0.15}/>
        ))}
        {/* Gate in front */}
        <line x1="155" y1="165" x2="155" y2="195" stroke="#1a1a1a" strokeWidth="3" opacity="0.8"/>
        <line x1="100" y1="165" x2="155" y2="165" stroke="#1a1a1a" strokeWidth="2" opacity="0.7"/>
        {/* Figure outside the gate */}
        <g transform="translate(75,180)" opacity="0.8">
          <circle cx="0" cy="-30" r="6" fill="#0a0808"/>
          <rect x="-4" y="-24" width="8" height="16" fill="#0a0808" rx="1"/>
          <line x1="-4" y1="-14" x2="-10" y2="-8" stroke="#0a0808" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="4" y1="-14" x2="10" y2="-8" stroke="#0a0808" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="-2" y1="-8" x2="-4" y2="8" stroke="#0a0808" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="2" y1="-8" x2="4" y2="8" stroke="#0a0808" strokeWidth="3.5" strokeLinecap="round"/>
        </g>
      </svg>
    ),
  },

};

// Map scene types to illustration keys
const SCENE_MAP = {
  departure:     'departure',
  cityNight:     'cityNight',
  cityMorning:   'cityNight',
  party:         'party',
  apartment:     'apartment',
  moneyRunning:  'moneyRunning',
  loneliness:    'loneliness',
  streetWork:    'streetWork',
  pigsty:        'pigstyMoment',
  pigstyMoment:  'pigstyMoment',
  longRoad:      'longRoad',
  fatherRunning: 'fatherRunning',
  embrace:       'embrace',
  feast:         'feast',
  penthouse:     'penthouse',
  bottleService: 'bottleService',
  drinkingAlone: 'drinkingAlone',
  morningAfter:  'morningAfter',
  wealthDisplay: 'wealthDisplay',
  coldStreet:    'coldStreet',
  // New scene types for all stories
  roadsideHelp:  'roadsideHelp',
  officePower:   'officePower',
  waterMeeting:  'waterMeeting',
  walkingAway:   'walkingAway',
  crowdWatching: 'crowdWatching',
  courthouse:    'courthouse',
  abundance:     'abundance',
  homeGate:      'homeGate',
  // Phase fallbacks
  prologue:      'departure',
  city:          'party',
  farCountry:    'drinkingAlone',
  famine:        'coldStreet',
  turning:       'pigstyMoment',
  returning:     'longRoad',
  restored:      'feast',
  // Other story phase fallbacks
  drive:         'coldStreet',
  involvement:   'roadsideHelp',
  sacrifice:     'longRoad',
  collection:    'officePower',
  encounter:     'waterMeeting',
  transformation:'feast',
  routine:       'apartment',
  revelation:    'waterMeeting',
  telling:       'longRoad',
  achievement:   'officePower',
  question:      'apartment',
  invitation:    'longRoad',
  reckoning:     'apartment',
  invisible:     'coldStreet',
  hearing:       'crowdWatching',
  calling:       'crowdWatching',
  sight:         'longRoad',
  receiving:     'apartment',
  deciding:      'officePower',
  forgiven:      'longRoad',
  finding:       'loneliness',
  holding:       'apartment',
  consequence:   'officePower',
  comfort:       'penthouse',
  awareness:     'homeGate',
  choosing:      'homeGate',
  injustice:     'coldStreet',
  rejection:     'courthouse',
  persistence:   'courthouse',
  justice:       'courthouse',
  testing:       'apartment',
  growing:       'apartment',
  bearing:       'abundance',
};

export default function SceneIllustration({ sceneType, phase }) {
  const key = SCENE_MAP[sceneType] || SCENE_MAP[phase] || 'cityNight';
  const scene = SCENES[key] || SCENES.cityNight;

  return (
    <div className="si-root" style={{ background: scene.bg }}>
      {scene.elements}
      <div className="si-fade" />
    </div>
  );
}
