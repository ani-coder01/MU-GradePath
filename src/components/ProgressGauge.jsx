import React from 'react';

function getGaugeColor(sgpi) {
  if (sgpi >= 9) return '#39FF14';
  if (sgpi >= 8) return '#00F0FF';
  if (sgpi >= 7) return '#FFE600';
  if (sgpi >= 6) return '#FF9500';
  if (sgpi >= 5) return '#FF6B35';
  if (sgpi >= 4) return '#FF2D78';
  return '#FF0000';
}

export default function ProgressGauge({ sgpi, targetSGPI, totalCredits, earnedCredits }) {
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(sgpi / 10, 1);
  const targetProgress = Math.min(targetSGPI / 10, 1);
  const offset = circumference * (1 - progress);
  const targetOffset = circumference * (1 - targetProgress);
  const color = getGaugeColor(sgpi);

  return (
    <div className="card" id="progress-gauge">
      <div className="card-title">
        <span className="icon">📊</span>
        SGPI Gauge
      </div>
      <div className="gauge-container">
        <div className="gauge-wrapper">
          <svg className="gauge-svg" viewBox="0 0 180 180">
            {/* Background track */}
            <circle
              className="gauge-bg"
              cx="90"
              cy="90"
              r={radius}
            />
            {/* Target marker (subtle) */}
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={targetOffset}
              opacity="0.15"
            />
            {/* Progress fill */}
            <circle
              className="gauge-fill"
              cx="90"
              cy="90"
              r={radius}
              stroke={color}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="gauge-value" style={{ color }}>
            {sgpi.toFixed(2)}
          </div>
          <div className="gauge-label-text">
            SGPI
          </div>
        </div>

        <div className="gauge-stats">
          <div className="gauge-stat">
            <span className="gauge-stat-label">Total Credits</span>
            <span className="gauge-stat-value" style={{ color: '#00F0FF' }}>
              {totalCredits}
            </span>
          </div>
          <div className="gauge-stat">
            <span className="gauge-stat-label">Earned Credits</span>
            <span className="gauge-stat-value" style={{ color: earnedCredits === totalCredits ? '#39FF14' : '#FF9500' }}>
              {earnedCredits}
            </span>
          </div>
          <div className="gauge-stat">
            <span className="gauge-stat-label">Target</span>
            <span className="gauge-stat-value" style={{ color: '#FF2D78' }}>
              {targetSGPI.toFixed(1)}
            </span>
          </div>
          <div className="gauge-stat">
            <span className="gauge-stat-label">Status</span>
            <span className={`status-badge ${sgpi >= targetSGPI ? 'pass' : sgpi > 0 ? 'fail' : ''}`}>
              {sgpi === 0 ? '—' : sgpi >= targetSGPI ? '✓ ON TRACK' : '✗ BELOW'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
