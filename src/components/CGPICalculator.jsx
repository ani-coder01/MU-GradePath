import React, { useState } from 'react';
import { calculateCGPI, cgpiToPercentage } from '../utils/calculator';

export default function CGPICalculator() {
  const [semSGPIs, setSemSGPIs] = useState(
    Array.from({ length: 8 }, () => ({ sgpi: '', credits: '' }))
  );

  const handleChange = (index, field, value) => {
    setSemSGPIs(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const validSemesters = semSGPIs
    .filter(s => s.sgpi !== '' && Number(s.sgpi) > 0)
    .map(s => ({
      sgpi: Number(s.sgpi),
      totalCredits: Number(s.credits) || 20,
    }));

  const cgpi = calculateCGPI(validSemesters);
  const percentage = cgpiToPercentage(cgpi);

  return (
    <div className="card" id="cgpi-calculator">
      <div className="card-title">
        <span className="icon">🧮</span>
        CGPI Calculator
      </div>
      <div style={{ 
        fontSize: '0.8rem', 
        color: '#AAAAAA', 
        marginBottom: '16px' 
      }}>
        Enter your SGPI for each completed semester to calculate CGPI
      </div>
      
      <div className="cgpi-grid">
        {semSGPIs.map((sem, i) => (
          <div className="cgpi-sem-input" key={i}>
            <label>Sem {i + 1}</label>
            <input
              type="number"
              placeholder="SGPI"
              value={sem.sgpi}
              onChange={(e) => handleChange(i, 'sgpi', e.target.value)}
              min="0"
              max="10"
              step="0.01"
              id={`cgpi-sem-${i}`}
            />
          </div>
        ))}
      </div>

      {cgpi > 0 && (
        <div className="cgpi-result">
          <div className="cgpi-result-box">
            <div className="result-label">CGPI</div>
            <div className="result-value">{cgpi.toFixed(2)}</div>
          </div>
          <div className="cgpi-result-box">
            <div className="result-label">Percentage</div>
            <div className="result-value">{percentage}%</div>
          </div>
        </div>
      )}

      {cgpi > 0 && (
        <div style={{ 
          marginTop: '12px', 
          padding: '10px', 
          border: '1px solid #333',
          fontSize: '0.7rem',
          color: '#666',
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          <span style={{ color: '#BF5AF2' }}>ℹ</span> Formula: 
          {cgpi < 7 
            ? ` % = 7.1 × ${cgpi.toFixed(2)} + 12 = ${percentage}%`
            : ` % = 7.4 × ${cgpi.toFixed(2)} + 12 = ${percentage}%`
          }
        </div>
      )}
    </div>
  );
}
