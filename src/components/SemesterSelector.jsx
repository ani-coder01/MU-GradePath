import React from 'react';
import { getAllSemesters } from '../utils/subjectData';

export default function SemesterSelector({ semester, onSemesterChange }) {
  const semesters = getAllSemesters();

  return (
    <div className="card" id="semester-selector">
      <div className="card-title">
        <span className="icon">📋</span>
        Select Semester
      </div>
      <div className="selector-row">
        <div className="selector-group">
          <label htmlFor="semester-select">Semester</label>
          <select
            id="semester-select"
            value={semester}
            onChange={(e) => onSemesterChange(Number(e.target.value))}
          >
            {semesters.map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
        </div>
        <div className="selector-group">
          <label htmlFor="scheme-select">Scheme</label>
          <select id="scheme-select" defaultValue="c-scheme">
            <option value="c-scheme">C-Scheme / REV-2019</option>
          </select>
        </div>
      </div>
    </div>
  );
}
