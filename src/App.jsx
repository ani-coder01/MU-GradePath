import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import SemesterSelector from './components/SemesterSelector';
import SubjectForm, { getRowKey } from './components/SubjectForm';
import TargetPredictor from './components/TargetPredictor';
import ProgressGauge from './components/ProgressGauge';
import KTRecovery from './components/KTRecovery';
import ResultsPanel from './components/ResultsPanel';
import CGPICalculator from './components/CGPICalculator';
import { getSubjectRows } from './utils/subjectData';
import { calculateSGPI, calculateTheoryPercent, calculateLabPercent } from './utils/calculator';
import { saveToStorage, loadFromStorage, clearStorage } from './utils/storage';

const TABS = [
  { id: 'calculator', label: '📊 Calculator' },
  { id: 'predictor', label: '🎯 Predictor' },
  { id: 'kt', label: '🔄 KT Recovery' },
  { id: 'cgpi', label: '🧮 CGPI' },
];

export default function App() {
  const [semester, setSemester] = useState(4);
  const [marks, setMarks] = useState({});
  const [ktData, setKTData] = useState({});
  const [activeTab, setActiveTab] = useState('calculator');
  const [targetSGPI, setTargetSGPI] = useState(8.0);

  // Get flattened rows (theory + lab per subject)
  const subjectRows = useMemo(() => getSubjectRows(semester), [semester]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = loadFromStorage();
    if (saved) {
      if (saved.semester) setSemester(saved.semester);
      if (saved.marks) setMarks(saved.marks);
      if (saved.ktData) setKTData(saved.ktData);
      if (saved.targetSGPI) setTargetSGPI(saved.targetSGPI);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    saveToStorage({ semester, marks, ktData, targetSGPI });
  }, [semester, marks, ktData, targetSGPI]);

  const handleSemesterChange = useCallback((newSem) => {
    setSemester(newSem);
    setMarks({});
    setKTData({});
  }, []);

  const handleMarksChange = useCallback((rowKey, field, value) => {
    setMarks(prev => ({
      ...prev,
      [rowKey]: {
        ...(prev[rowKey] || {}),
        [field]: value,
      },
    }));
  }, []);

  const handleKTChange = useCallback((rowKey, field, value) => {
    setKTData(prev => ({
      ...prev,
      [rowKey]: {
        ...(prev[rowKey] || {}),
        [field]: value,
      },
    }));
  }, []);

  const handleClearData = () => {
    setMarks({});
    setKTData({});
    clearStorage();
  };

  // Compute SGPI from current marks + KT overrides
  const computedRows = useMemo(() => {
    return subjectRows.map(row => {
      const key = getRowKey(row);
      const m = marks[key] || {};
      const kt = ktData[key];

      let percent = 0;
      if (row.rowType === 'theory') {
        const ia = Number(m.ia) || 0;
        const endSem = Number(m.endSem) || 0;
        percent = calculateTheoryPercent(ia, endSem, { maxIA: row.maxIA, maxEndSem: row.maxEndSem });
      } else {
        const tw = Number(m.tw) || 0;
        const oral = Number(m.oral) || 0;
        percent = calculateLabPercent(tw, oral, { maxTW: row.maxTW, maxOral: row.maxOral });
      }

      // Backlog override
      const backlogOverride = (kt && kt.cleared && kt.newGrade)
        ? { cleared: true, newGrade: kt.newGrade }
        : null;

      return {
        ...row,
        // Keep the row key available
        subjectIndex: row.subjectIndex,
        rowType: row.rowType,
        percent,
        credits: row.credits,
        backlogOverride,
      };
    });
  }, [subjectRows, marks, ktData]);

  const sgpiResult = useMemo(() => calculateSGPI(computedRows), [computedRows]);

  return (
    <div className="app-container">
      <Header />

      <SemesterSelector
        semester={semester}
        onSemesterChange={handleSemesterChange}
      />

      {/* Tab Navigation */}
      <div className="tab-nav" id="tab-navigation">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            id={`tab-${tab.id}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="section-divider" />

      {/* Calculator Tab */}
      {activeTab === 'calculator' && (
        <>
          <SubjectForm
            subjectRows={subjectRows}
            marks={marks}
            onMarksChange={handleMarksChange}
          />

          <ProgressGauge
            sgpi={sgpiResult.sgpi}
            targetSGPI={targetSGPI}
            totalCredits={sgpiResult.totalCredits}
            earnedCredits={sgpiResult.earnedCredits}
          />

          <ResultsPanel sgpiResult={sgpiResult} />
        </>
      )}

      {/* Predictor Tab */}
      {activeTab === 'predictor' && (
        <TargetPredictor
          subjectRows={subjectRows}
          marks={marks}
        />
      )}

      {/* KT Recovery Tab */}
      {activeTab === 'kt' && (
        <>
          <KTRecovery
            subjectRows={subjectRows}
            rowResults={sgpiResult.rowResults}
            ktData={ktData}
            onKTChange={handleKTChange}
          />
          {Object.values(ktData).some(k => k.cleared && k.newGrade) && (
            <ResultsPanel sgpiResult={sgpiResult} />
          )}
        </>
      )}

      {/* CGPI Tab */}
      {activeTab === 'cgpi' && (
        <CGPICalculator />
      )}

      {/* Footer */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '8px', marginTop: '20px',
      }}>
        <button className="clear-btn" onClick={handleClearData} id="clear-data-btn">
          🗑 Clear All Data
        </button>
      </div>

      <footer className="footer">
        <p>
          <strong style={{ color: '#FFE600' }}>MU Pointer Pro</strong> — Built for Mumbai University Engineering Students
        </p>
        <p style={{ marginTop: '4px' }}>
          REV-2019 C-Scheme • Theory + Lab Credits • Data stored locally on your device
        </p>
      </footer>
    </div>
  );
}
