<div align="center">

```
██████╗ ██████╗  █████╗  ██████╗ ███████╗ ██████╗ ███╗   ██╗███████╗
██╔══██╗██╔══██╗██╔══██╗██╔════╝ ╚══███╔╝██╔═══██╗████╗  ██║██╔════╝
██║  ██║██████╔╝███████║██║  ███╗  ███╔╝ ██║   ██║██╔██╗ ██║█████╗  
██║  ██║██╔══██╗██╔══██║██║   ██║ ███╔╝  ██║   ██║██║╚██╗██║██╔══╝  
██████╔╝██║  ██║██║  ██║╚██████╔╝███████╗╚██████╔╝██║ ╚████║███████╗
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
```

### *A Local-First AI Workspace. Forged in Cyberpunk Steel.*

[![Build Status](https://img.shields.io/badge/Build-STABLE-00F0FF.svg?style=for-the-badge&logo=github-actions&logoColor=black)](https://github.com/NikanEidi/DragZone)
[![License: MIT](https://img.shields.io/badge/License-MIT-B026FF.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-1.3.1-FF2E2E.svg?style=for-the-badge)](https://github.com/NikanEidi/DragZone/releases)
[![Ollama](https://img.shields.io/badge/Powered_By-Ollama-00F0FF.svg?style=for-the-badge)](https://ollama.com)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-B026FF.svg?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/Frontend-React_18-00F0FF.svg?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)

<br/>

> **Your data never leaves your machine. Your AI never phones home.**  
> DragZone is a high-immersion, privacy-first workspace where you command a local LLM  
> through a neural-grade interface engineered for developers, researchers, and technical architects.

</div>

---

## ◈ Philosophy: Local-First, Always

DragZone was built on a single, non-negotiable premise: **your data belongs to you.**

Every inference call is routed through [Ollama](https://ollama.com), running entirely on your own hardware. There are no cloud endpoints, no telemetry payloads, no API keys sold to third parties. When you drop a confidential PDF into the interface and ask the Dragon to analyze it, that document never touches the internet. The model, the context, and the output live and die on your encrypted local disk.

This is not a feature — it is the architecture.

---

## ◈ Feature Matrix

| Capability | Implementation | Status |
| :--- | :--- | :---: |
| **Local LLM Inference** | Ollama daemon on `localhost:11434` | ✅ Live |
| **Real-Time Token Streaming** | Server-Sent Events (SSE) via FastAPI | ✅ Live |
| **Vision Analysis** | LLaVA model integration for image-to-text | ✅ Live |
| **Omni-Parser Engine** | PDF, DOCX, XLSX, PPTX, HTML extraction | ✅ Live |
| **60FPS Particle Engine** | HTML5 Canvas, GPU-composited layers | ✅ Live |
| **Liquid Glass UI** | `backdrop-filter: blur(40px)` + layered masks | ✅ Live |
| **PWA / Mobile Install** | `manifest.webmanifest` + service workers | ✅ Live |
| **Drag & Drop Context** | Drop files directly into the chat stream | ✅ Live |
| **Code Frame Injection** | Syntax-highlighted, downloadable code snippets | ✅ Live |
| **Conversation Archives** | Persistent multi-session history | ✅ Live |

---

## ◈ System Architecture

DragZone follows a strict **Modular MVC** pattern split across two isolated services that communicate over a local HTTP bridge.

```
┌─────────────────────────────────────────────────────────────────┐
│                     DRAGZONE — SYSTEM MAP                       │
├──────────────────────────┬──────────────────────────────────────┤
│   NEURAL INTERFACE       │   DRAG ENGINE                        │
│   React 18 + Vite        │   FastAPI + Uvicorn                  │
│   localhost:3000         │   localhost:8000                     │
│                          │                                      │
│  ┌─────────────────┐     │   ┌────────────────────────────┐    │
│  │  App.tsx        │     │   │  /api/chat                 │    │
│  │  (Orchestrator) │─────┼──▶│  SSE stream → Ollama Core  │    │
│  └────────┬────────┘     │   └────────────────────────────┘    │
│           │              │                                      │
│  ┌────────▼────────┐     │   ┌────────────────────────────┐    │
│  │  useChat.ts     │─────┼──▶│  /api/upload               │    │
│  │  (Controller)   │     │   │  Omni-Parser → Context Buf  │    │
│  └────────┬────────┘     │   └────────────────────────────┘    │
│           │              │                                      │
│  ┌────────▼────────┐     │   ┌────────────────────────────┐    │
│  │  ChatArea.tsx   │     │   │  Ollama Daemon             │    │
│  │  (View Layer)   │     │   │  Port 11434 — Local Only   │    │
│  └─────────────────┘     │   └────────────────────────────┘    │
└──────────────────────────┴──────────────────────────────────────┘
```

### DragEngine — Python Backend (`/DragEngine`)

The server is a **FastAPI** application with two primary routes:

- **`POST /api/chat`** — Accepts a message history and optional file context. Streams token output from the local Ollama daemon back to the client via Server-Sent Events. Supports the `dragon-agent` custom Modelfile persona.
- **`POST /api/upload`** — Accepts multipart file uploads. The **Omni-Parser** service dispatches each file to a format-specific extractor (PyPDF, python-docx, pandas, python-pptx, LLaVA) and returns structured Markdown context ready for injection into the LLM's reasoning window.

### Neural Interface — React Frontend (`/src`)

The UI is a **React 18 + Vite** SPA with a strict separation of concerns:

- **Models** — `src/types/chat.ts` defines `Message`, `Conversation`, and `Attachment` interfaces.
- **Controllers** — `src/hooks/useChat.ts` manages the full conversation lifecycle, SSE stream processing, and context state. `src/hooks/useOllama.ts` provides the Ollama connection layer.
- **Views** — `src/components/` is organized by domain: `chat/` for messaging UI, `effects/` for GPU-accelerated visual layers, `layout/` for structural scaffolding, and `ui-custom/` for bespoke branded components.

---

## ◈ Visual Engineering

DragZone's interface is not a skin — it is an engineered visual system with discrete, compositable layers.

### The Layer Stack

Every panel in DragZone renders through a 5-layer compositing system:

```
Layer 5 │ Content                  (z-index: 10, all interactive elements)
Layer 4 │ Top Edge Highlight        (1px gradient line, specular simulation)
Layer 3 │ Inner Stroke              (1px crisp border, rgba accent)
Layer 2 │ Scale Texture Borders     (SVG dragon-scale pattern, neon leakage filter)
Layer 1 │ Outer Glow Border         (135° gradient, box-shadow bloom)
Layer 0 │ Liquid Glass Surface      (blur(40px) + saturate(130%), hardware-scaled)
```

### Signature Components

**`PowerCore`** — A hexagonal rotating badge in the header. Features a conic-gradient spinning ring, an SVG interior with animated energy pulse, and a radial glow aura. Serves as both a brand mark and a system status indicator.

**`DragonGuardian`** — A pinned, parallax-responsive dragon head signature that tracks mouse delta and applies 3D `rotateX`/`rotateY` transforms to the SVG layer stack. Provides the visual identity anchor for the application without interfering with interactive content.

**`GlassFrame`** — A reusable container component implementing the full 5-layer stack described above. Accepts an `accent` hex color prop to tint the entire frame's glow, border, and specular highlight coherently.

**`ParticleField` + `CloudVape`** — Two independent Canvas-based VFX layers running at 60FPS. Particle connections are drawn between proximate nodes; cloud blobs use radial gradients with `screen` blend mode. Both are GPU-composited via `will-change: transform` and `pointer-events: none` to prevent layout interference.

### Color System

```css
--cyan:        #00F0FF   /* Primary action, system-ready, neural link */
--neon-purple: #B026FF   /* Processing state, AI responses, accents    */
--red:         #FF1010   /* Alerts, errors, live indicators            */
```

---

## ◈ Installation & Setup

### Prerequisites

- **Node.js** ≥ 18
- **Python** ≥ 3.10
- **[Ollama](https://ollama.com)** installed and running locally

---

### Step 1 — Pull the AI Model

DragZone ships with a custom `Modelfile` that configures the Dragon's persona, temperature, and context-handling behavior.

```bash
# Pull the base model
ollama pull llama3.1

# Pull the vision model (required for image analysis)
ollama pull llava

# Register the custom Dragon agent
cd DragZone/DragEngine
ollama create dragon-agent -f Modelfile
```

---

### Step 2 — Install Dependencies

**Frontend:**

```bash
# From the project root
npm install
```

**Backend:**

```bash
cd DragEngine
pip install -r requirements.txt
```

The backend requires: `fastapi`, `uvicorn`, `pypdf`, `python-docx`, `pandas`, `openpyxl`, `python-pptx`, `beautifulsoup4`, `ollama`, `reportlab` (for tests).

---

### Step 3 — Launch the Dragon

The unified bootloader handles port cleanup, process orchestration, and LAN IP detection automatically.

```bash
# From the project root — starts both backend and frontend
chmod +x start_dragon.sh
./start_dragon.sh
```

Once running, the engine is accessible at:

| Interface | URL |
| :--- | :--- |
| **Web App** | `http://localhost:3000` |
| **LAN (iPad / Mobile)** | `http://<your-local-ip>:3000` |
| **API Docs** | `http://localhost:8000/docs` |

> To stop all services, press `Ctrl+C`. The bootloader traps `SIGINT` and `SIGTERM` for a clean shutdown.

---

## ◈ PWA — Install as a Native App

DragZone is a fully compliant Progressive Web App. To install it as a standalone application:

1. Open `http://localhost:3000` in **Safari** or **Chrome**.
2. Tap the **Share** icon.
3. Select **"Add to Home Screen"**.

The Cyber Dragon icon will appear on your home screen, launching into a borderless, full-screen experience with no browser chrome.

---

## ◈ Developer Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start Vite dev server on `localhost:3000` |
| `npm run build` | Compile production bundle to `/build` |
| `npm run test:unit` | Run Jest + React Testing Library suite |
| `npm run test:e2e` | Run Cypress end-to-end smoke tests |
| `npm run cypress:open` | Open Cypress interactive test runner |
| `./start_dragon.sh` | Start full stack (backend + frontend) |

### Running Backend Tests

```bash
cd DragEngine
pytest test_main.py -v
```

The test suite covers: PDF upload and text extraction, plain text parsing, image analysis via mocked LLaVA, and full chat endpoint streaming — all using a mock Ollama client to remove external dependencies.

---

## ◈ Project Structure

```
DragZone/
├── DragEngine/                  # FastAPI backend service
│   ├── api/
│   │   └── routers/
│   │       ├── chat.py          # SSE streaming endpoint
│   │       └── upload.py        # File ingestion endpoint
│   ├── core/
│   │   └── llm.py               # Ollama async client
│   ├── services/
│   │   └── parser.py            # Omni-Parser (PDF/DOCX/XLSX/PPTX/Vision)
│   ├── models/
│   │   └── chat.py              # Pydantic request/response models
│   ├── Modelfile                # Dragon agent persona configuration
│   ├── main.py                  # FastAPI app entry point
│   └── test_main.py             # Pytest integration suite
│
├── src/                         # React 18 + Vite frontend
│   ├── components/
│   │   ├── chat/                # ChatArea, MessageBubble, InputBar, etc.
│   │   ├── effects/             # DragonGuardian, ParticleField, CloudVape
│   │   ├── icons/               # DragonBorderSVG, PowerCoreSVG
│   │   ├── layout/              # Header, Sidebar
│   │   ├── ui/                  # shadcn/radix primitives
│   │   └── ui-custom/           # PowerCore, GlassFrame, StatusPill, CloudEngine
│   ├── hooks/
│   │   ├── useChat.ts           # Conversation controller (MVC)
│   │   └── useOllama.ts         # Ollama integration layer
│   ├── types/
│   │   ├── chat.ts              # Message, Conversation, Attachment interfaces
│   │   └── speech.d.ts          # Web Speech API type augmentation
│   ├── styles/
│   │   └── globals.css          # Design tokens, animations, liquid glass
│   └── App.tsx                  # Root orchestrator
│
├── UIcomponents/                # Source design assets (SVG, PNG, sketches)
├── cypress/                     # E2E test specifications
├── public/                      # Static assets, PWA manifest
├── start_dragon.sh              # Unified process bootloader
├── generate_master_readme.py    # Automated README generation utility
└── .github/workflows/main.yml   # CI/CD pipeline (Jest + Cypress)
```

---

## ◈ CI/CD Pipeline

Every push to `main` triggers the GitHub Actions workflow:

1. **Dependency Installation** — `npm install` + `pip install -r requirements.txt`
2. **Production Build** — `vite build` to validate the TypeScript compilation
3. **Unit Tests** — Full Jest + React Testing Library suite
4. **E2E Tests** — Cypress smoke tests via `start-server-and-test`

---

## ◈ Technical Documentation

| Document | Contents |
| :--- | :--- |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | MVC pattern breakdown, VFX strategy, LLM integration detail |
| [`FUNCTION_EXPLAINER.md`](./FUNCTION_EXPLAINER.md) | Hook-by-hook logic reference for `useChat`, `useOllama`, and UI functions |
| [`FOLDER_EXPLAINER.md`](./FOLDER_EXPLAINER.md) | Directory-level responsibility map |
| [`TESTING.md`](./TESTING.md) | Testing strategy, stack overview, and instructions for writing new tests |
| [`CHANGELOG.md`](./CHANGELOG.md) | Full versioned history of feature additions and performance work |
| [`CONTRIBUTING.md`](./CONTRIBUTING.md) | Code standards, PR process, and visual design guidelines |

---

## ◈ License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for full terms.

---

<div align="center">

```
╔══════════════════════════════════════════════════════════╗
║   Designed, Engineered, and Forged by  Nikan Eidi  🐉   ║
║   "The Dragon is always watching."                       ║
╚══════════════════════════════════════════════════════════╝
```

</div>
