// MU Pointer Pro — Core Calculation Engine v2
// Mumbai University REV-2019 C-Scheme Grading System
// Now supports separate Theory + Lab/Practical GP weighting

/**
 * MU Grade Boundaries (Total marks out of 100)
 */
export const GRADE_TABLE = [
  { min: 80, grade: 'O',  label: 'Outstanding', gp: 10 },
  { min: 75, grade: 'A+', label: 'Excellent',   gp: 9 },
  { min: 70, grade: 'A',  label: 'Very Good',   gp: 8 },
  { min: 60, grade: 'B+', label: 'Good',        gp: 7 },
  { min: 50, grade: 'B',  label: 'Fair',        gp: 6 },
  { min: 45, grade: 'C',  label: 'Average',     gp: 5 },
  { min: 40, grade: 'P',  label: 'Pass',        gp: 4 },
  { min: 0,  grade: 'F',  label: 'Fail',        gp: 0 },
];

export const GRADE_OPTIONS_FOR_KT = ['O', 'A+', 'A', 'B+', 'B', 'C', 'P'];

/**
 * Convert total marks (0-100) to a grade object
 */
export function totalMarksToGrade(total) {
  const t = Math.round(total);
  for (const row of GRADE_TABLE) {
    if (t >= row.min) return { ...row };
  }
  return { ...GRADE_TABLE[GRADE_TABLE.length - 1] };
}

/**
 * Get grade point from grade letter
 */
export function gradeToGradePoint(grade) {
  const row = GRADE_TABLE.find(r => r.grade === grade);
  return row ? row.gp : 0;
}

/**
 * Calculate percentage for a theory component (IA + EndSem)
 */
export function calculateTheoryPercent(ia, endSem, config) {
  const { maxIA = 20, maxEndSem = 80 } = config || {};
  const totalMax = maxIA + maxEndSem;
  if (totalMax === 0) return 0;
  const totalObtained = (ia || 0) + (endSem || 0);
  return Math.round((totalObtained / totalMax) * 100);
}

/**
 * Calculate percentage for a lab/practical component (TW + Oral)
 */
export function calculateLabPercent(tw, oral, config) {
  const { maxTW = 25, maxOral = 25 } = config || {};
  const totalMax = maxTW + maxOral;
  if (totalMax === 0) return 0;
  const totalObtained = (tw || 0) + (oral || 0);
  return Math.round((totalObtained / totalMax) * 100);
}

/**
 * Calculate SGPI v2 — Separate Theory & Lab GP weighting
 *
 * SGPI = [ Σ(Theory_GP × Theory_Cr) + Σ(Lab_GP × Lab_Cr) ] / Total_Semester_Credits
 *
 * @param {Array} rows - flattened row data from the UI:
 *   [{ rowType: 'theory'|'lab', credits, percent, backlogOverride?: { grade } }]
 *
 * @returns {{ sgpi, totalCredits, earnedCredits, rowResults }}
 */
export function calculateSGPI(rows) {
  let sumCreditGP = 0;
  let totalCredits = 0;
  let earnedCredits = 0;
  const rowResults = [];

  for (const row of rows) {
    let grade;

    // Backlog override: use the manually-specified new grade
    if (row.backlogOverride && row.backlogOverride.cleared && row.backlogOverride.newGrade) {
      grade = {
        grade: row.backlogOverride.newGrade,
        gp: gradeToGradePoint(row.backlogOverride.newGrade),
        label: GRADE_TABLE.find(r => r.grade === row.backlogOverride.newGrade)?.label || '',
      };
    } else {
      grade = totalMarksToGrade(row.percent ?? 0);
    }

    const creditGP = row.credits * grade.gp;
    sumCreditGP += creditGP;
    totalCredits += row.credits;

    if (grade.grade !== 'F') {
      earnedCredits += row.credits;
    }

    rowResults.push({
      ...row,
      computedPercent: row.percent ?? 0,
      grade: grade.grade,
      gradeLabel: grade.label,
      gradePoint: grade.gp,
      creditGP,
    });
  }

  const sgpi = totalCredits > 0 ? sumCreditGP / totalCredits : 0;

  return {
    sgpi: Math.round(sgpi * 100) / 100,
    totalCredits,
    earnedCredits,
    rowResults,
  };
}

/**
 * Calculate CGPI from an array of semester SGPIs with their credits
 */
export function calculateCGPI(semesters) {
  let sumWeighted = 0;
  let totalCredits = 0;

  for (const sem of semesters) {
    if (sem.sgpi > 0 && sem.totalCredits > 0) {
      sumWeighted += sem.sgpi * sem.totalCredits;
      totalCredits += sem.totalCredits;
    }
  }

  return totalCredits > 0 ? Math.round((sumWeighted / totalCredits) * 100) / 100 : 0;
}

/**
 * Convert CGPI to Percentage (MU Official Formula)
 * CGPI < 7:  Percentage = 7.1 × CGPI + 12
 * CGPI ≥ 7:  Percentage = 7.4 × CGPI + 12
 * Result rounded up to next integer
 */
export function cgpiToPercentage(cgpi) {
  if (cgpi <= 0) return 0;
  const pct = cgpi < 7 ? (7.1 * cgpi + 12) : (7.4 * cgpi + 12);
  return Math.ceil(pct);
}

/**
 * Reverse-engineer minimum End-Sem / Oral marks to achieve a target SGPI.
 *
 * For each row (theory or lab), given the "locked-in" marks (IA / TW),
 * calculate the minimum remaining marks needed.
 *
 * Returns per-row results with feasibility + critical warnings.
 *
 * @param {number} targetSGPI
 * @param {Array} rows - [{ name, label, rowType, credits, lockedMarks, lockedMax, remainingMax, totalMax }]
 */
export function calculateMinEndSem(targetSGPI, rows) {
  const totalCredits = rows.reduce((sum, r) => sum + r.credits, 0);
  const requiredCreditGP = targetSGPI * totalCredits;

  // For each row, compute grade options (what end-sem/oral marks achieve each grade)
  const results = rows.map(row => {
    const { credits, lockedMarks = 0, totalMax, remainingMax = 80 } = row;

    const gradeOptions = [];
    for (const gRow of [...GRADE_TABLE].reverse()) {
      if (gRow.grade === 'F') continue;
      // minTotalRaw = ceil(gRow.min * totalMax / 100)
      const minTotalRaw = Math.ceil(gRow.min * totalMax / 100);
      const minRemaining = Math.max(0, minTotalRaw - lockedMarks);

      gradeOptions.push({
        grade: gRow.grade,
        gradePoint: gRow.gp,
        minRemaining,
        creditGP: credits * gRow.gp,
        exceeds: minRemaining > remainingMax,   // "Critical Warning" flag
      });
    }

    return { ...row, gradeOptions };
  });

  // Greedy: start with lowest passing, upgrade by credit weight
  const finalResults = results.map(r => {
    const viable = r.gradeOptions.filter(o => !o.exceeds);
    const defaultOption = viable[0] || r.gradeOptions[0] || { grade: 'F', gradePoint: 0, minRemaining: 0, creditGP: 0, exceeds: true };
    return { ...r, selected: defaultOption };
  });

  let currentCreditGP = finalResults.reduce((sum, r) => sum + (r.selected?.creditGP || 0), 0);

  if (currentCreditGP < requiredCreditGP) {
    const sortedIndices = finalResults
      .map((_, i) => i)
      .sort((a, b) => finalResults[b].credits - finalResults[a].credits);

    for (const idx of sortedIndices) {
      if (currentCreditGP >= requiredCreditGP) break;
      const sub = finalResults[idx];
      const options = sub.gradeOptions;
      for (let i = 1; i < options.length; i++) {
        const upgrade = options[i];
        const diff = upgrade.creditGP - sub.selected.creditGP;
        currentCreditGP += diff;
        sub.selected = upgrade;
        if (currentCreditGP >= requiredCreditGP) break;
      }
    }
  }

  const achievedSGPI = Math.round((currentCreditGP / totalCredits) * 100) / 100;

  return {
    feasible: achievedSGPI >= targetSGPI,
    results: finalResults.map(r => ({
      name: r.name,
      label: r.label,
      rowType: r.rowType,
      credits: r.credits,
      minRemaining: r.selected?.minRemaining || 0,
      targetGrade: r.selected?.grade || 'F',
      targetGP: r.selected?.gradePoint || 0,
      critical: r.selected?.exceeds || false,
      remainingMax: r.remainingMax,
    })),
    achievedSGPI,
  };
}
