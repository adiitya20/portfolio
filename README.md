# ⚡ Aditya Verlekar — Software & AI Engineer Portfolio

A modern, interactive developer portfolio showcasing software development, AI/ML engineering, computer vision projects, and full-stack web applications. Built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, **GSAP**, **Three.js / React Three Fiber**, and **Lenis Smooth Scroll**.

![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs)
![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-Animation-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-R3F-black?style=for-the-badge&logo=three.js&logoColor=white)

---

## ✨ Features & Highlights

- 🎨 **Generative 3D Canvas Background**: Custom GLSL shader with wave distortion and reactive mouse light aura built with React Three Fiber.
- 🎛️ **Interactive Live Simulators**:
  - **Deepfake AI Detector**: Interactive frame scanner, MTCNN face bounding box, confidence scores, and acoustic wave spectrum visualizer.
  - **GrillHouse Platform**: Interactive multi-tab card switcher displaying REST API status logs, MySQL schema relationships, and UI order flows.
  - **Mood Detector**: Real-time facial landmark SVG mesh wireframe, emotion probability meters, and animated sound equalizer bars.
- 🪪 **3D Tilt Developer Badge**: Interactive card tracking mouse movement with live availability indicator dot.
- 📜 **Horizontal Scroll Showcase**: Smooth GSAP ScrollTrigger horizontal pinning for deep project inspection.
- 🎯 **Interactive Vocabulary Graph**: Interactive technical skills matrix displaying system connections on hover.
- 🌊 **Smooth Kinetic Typography**: Split-character line reveals, velocity effects, and customized smooth scrolling powered by Lenis.

---

## 🛠️ Featured Systems & Projects

| Project | Category | Key Technologies |
| :--- | :--- | :--- |
| **01. Deepfake & AI Real Recognizer** | AI / ML / Computer Vision | Python, TensorFlow, OpenCV, Librosa, CNN, LSTM, MTCNN |
| **02. GrillHouse / Zomspy** | Full-Stack Web App / DBMS | Node.js, Express.js, MySQL, HTML5, CSS3, JavaScript, Tailwind |
| **03. Mood Detector + Music Suggestor** | AI / CV / Music Recs | Computer Vision, OpenCV, Machine Learning, Python |

---

## 💻 Tech Stack

### **Frontend & Framework**
- **Framework**: Next.js 16 (App Router + Turbopack)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4, Space Grotesk & JetBrains Mono fonts
- **Icons & Motion**: GSAP (ScrollTrigger), Lenis Smooth Scroll, Custom Cursor Manager

### **3D & Graphics**
- Three.js
- `@react-three/fiber`
- Custom GLSL Shaders

---

## 🚀 Getting Started

### **Prerequisites**
- **Node.js**: `v18.0.0` or higher
- **npm** or **yarn** / **pnpm**

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/adiitya20/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Project Structure

```
portfolio/
├── src/
│   ├── app/                  # Next.js App Router routes & layout configuration
│   ├── components/           # UI components
│   │   ├── projects/         # Interactive project card visualizers & diagrams
│   │   ├── skills/           # Technical skills category pills & graph interaction
│   │   ├── About.tsx         # Interactive 3D tilt profile identity card
│   │   ├── Hero.tsx          # Hero section with kinetic typography
│   │   ├── HeroBackground.tsx # R3F GLSL interactive background canvas
│   │   ├── EducationTimeline.tsx # Timeline with coursework highlights
│   │   └── Leadership.tsx    # Technical fest finance head event card
│   ├── context/              # Global state & cursor mode context
│   ├── data/                 # Portfolio configuration & metadata source of truth
│   └── lib/                  # Motion helpers, Lenis hook, classname utilities
├── public/                   # Static assets & media
├── package.json              # Project dependencies & scripts
└── README.md                 # Project documentation
```

---

## 👤 Author

**Aditya Verlekar**
- 🎓 **Degree**: B.E. Information Technology (PCCE, Goa)
- 📍 **Location**: Goa, India
- 🔗 **GitHub**: [@adiitya20](https://github.com/adiitya20)
- 💼 **LinkedIn**: [Aditya Verlekar](https://www.linkedin.com/in/aditya-verlekar-81990b287/)
- 📷 **Instagram**: [@adityaverlekar_](https://www.instagram.com/adityaverlekar_/)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
