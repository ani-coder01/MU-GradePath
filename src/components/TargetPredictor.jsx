import React, { useState } from 'react';
import { calculateMinEndSem } from '../utils/calculator';
import { getRowKey } from './SubjectForm';

const GRADE_COLORS = {
  'O': '#39FF14', 'A+': '#00F0FF', 'A': '#00C4CC', 'B+': '#FFE600',
  'B': '#FF9500', 'C': '#FF6B35', 'P': '#FF2D78', 'F': '#FF0000',
};

export default function TargetPredictor({ subjectRows, marks }) {
  const [targetSGPI, setTargetSGPI] = useState(8.0);
  const [prediction, setPrediction] = useState(null);

  const handlePredict = () => {
    const rows = subjectRows.map(row => {
      const key = getRowKey(row);
      const m = marks[key] || {};

      if (row.rowType === 'theory') {
        const ia = Number(m.ia) || 0;
        return {
          name: row.name,
          label: row.label,
          rowType: row.rowType,
          credits: row.credits,
          lockedMarks: ia,
          remainingMax: row.maxEndSem,
          totalMax: row.maxIA + row.maxEndSem,
        };
      } else {
        const tw = Number(m.tw) || 0;
        return {
          name: row.name,
          label: row.label,
          rowType: row.rowType,
          credits: row.credits,
          lockedMarks: tw,
          remainingMax: row.maxOral,
          totalMax: row.maxTW + row.maxOral,
        };
      }
    });

    const result = calculateMinEndSem(targetSGPI, rows);
    setPrediction(result);
  };

  // Count how many have critical warnings
  const criticalCount = prediction?.results?.filter(r => r.critical).length || 0;

  return (
    <div className="card" id="target-predictor">
      <div className="card-title">
        <span className="icon">🎯</span>
        Target Pointer Predictor
      </div>

      <div className="target-section">
        <div className="target-input-group">
          <span className="target-label">I want SGPI ≥</span>
          <input
            type="number"
            className="target-input"
            value={targetSGPI}
            onChange={(e) => setTargetSGPI(Number(e.target.value))}
            min="4"
            max="10"
            step="0.1"
            id="target-sgpi-input"
          />
        </div>
        <button className="target-btn" onClick={handlePredict} id="predict-btn">
          ⚡ Calculate Min Marks
        </button>
      </div>

      {prediction && (
        <div style={{ marginTop: '20px' }}>
          {/* Critical Warning Banner */}
          {criticalCount > 0 && (
            <div className="critical-warning" id="critical-warning">
              <div className="critical-icon">🚨</div>
              <div>
                <strong>Critical Warning: Target Unreachable!</strong>
                <div style={{ fontSize: '0.75rem', marginTop: '4px', opacity: 0.9 }}>
                  {criticalCount} subject{criticalCount > 1 ? 's' : ''} require marks exceeding the
                  maximum possible. Your IA/TW marks are too low for this target.
                </div>
              </div>
            </div>
          )}

          {prediction.feasible ? (
            <>
              <div style={{
                fontSize: '0.8rem', color: '#AAAAAA', marginBottom: '12px',
                fontFamily: "'JetBrains Mono', monospace"
              }}>
                Minimum marks needed for SGPI ≥ {targetSGPI}
                <span style={{ color: '#39FF14', marginLeft: '8px' }}>
                  (Achievable: {prediction.achievedSGPI})
                </span>
              </div>
              <div className="min-marks-grid">
                {prediction.results.map((r, i) => (
                  <div className={`min-mark-card ${r.critical ? 'critical-card' : ''}`} key={i}>
                    <div className="sub-name">
                      {r.label}
                      <span style={{
                        fontSize: '0.55rem', marginLeft: '4px',
                        color: r.rowType === 'lab' ? '#BF5AF2' : '#666',
                      }}>
                        {r.rowType === 'lab' ? '⚗ LAB' : '📖 THY'}
                      </span>
                    </div>
                    <div className="min-mark-detail">
                      <div
                        className="min-val"
                        style={{
                          color: r.critical ? '#FF0000' : GRADE_COLORS[r.targetGrade],
                          borderColor: r.critical ? '#FF0000' : GRADE_COLORS[r.targetGrade],
                        }}
                      >
                        {r.minRemaining}
                        <span style={{ fontSize: '0.5em', opacity: 0.7 }}>
                          /{r.remainingMax}
                        </span>
                        <span style={{ fontSize: '0.6em', marginLeft: '4px', opacity: 0.7 }}>
                          ({r.targetGrade})
                        </span>
                      </div>
                      {r.critical && (
                        <span className="critical-tag">⚠ EXCEEDS MAX</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="not-feasible" id="not-feasible-msg">
              ⚠ Target SGPI of {targetSGPI} is NOT achievable with the current IA/TW marks.
              <br />
              <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                Maximum achievable: {prediction.achievedSGPI}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
