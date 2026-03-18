import React from 'react';
import { gradeToGradePoint, GRADE_OPTIONS_FOR_KT, GRADE_TABLE } from '../utils/calculator';
import { getRowKey } from './SubjectForm';

const GRADE_COLORS = {
  'O': '#39FF14', 'A+': '#00F0FF', 'A': '#00C4CC', 'B+': '#FFE600',
  'B': '#FF9500', 'C': '#FF6B35', 'P': '#FF2D78', 'F': '#FF0000',
};

export default function KTRecovery({ subjectRows, rowResults, ktData, onKTChange }) {
  // All rows are eligible for backlog mode (user toggles per row)
  // Show any row that has F grade OR has been toggled into backlog mode + all subjects
  const eligibleRows = subjectRows.map((row) => {
    const key = getRowKey(row);
    const result = rowResults?.find(r => getRowKey(r) === key);
    const kt = ktData[key] || { cleared: false, previousGrade: 'F', newGrade: '' };
    const hasFailed = result?.grade === 'F';
    return { ...row, key, result, kt, hasFailed };
  });

  return (
    <div className="card" id="kt-recovery">
      <div className="card-title">
        <span className="icon">🔄</span>
        KT / Revaluation Recovery — Backlog Mode
      </div>
      <div style={{ fontSize: '0.8rem', color: '#AAAAAA', marginBottom: '16px' }}>
        Toggle "Backlog Mode" on any subject/lab row. Set the previous grade (F) and the new grade after clearing to update your SGPI.
        Credits are only added once marked as passed.
      </div>

      {eligibleRows.length === 0 && (
        <div style={{
          color: '#666', fontSize: '0.85rem', fontFamily: "'JetBrains Mono', monospace",
          textAlign: 'center', padding: '20px 0',
        }}>
          No rows available. Enter marks in the Calculator tab first.
        </div>
      )}

      {eligibleRows.map((row) => {
        const currentGrade = row.result?.grade || '—';
        const currentGP = row.result?.gradePoint ?? 0;

        return (
          <div className="kt-card" key={row.key} id={`kt-row-${row.key}`}>
            {/* Row header */}
            <div className="kt-card-header">
              <div className="kt-subject-info">
                <div className="kt-subject-name">{row.label}</div>
                <div className="kt-meta">
                  <span className="credits-badge" style={{ fontSize: '0.6rem' }}>{row.credits}C</span>
                  <span className="kt-current-grade" style={{ color: GRADE_COLORS[currentGrade] || '#666' }}>
                    Current: {currentGrade} (GP: {currentGP})
                  </span>
                </div>
              </div>

              {/* Backlog toggle */}
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={row.kt.cleared}
                  onChange={(e) => onKTChange(row.key, 'cleared', e.target.checked)}
                  id={`kt-toggle-${row.key}`}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            {/* Backlog details when toggled ON */}
            {row.kt.cleared && (
              <div className="kt-override-section">
                <div className="kt-grade-selectors">
                  <div className="kt-grade-group">
                    <label className="kt-label">Previous Grade</label>
                    <select
                      className="kt-select fail-select"
                      value={row.kt.previousGrade || 'F'}
                      onChange={(e) => onKTChange(row.key, 'previousGrade', e.target.value)}
                      id={`kt-prev-${row.key}`}
                    >
                      <option value="F">F (Fail)</option>
                      {GRADE_OPTIONS_FOR_KT.map(g => (
                        <option key={g} value={g}>{g} (GP: {gradeToGradePoint(g)})</option>
                      ))}
                    </select>
                  </div>
                  <div className="kt-arrow">→</div>
                  <div className="kt-grade-group">
                    <label className="kt-label">New Grade</label>
                    <select
                      className="kt-select pass-select"
                      value={row.kt.newGrade || ''}
                      onChange={(e) => onKTChange(row.key, 'newGrade', e.target.value)}
                      id={`kt-new-${row.key}`}
                    >
                      <option value="">Select...</option>
                      {GRADE_OPTIONS_FOR_KT.map(g => (
                        <option key={g} value={g}>{g} (GP: {gradeToGradePoint(g)})</option>
                      ))}
                    </select>
                  </div>
                </div>

                {row.kt.newGrade && (
                  <div className="kt-result-preview">
                    <span style={{ color: GRADE_COLORS['F'] }}>
                      {row.kt.previousGrade || 'F'} → 
                    </span>
                    <span style={{ color: GRADE_COLORS[row.kt.newGrade] || '#39FF14', fontWeight: 700 }}>
                      {' '}{row.kt.newGrade}
                    </span>
                    <span style={{ color: '#666', marginLeft: '8px', fontSize: '0.75rem' }}>
                      (+{gradeToGradePoint(row.kt.newGrade)} GP × {row.credits}C = +{gradeToGradePoint(row.kt.newGrade) * row.credits} credit points)
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
