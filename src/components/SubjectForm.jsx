import React from 'react';
import { totalMarksToGrade, calculateTheoryPercent, calculateLabPercent } from '../utils/calculator';

const GRADE_COLORS = {
  'O': '#39FF14',
  'A+': '#00F0FF',
  'A': '#00C4CC',
  'B+': '#FFE600',
  'B': '#FF9500',
  'C': '#FF6B35',
  'P': '#FF2D78',
  'F': '#FF0000',
};

export default function SubjectForm({ subjectRows, marks, onMarksChange }) {
  const getGrade = (rowKey) => {
    const m = marks[rowKey] || {};
    const row = subjectRows.find(r => getRowKey(r) === rowKey);
    if (!row) return null;

    let percent = 0;
    if (row.rowType === 'theory') {
      const ia = Number(m.ia) || 0;
      const endSem = Number(m.endSem) || 0;
      if (ia === 0 && endSem === 0) return null;
      percent = calculateTheoryPercent(ia, endSem, { maxIA: row.maxIA, maxEndSem: row.maxEndSem });
    } else {
      const tw = Number(m.tw) || 0;
      const oral = Number(m.oral) || 0;
      if (tw === 0 && oral === 0) return null;
      percent = calculateLabPercent(tw, oral, { maxTW: row.maxTW, maxOral: row.maxOral });
    }

    return totalMarksToGrade(percent);
  };

  const handleChange = (rowKey, field, value, max) => {
    let numVal = value === '' ? '' : Number(value);
    if (numVal !== '' && numVal > max) numVal = max;
    if (numVal !== '' && numVal < 0) numVal = 0;
    onMarksChange(rowKey, field, numVal);
  };

  return (
    <div className="card" id="subject-form">
      <div className="card-title">
        <span className="icon">📝</span>
        Enter Marks
      </div>
      <div className="subject-table">
        {subjectRows.map((row, i) => {
          const rowKey = getRowKey(row);
          const grade = getGrade(rowKey);
          const m = marks[rowKey] || {};
          const isTheory = row.rowType === 'theory';
          const isLabRow = row.rowType === 'lab';

          return (
            <div
              className={`subject-card ${isLabRow ? 'lab-row' : ''}`}
              key={rowKey}
              id={`subject-row-${rowKey}`}
            >
              {/* Subject header */}
              <div className="subject-card-header">
                <div className="subject-name">
                  <span>{row.label}</span>
                  <span className={`credits-badge ${isLabRow ? 'lab-badge' : ''}`}>
                    {row.credits}C {isLabRow ? '⚗' : '📖'}
                  </span>
                </div>
                {grade && (
                  <div
                    className="grade-cell-inline"
                    style={{ color: GRADE_COLORS[grade.grade] || '#333' }}
                  >
                    {grade.grade}
                  </div>
                )}
              </div>

              {/* Input fields */}
              <div className="subject-card-inputs">
                {isTheory ? (
                  <>
                    <div className="input-group">
                      <span className="input-label">IA /{row.maxIA}</span>
                      <input
                        type="number"
                        className="mark-input"
                        placeholder={`/${row.maxIA}`}
                        value={m.ia ?? ''}
                        onChange={(e) => handleChange(rowKey, 'ia', e.target.value, row.maxIA)}
                        min="0"
                        max={row.maxIA}
                        id={`ia-${rowKey}`}
                      />
                    </div>
                    <div className="input-group">
                      <span className="input-label">End-Sem /{row.maxEndSem}</span>
                      <input
                        type="number"
                        className="mark-input"
                        placeholder={`/${row.maxEndSem}`}
                        value={m.endSem ?? ''}
                        onChange={(e) => handleChange(rowKey, 'endSem', e.target.value, row.maxEndSem)}
                        min="0"
                        max={row.maxEndSem}
                        id={`endsem-${rowKey}`}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="input-group">
                      <span className="input-label">TW /{row.maxTW}</span>
                      <input
                        type="number"
                        className="mark-input"
                        placeholder={`/${row.maxTW}`}
                        value={m.tw ?? ''}
                        onChange={(e) => handleChange(rowKey, 'tw', e.target.value, row.maxTW)}
                        min="0"
                        max={row.maxTW}
                        id={`tw-${rowKey}`}
                      />
                    </div>
                    <div className="input-group">
                      <span className="input-label">Oral /{row.maxOral}</span>
                      <input
                        type="number"
                        className="mark-input"
                        placeholder={`/${row.maxOral}`}
                        value={m.oral ?? ''}
                        onChange={(e) => handleChange(rowKey, 'oral', e.target.value, row.maxOral)}
                        min="0"
                        max={row.maxOral}
                        id={`oral-${rowKey}`}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Generate a unique key for a row */
export function getRowKey(row) {
  return `${row.subjectIndex}-${row.rowType}`;
}
