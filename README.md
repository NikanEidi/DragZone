# 🐉 DRAGZONE — Cyber Dragon Edition

[![License: MIT](https://img.shields.io/badge/License-MIT-00F0FF.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/Build-STABLE-B026FF.svg)](https://github.com/NikanEidi/DragZone)
[![Version](https://img.shields.io/badge/Version-1.2.0-red.svg)](https://github.com/NikanEidi/DragZone/releases)

**DRAGZONE** is a premium, high-immersion AI ecosystem designed for advanced document parsing, technical research, and neural-linked workflow automation. Built with a "Cyber Dragon" aesthetic, it combines military-grade UI density with a buttery-smooth 60FPS interaction layer.

---

## 🎨 The Cyber Dragon Experience

DragZone isn't just a chat interface; it's an immersive terminal designed for the future of human-AI collaboration.

- **Neural Background System**: Multi-layered parallax backgrounds with hex-grid overlays and "Cyber-Aurora" atmosphere.
- **Dragon Guardian Mascot**: A titanic, high-fidelity static signature sitting in the core header, keeping watch over your sessions.
- **Brand Immersion**: Re-branded with the custom `dragon-icon.svg` favicon and high-fidelity social sharing layouts (`og-image.png`).
- **Liquid Glass UI**: Ultra-blurred translucency (`30px` backdrop) with premium border-glow and SVG dragon-skin textures.

## 🚀 Core Features

### 🤖 Local Neural Processing (Ollama)
- Direct integration with local LLM instances (default: `localhost:11434/api/generate`).
- **Privacy First**: No data leaves your machine. All reasoning happens locally behind the "Encrypted Link."
- **Streaming Response**: Real-time token streaming with beautiful markdown rendering.

### 📦 Omni-Parser Extensions
Seamlessly inject context from complex document types into your AI's reasoning engine:
- **PDF, Excel (XLSX), Word (DOCX), PPTX, CSV, HTML.**
- **High-Res Images**: Intelligent parsing of technical diagrams and visual assets.

### 🛠️ Interactive Tooling
- **Smart CodeFrames**: Premium code blocks with language-specific highlighting, instant clipboard sync, and one-click file downloads.
- **System Status Portal**: A functional diagnostic overlay in the header providing real-time data on engine latency, memory load, and buffer sync.
- **Drag & Drop Workflow**: Fluid file injection via the "Omni-Parse" drop zone with holographic overlays.

---

## 📱 Mobile & PWA Optimization

Built for the **MacBook 14"**, **iPad Pro**, and **iPhone**, DragZone scales gracefully across all viewports:
- **Responsive Layout Engine**: Uses advanced CSS `clamp()` and `vh/vw` units for perfect scaling without breakpoints.
- **Home Screen App**: Web Manifest enabled. Tap **'Share'** > **'Add to Home Screen'** on iOS/iPadOS for a borderless PWA experience.
- **Gesture Control**: Swipe to toggle sidebars and manage session lists with native-feeling animations.

## 🛠️ Deployment & Launch

1.  **Clone & Initialize**:
    ```bash
    git clone https://github.com/NikanEidi/DragZone.git
    cd DragZone
    npm install
    ```
2.  **Launch the Dragon**:
    ```bash
    chmod +x start_dragon.sh
    ./start_dragon.sh
    ```
3.  **Access the Engine**:
    - Local: `http://localhost:3000`
    - Network: `http://[YOUR_IP]:3000`

---

## 📜 Documentation Links

- [🏗️ ARCHITECTURE.md](ARCHITECTURE.md): Deep dive into the MVC pattern and rendering strategy.
- [📝 CHANGELOG.md](CHANGELOG.md): History of the Dragon's evolution.
- [🧪 TESTING.md](TESTING.md): Guide to the Jest and Cypress test suites.
- [📂 FOLDER_EXPLAINER.md](FOLDER_EXPLAINER.md): Directory-level structural breakdown.

---

*Designed and Engineered by **Nikan Eidi**.*
*The Dragon is always watching.* 🐉✨
