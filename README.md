# MU Pointer Pro 🎓

![MU Pointer Pro](https://raw.githubusercontent.com/ani-coder01/MU-GradePath/main/public/preview.png)

A modern, fast, and privacy-focused SGPI/CGPI Calculator & Grade Predictor built specifically for Mumbai University (MU) Engineering students (REV-2019 C-Scheme). 

Live Demo: [https://mu-pointer-pro.vercel.app](https://mu-pointer-pro.vercel.app) *(Replace with your actual Vercel domain)*

## ✨ Features

- **📊 Real-time SGPI Calculator**: Instantly computes your SGPI as you enter Internal Assessment (IA), Term Work (TW), Oral, and End-Sem marks.
- **🔬 Theory & Lab Split**: Accurately weights Theory and Practical/Oral credits according to the latest MU Rev-2019 C-Scheme guidelines.
- **🎯 Target Predictor**: Set a goal SGPI and the app reverse-engineers the exact minimum End-Sem/Oral marks you need to score in each subject. Includes "Critical Warnings" if your target is mathematically impossible based on your internal marks.
- **🔄 KT / Backlog Recovery**: Failed a subject? Toggle "Backlog Mode" to see how clearing a KT with a new grade will impact and recover your SGPI.
- **🧮 Overall CGPI Calculator**: Enter your SGPI from Semesters 1-8 to calculate your final CGPI and official MU percentage conversion.
- **💾 100% Local Storage**: No logins, no databases. All your marks and progress are saved securely on your own device.
- **📱 Mobile First**: A stunning "Neo-Brutalist" dark-mode UI that works perfectly on phones, tablets, and desktops.

## 🚀 Tech Stack

- **Frontend Framework**: React 18 + Vite
- **Styling**: Vanilla CSS (Custom Neo-Brutalist Theme) + Tailwind CSS (Utility classes)
- **Deployment**: Vercel

## 🛠️ Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ani-coder01/MU-GradePath.git
   cd MU-GradePath
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📝 MU Grading Formula Reference

- **SGPI Formula**: `Σ(Theory_GP × Theory_Cr) + Σ(Lab_GP × Lab_Cr) / Total Credits`
- **CGPI to Percentage**:
  - `CGPI < 7` : `7.1 × CGPI + 12`
  - `CGPI ≥ 7` : `7.4 × CGPI + 12`
- **Grade Points**: O (10), A+ (9), A (8), B+ (7), B (6), C (5), P (4), F (0)

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
