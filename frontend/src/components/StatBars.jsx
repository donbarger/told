import React, { useRef, useEffect, useState } from 'react';

function StatBar({ label, value, color, icon }) {
  const prevRef = useRef(value);
  const [delta, setDelta] = useState(0);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const diff = value - prevRef.current;
    if (diff !== 0) {
      setDelta(diff);
      setFlash(true);
      const t = setTimeout(() => { setFlash(false); setDelta(0); }, 1600);
      prevRef.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);

  const danger = value <= 15;

  return (
    <div className={`stat-bar ${danger ? 'stat-danger' : ''}`}>
      <div className="stat-header">
        <span className="stat-icon">{icon}</span>
        <span className="stat-label">{label}</span>
        {flash && (
          <span className={`stat-delta ${delta > 0 ? 'delta-up' : 'delta-down'}`}>
            {delta > 0 ? `+${delta}` : delta}
          </span>
        )}
        <span className="stat-value">{value}</span>
      </div>
      <div className="stat-track">
        <div
          className="stat-fill"
          style={{
            width: `${value}%`,
            background: danger
              ? 'linear-gradient(90deg, #8B0000, #cc2200)'
              : color,
            transition: 'width 0.6s ease',
          }}
        />
      </div>
    </div>
  );
}

export default function StatBars({ stats, statConfig }) {
  if (!statConfig) return null;
  return (
    <div className="stat-bars">
      <StatBar label={statConfig.stat1.name} value={stats.stat1} color={statConfig.stat1.color} icon={statConfig.stat1.icon} />
      <StatBar label={statConfig.stat2.name} value={stats.stat2} color={statConfig.stat2.color} icon={statConfig.stat2.icon} />
      <StatBar label={statConfig.stat3.name} value={stats.stat3} color={statConfig.stat3.color} icon={statConfig.stat3.icon} />
    </div>
  );
}
