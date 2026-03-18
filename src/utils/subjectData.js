// MU Pointer Pro — Semester Subject Data (v2: Theory/Lab Split)
// REV-2019 C-Scheme (Computer Engineering)
//
// New schema:
//   name        – subject name
//   theory_cr   – theory credits
//   lab_cr      – lab/practical credits (0 if none)
//   total_cr    – total credits (theory_cr + lab_cr)
//   theory      – { maxIA, maxEndSem } for theory component
//   lab         – { maxTW, maxOral } for practical/oral component (null if no lab)
//   type        – 'theory' | 'practical' | 'project'

const SEMESTER_DATA = {
  1: {
    name: 'Semester I',
    scheme: 'C-Scheme / REV-2019',
    subjects: [
      { name: 'Engineering Mathematics I', theory_cr: 4, lab_cr: 0, total_cr: 4, theory: { maxIA: 20, maxEndSem: 80 }, lab: null, type: 'theory' },
      { name: 'Engineering Physics I', theory_cr: 3, lab_cr: 1, total_cr: 4, theory: { maxIA: 20, maxEndSem: 80 }, lab: { maxTW: 25, maxOral: 25 }, type: 'theory' },
      { name: 'Engineering Chemistry I', theory_cr: 3, lab_cr: 1, total_cr: 4, theory: { maxIA: 20, maxEndSem: 80 }, lab: { maxTW: 25, maxOral: 25 }, type: 'theory' },
      { name: 'Engineering Mechanics', theory_cr: 4, lab_cr: 0, total_cr: 4, theory: { maxIA: 20, maxEndSem: 80 }, lab: null, type: 'theory' },
      { name: 'Basic Electrical Engineering', theory_cr: 2, lab_cr: 1, total_cr: 3, theory: { maxIA: 20, maxEndSem: 80 }, lab: { maxTW: 25, maxOral: 25 }, type: 'theory' },
    ],
  },
  2: {
    name: 'Semester II',
    scheme: 'C-Scheme / REV-2019',
    subjects: [
      { name: 'Engineering Mathematics II', theory_cr: 4, lab_cr: 0, total_cr: 4, theory: { maxIA: 20, maxEndSem: 80 }, lab: null, type: 'theory' },
      { name: 'Engineering Physics II', theory_cr: 3, lab_cr: 1, total_cr: 4, theory: { maxIA: 20, maxEndSem: 80 }, lab: { maxTW: 25, maxOral: 25 }, type: 'theory' },
      { name: 'Engineering Chemistry II', theory_cr: 3, lab_cr: 1, total_cr: 4, theory: { maxIA: 20, maxEndSem: 80 }, lab: { maxTW: 25, maxOral: 25 }, type: 'theory' },
      { name: 'Engineering Drawing', theory_cr: 3, lab_cr: 1, total_cr: 4, theory: { maxIA: 20, maxEndSem: 80 }, lab: { maxTW: 25, maxOral: 25 }, type: 'theory' },
      { name: 'C Programming', theory_cr: 2, lab_cr: 1, total_cr: 3, theory: { maxIA: 20, maxEndSem: 80 }, lab: { maxTW: 25, maxOral: 25 }, type: 'theory' },
    ],
  },
  3: {
    name: 'Semester III',
    scheme: 'C-Scheme / REV-2019',
    subjects: [
      { name: 'Engineering Mathematics III', theory_cr: 4, lab_cr: 0, total_cr: 4, theory: { maxIA: 20, maxEndSem: 80 }, lab: null, type: 'theory' },
      { name: 'Data Structures', theory_cr: 3, lab_cr: 1, total_cr: 4, theory: { maxIA: 20, maxEndSem: 80 }, lab: { maxTW: 25, maxOral: 25 }, type: 'theory' },
      { name: 'Digital Logic Design', theory_cr: 3, lab_cr: 1, total_cr: 4, theory: { maxIA: 20, maxEndSem: 80 }, lab: { maxTW: 25, maxOral: 25 }, type: 'theory' },
      { name: 'Discrete Mathematics', theory_cr: 4, lab_cr: 0, total_cr: 4, theory: { maxIA: 20, maxEndSem: 80 }, lab: null, type: 'theory' },
      { name: 'Electronic Devices & Circuits', theory_cr: 2, lab_cr: 1, total_cr: 3, theory: { maxIA: 20, maxEndSem: 80 }, lab: { maxTW: 25, maxOral: 25 }, type: 'theory' },
    ],
  },
  4: {
    name: 'Semester IV',
    scheme: 'C-Scheme / REV-2019',
    subjects: [
      { name: 'Engineering Mathematics IV', theory_cr: 4, lab_cr: 0, total_cr: 4, theory: { maxIA: 20, maxEndSem: 80 }, lab: null, type: 'theory' },
      { name: 'Analysis of Algorithms', theory_cr: 3, lab_cr: 1, total_cr: 4, theory: { maxIA: 20, maxEndSem: 80 }, lab: { maxTW: 25, maxOral: 25 }, type: 'theory' },
      { name: 'Database Management Systems', theory_cr: 2, lab_cr: 1, total_cr: 3, theory: { maxIA: 20, maxEndSem: 80 }, lab: { maxTW: 25, maxOral: 25 }, type: 'theory' },
      { name: 'Operating Systems', theory_cr: 3, lab_cr: 1, total_cr: 4, theory: { maxIA: 20, maxEndSem: 80 }, lab: { maxTW: 25, maxOral: 25 }, type: 'theory' },
      { name: 'Microprocessors', theory_cr: 2, lab_cr: 1, total_cr: 3, theory: { maxIA: 20, maxEndSem: 80 }, lab: { maxTW: 25, maxOral: 25 }, type: 'theory' },
    ],
  },
  5: {
    name: 'Semester V',
    scheme: 'C-Scheme / REV-2019',
    subjects: [
      { name: 'Theoretical Computer Science', theory_cr: 4, lab_cr: 0, total_cr: 4, theory: { maxIA: 20, maxEndSem: 80 }, lab: null, type: 'theory' },
      { name: 'Software Engineering', theory_cr: 3, lab_cr: 1, total_cr: 4, theory: { maxIA: 20, maxEndSem: 80 }, lab: { maxTW: 25, maxOral: 25 }, type: 'theory' },
      { name: 'Computer Networks', theory_cr: 3, lab_cr: 1, total_cr: 4, theory: { maxIA: 20, maxEndSem: 80 }, lab: { maxTW: 25, maxOral: 25 }, type: 'theory' },
      { name: 'Data Warehousing & Mining', theory_cr: 2, lab_cr: 1, total_cr: 3, theory: { maxIA: 20, maxEndSem: 80 }, lab: { maxTW: 25, maxOral: 25 }, type: 'theory' },
      { name: 'Internet Programming', theory_cr: 2, lab_cr: 1, total_cr: 3, theory: { maxIA: 20, maxEndSem: 80 }, lab: { maxTW: 25, maxOral: 25 }, type: 'theory' },
    ],
  },
  6: {
    name: 'Semester VI',
    scheme: 'C-Scheme / REV-2019',
    subjects: [
      { name: 'System Programming & Compiler Design', theory_cr: 3, lab_cr: 1, total_cr: 4, theory: { maxIA: 20, maxEndSem: 80 }, lab: { maxTW: 25, maxOral: 25 }, type: 'theory' },
      { name: 'Cryptography & Network Security', theory_cr: 3, lab_cr: 1, total_cr: 4, theory: { maxIA: 20, maxEndSem: 80 }, lab: { maxTW: 25, maxOral: 25 }, type: 'theory' },
      { name: 'Machine Learning', theory_cr: 3, lab_cr: 1, total_cr: 4, theory: { maxIA: 20, maxEndSem: 80 }, lab: { maxTW: 25, maxOral: 25 }, type: 'theory' },
      { name: 'Distributed Computing', theory_cr: 2, lab_cr: 1, total_cr: 3, theory: { maxIA: 20, maxEndSem: 80 }, lab: { maxTW: 25, maxOral: 25 }, type: 'theory' },
      { name: 'Object Oriented Design', theory_cr: 2, lab_cr: 1, total_cr: 3, theory: { maxIA: 20, maxEndSem: 80 }, lab: { maxTW: 25, maxOral: 25 }, type: 'theory' },
    ],
  },
  7: {
    name: 'Semester VII',
    scheme: 'C-Scheme / REV-2019',
    subjects: [
      { name: 'Digital Signal Processing', theory_cr: 3, lab_cr: 1, total_cr: 4, theory: { maxIA: 20, maxEndSem: 80 }, lab: { maxTW: 25, maxOral: 25 }, type: 'theory' },
      { name: 'Mobile Computing', theory_cr: 3, lab_cr: 1, total_cr: 4, theory: { maxIA: 20, maxEndSem: 80 }, lab: { maxTW: 25, maxOral: 25 }, type: 'theory' },
      { name: 'Artificial Intelligence', theory_cr: 3, lab_cr: 1, total_cr: 4, theory: { maxIA: 20, maxEndSem: 80 }, lab: { maxTW: 25, maxOral: 25 }, type: 'theory' },
      { name: 'Elective I', theory_cr: 3, lab_cr: 0, total_cr: 3, theory: { maxIA: 20, maxEndSem: 80 }, lab: null, type: 'theory' },
      { name: 'Project Phase I', theory_cr: 0, lab_cr: 4, total_cr: 4, theory: null, lab: { maxTW: 50, maxOral: 50 }, type: 'project' },
    ],
  },
  8: {
    name: 'Semester VIII',
    scheme: 'C-Scheme / REV-2019',
    subjects: [
      { name: 'Human Machine Interaction', theory_cr: 3, lab_cr: 1, total_cr: 4, theory: { maxIA: 20, maxEndSem: 80 }, lab: { maxTW: 25, maxOral: 25 }, type: 'theory' },
      { name: 'Big Data Analytics', theory_cr: 3, lab_cr: 1, total_cr: 4, theory: { maxIA: 20, maxEndSem: 80 }, lab: { maxTW: 25, maxOral: 25 }, type: 'theory' },
      { name: 'Elective II', theory_cr: 3, lab_cr: 0, total_cr: 3, theory: { maxIA: 20, maxEndSem: 80 }, lab: null, type: 'theory' },
      { name: 'Elective III', theory_cr: 3, lab_cr: 0, total_cr: 3, theory: { maxIA: 20, maxEndSem: 80 }, lab: null, type: 'theory' },
      { name: 'Project Phase II', theory_cr: 0, lab_cr: 6, total_cr: 6, theory: null, lab: { maxTW: 50, maxOral: 50 }, type: 'project' },
    ],
  },
};

export default SEMESTER_DATA;

/**
 * Get subjects for a given semester
 */
export function getSubjects(semester) {
  return SEMESTER_DATA[semester]?.subjects || [];
}

/**
 * Get semester info
 */
export function getSemesterInfo(semester) {
  return SEMESTER_DATA[semester] || null;
}

/**
 * Get all semester numbers
 */
export function getAllSemesters() {
  return Object.keys(SEMESTER_DATA).map(Number);
}

/**
 * Flatten a subject into input rows (theory row + optional lab row)
 * Returns an array of "rows" that the UI can render
 */
export function getSubjectRows(semester) {
  const subjects = getSubjects(semester);
  const rows = [];

  subjects.forEach((sub, subIdx) => {
    if (sub.theory) {
      rows.push({
        subjectIndex: subIdx,
        rowType: 'theory',
        name: sub.name,
        label: sub.lab ? `${sub.name} — Theory` : sub.name,
        credits: sub.theory_cr,
        maxIA: sub.theory.maxIA,
        maxEndSem: sub.theory.maxEndSem,
        totalMax: sub.theory.maxIA + sub.theory.maxEndSem,
        subject: sub,
      });
    }
    if (sub.lab) {
      rows.push({
        subjectIndex: subIdx,
        rowType: 'lab',
        name: sub.name,
        label: sub.theory ? `${sub.name} — Lab/Oral` : sub.name,
        credits: sub.lab_cr,
        maxTW: sub.lab.maxTW,
        maxOral: sub.lab.maxOral,
        totalMax: sub.lab.maxTW + sub.lab.maxOral,
        subject: sub,
      });
    }
  });

  return rows;
}
