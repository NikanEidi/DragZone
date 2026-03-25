<div align="center">

# 🐉 DRAGZONE — Cyber Dragon Edition

[![License: MIT](https://img.shields.io/badge/License-MIT-00D4E5.svg?style=for-the-badge&logo=github)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-1.3.0-B026FF.svg?style=for-the-badge&logo=npm)](https://github.com/NikanEidi/DragZone/releases)
[![Build Status](https://img.shields.io/badge/Build-STABLE-F85149.svg?style=for-the-badge&logo=vercel)](https://github.com/NikanEidi/DragZone)

**DRAGZONE** is a premium, high-immersion AI ecosystem designed for advanced document parsing, technical research, and neural-linked workflow automation. Built with a specialized "Cyber Dragon" aesthetic, it seamlessly blends military-grade UI design with a buttery-smooth 60FPS interaction layer.

<img src="./public/og-image.png" alt="DragZone UI Preview" width="100%" />

</div>

---

## 🎨 The Cyber Dragon Experience

DragZone isn't just another chat interface; it is an immersive, local-first terminal designed for the future of human-AI collaboration.

- **Neural Background System**: Multi-layered parallax backgrounds with hex-grid overlays and our custom "Cyber-Aurora" atmosphere.
- **Dragon Guardian Mascot**: A titanic, high-fidelity static SVG signature sitting in the core header, keeping watch over your active sessions.
- **Liquid Glass UI**: Ultra-blurred translucency (`30px` backdrop), premium border-glow, and custom tactile SVG dragon-skin textures.
- **Performance Optimized**: Uses hardware-accelerated transforms (`translate3d(0,0,0)`) to maintain perfect 60FPS physics on both M-series MacBooks and iPad Minis.

---

## 🚀 Core Systems

### 🤖 Local Neural Processing (Ollama)
- Direct integration with local LLM instances (default: `localhost:11434`).
- **Privacy First**: No data ever leaves your hardware. All reasoning happens locally behind the "Encrypted Link."
- **Real-Time Streaming**: Incremental token generation with optimized React state batching to prevent re-render lag.

### 📦 Omni-Parser Engine
DragZone is shipped with a built-in Omni-Parser drop zone allowing you to effortlessly inject massive contexts into your AI's reasoning capabilities:
- **Formats**: PDFs, Excel data (`.xlsx`), Word documents (`.docx`), PowerPoints (`.pptx`), CSVs, and standard HTML files.
- **Vision Models**: Advanced diagram and chart reading (if paired with models like `llava`).

### 🛠️ Interactive Tooling & CodeFrames
- **Smart CodeFrames**: DragZone automatically detects code logic and injects it into premium CodeFrames featuring one-click copy and non-blocking file downloads (bypassing the Javascript main thread).
- **System Status Portal**: A functional real-time diagnostic overlay built directly into the header providing layout logic status and engine connection states.

---

## 📱 Mobile & PWA Optimization

Built with fluid typography, flex-clamps, and viewport scaling, DragZone looks and performs impeccably across all devices:

- **Desktop/MacBook**: High-density horizontal layouts with dynamic sub-menus.
- **Tablets/iPads**: Seamless touch-interfaces with swipe-to-collapse sidebars.
- **PWA Ready**: Tap **'Share' > 'Add to Home Screen'** on your iPhone or iPad. DragZone includes a custom `manifest.webmanifest` to lock the UI into a true, borderless fullscreen application experience.

---

## 🏗️ Deployment & Launch

1.  **Clone the Dragon Repository**:
    ```bash
    git clone https://github.com/NikanEidi/DragZone.git
    cd DragZone
    ```
2.  **Initialize Nueral Links**:
    ```bash
    npm install
    ```
3.  **Launch the System**:
    ```bash
    chmod +x start_dragon.sh
    ./start_dragon.sh
    ```
4.  **Access the Engine**:
    - MacBook / Local: `http://localhost:3000`
    - iPad / Network: `http://[YOUR_IP]:3000`

---

## 📜 Architectural Documentation

DragZone's logic is strictly mapped. Learn how to extend the Dragon by reviewing our core engineering documentation:

- [🏗️ ARCHITECTURE.md](./ARCHITECTURE.md): Deep dive into our modular React MVC pattern and GPU-offloading rendering strategy.
- [📝 CHANGELOG.md](./CHANGELOG.md): History of the Dragon's evolution up to v1.3.0.
- [🧪 TESTING.md](./TESTING.md): Guide to the Cypress (E2E) and Jest test suites.
- [📂 FOLDER_EXPLAINER.md](./FOLDER_EXPLAINER.md): Detailed directory-level structural breakdown.
- [⚙️ FUNCTION_EXPLAINER.md](./FUNCTION_EXPLAINER.md): The internal logic mapping of our React custom hooks.

---

<div align="center">
<p><em>Designed, Engineered, and Forged by <strong>Nikan Eidi</strong>.</em></p>
<p><em>"The Dragon is always watching."</em> 🐉✨</p>
</div>
