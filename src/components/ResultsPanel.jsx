import React from 'react';
import { cgpiToPercentage } from '../utils/calculator';

const GRADE_COLORS = {
  'O': '#39FF14', 'A+': '#00F0FF', 'A': '#00C4CC', 'B+': '#FFE600',
  'B': '#FF9500', 'C': '#FF6B35', 'P': '#FF2D78', 'F': '#FF0000',
};

export default function ResultsPanel({ sgpiResult }) {
  if (!sgpiResult || !sgpiResult.rowResults || sgpiResult.rowResults.length === 0) {
    return null;
  }

  const { sgpi, totalCredits, earnedCredits, rowResults } = sgpiResult;
  const percentage = cgpiToPercentage(sgpi);

  // Count grades
  const gradeCounts = {};
  rowResults.forEach(s => {
    gradeCounts[s.grade] = (gradeCounts[s.grade] || 0) + 1;
  });

  const failCount = gradeCounts['F'] || 0;
  const passCount = rowResults.length - failCount;

  // Separate theory and lab credit sums
  const theoryCr = rowResults.filter(r => r.rowType === 'theory').reduce((s, r) => s + r.credits, 0);
  const labCr = rowResults.filter(r => r.rowType === 'lab').reduce((s, r) => s + r.credits, 0);

  return (
    <div className="card" id="results-panel">
      <div className="card-title">
        <span className="icon">🏆</span>
        Results Summary
      </div>

      <div className="results-grid">
        <div className="result-box">
          <div className="result-label">SGPI</div>
          <div className="result-value" style={{
            color: sgpi >= 8 ? '#39FF14' : sgpi >= 6 ? '#FFE600' : '#FF2D78'
          }}>
            {sgpi.toFixed(2)}
          </div>
        </div>
        <div className="result-box">
          <div className="result-label">Percentage</div>
          <div className="result-value" style={{ color: '#00F0FF' }}>
            {percentage > 0 ? `${percentage}%` : '—'}
          </div>
        </div>
        <div className="result-box">
          <div className="result-label">Credits Earned</div>
          <div className="result-value" style={{
            color: earnedCredits === totalCredits ? '#39FF14' : '#FF9500'
          }}>
            {earnedCredits}/{totalCredits}
          </div>
        </div>
        <div className="result-box">
          <div className="result-label">Theory / Lab Cr</div>
          <div className="result-value" style={{ fontSize: '1.1rem' }}>
            <span style={{ color: '#00F0FF' }}>{theoryCr}</span>
            <span style={{ color: '#666', margin: '0 4px' }}>+</span>
            <span style={{ color: '#BF5AF2' }}>{labCr}</span>
          </div>
        </div>
      </div>

      {/* Grade Distribution */}
      <div style={{ marginTop: '16px' }}>
        <div style={{
          fontSize: '0.7rem', color: '#666', textTransform: 'uppercase',
          letterSpacing: '0.06em', fontFamily: "'JetBrains Mono', monospace", marginBottom: '8px',
        }}>
          Grade Distribution
        </div>
        <div className="grade-dist">
          {Object.entries(gradeCounts).map(([grade, count]) => (
            <div className="grade-chip" key={grade}
              style={{ borderColor: GRADE_COLORS[grade] || '#333' }}>
              <span className="grade-letter" style={{ color: GRADE_COLORS[grade] }}>{grade}</span>
              <span className="grade-count">×{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Formula */}
      <div style={{
        marginTop: '16px', padding: '10px', border: '1px solid #333',
        fontSize: '0.7rem', color: '#666', fontFamily: "'JetBrains Mono', monospace",
      }}>
        <span style={{ color: '#FFE600' }}>ℹ</span> SGPI = Σ(Theory_GP × Theory_Cr) + Σ(Lab_GP × Lab_Cr)) / {totalCredits} Total Credits
        <br />
        <span style={{ color: '#FFE600' }}>ℹ</span> MU %: 
        {sgpi < 7
          ? ` 7.1 × ${sgpi.toFixed(2)} + 12 = ${percentage}%`
          : ` 7.4 × ${sgpi.toFixed(2)} + 12 = ${percentage}%`
        }
      </div>
    </div>
  );
}
