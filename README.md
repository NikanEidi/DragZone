# <img src="UIcomponents/Frame/Icon.svg" width="48" height="48" valign="middle" /> DragZoneAI

**An ultra-premium, cyberpunk-themed AI chat interface optimized for high-performance and deep immersion.**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## 🎨 Visual Philosophy

DragZoneAI is not just a chat interface; it's a digital experience. Drawing inspiration from **Cyberpunk aesthetics** and **Dragon motifs**, the newly overhauled **Ultra-Premium UI** features:

- **Ultra-Premium Dragon Skin Borders**: Thick, multi-layered SVG borders with realistic overlapping reptile scales, procedural bump mapping (`feTurbulence`), and animated cyan/purple energy veins.
- **Glowing Dragon Eye Ornaments**: Responsive corner pieces with pulsing radial gradients and slit-pupil designs.
- **Deep Space Aurora Backdrops**: An infinitely breathing multi-layered background system combining dark matter radial gradients and cyberpunk particle fields.
- **Professional Smoked Liquid Glass**: High-translucency surfaces with 40px backdrop blur, drop shadows, and active hover states reflecting ambient light.
- **Holographic UI**: Precision SVG icons and glass frames derived entirely from huge, high-fidelity source assets (`UIcomponents`), perfectly optimized for the web.

---

## 🚀 Key Features

- **⚡ High-Performance Rendering**: 
  - **Canvas-based VFX**: Particle fields and smoke effects (CloudVape) run on isolated HTML5 Canvases to maintain 60FPS even on iPadOS.
  - **GPU Acceleration**: Heavy use of `transform: translate3d()` and `will-change` hints to offload visual debt to the GPU.
- **🤖 MVC Architecture**: 
  - **Models**: Type-safe state management in `src/types`.
  - **Views**: Atomic, reusable components built with Radix UI and Tailwind CSS.
  - **Controllers**: Logic abstracted into custom React hooks for maximum maintainability.
- **🐉 Dragon Protocol**: Custom "Dragon" themed status indicators and response patterns.
- **📱 Fluid Responsiveness**: Uses CSS `clamp()` and internal layout logic to ensure a seamless experience from massive desktop monitors down to iPad Mini.
- **🔮 Ollama Ready**: Pre-architected with `useOllama` hooks, ready to connect to local LLM endpoints.

---

## 🛠️ Technical Stack

- **Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with Vite Plugin
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: CSS Keyframes + Framer Motion (Ready) + Canvas API

---

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/DragZone.git
   cd DragZone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```


---

## 🧪 Testing & CI/CD

DragZone AI is built with reliability in mind.
- **Unit Tests**: `npm run test:unit` to run Jest tests on component logic.
- **E2E Tests**: `npm run test:e2e:ci` to run Cypress tests headlessly.
- **CI/CD Pipeline**: GitHub Actions automatically builds, lints, and runs tests for every push to `main` and `feature/enhancement-UI`.

---

## 📂 Project Structure

```text
DragZone/
├── src/
│   ├── components/      # UI Components (Chat, Layout, Effects)
│   ├── hooks/           # Logic & Controllers (useChat, useOllama)
│   ├── types/           # Type Definitions
│   ├── styles/          # Global CSS & Tailwind Config
│   ├── assets/          # Static Images & SVGs
│   └── App.tsx          # Root Application Component
├── UIcomponents/        # High-Fidelity Asset Frames (246MB+)
├── index.html           # Entry Point
├── vite.config.ts       # Vite Configuration
└── package.json         # Dependencies & Scripts
```

---

## 👨‍💻 Author

**Nikan Eidi**  
*Lead Architect & Designer*

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.