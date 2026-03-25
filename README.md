# <img src="UIcomponents/Frame/Icon.svg" width="48" height="48" valign="middle" /> DragZone AI Assistant (v1.1.3 - Tag 3)

[![CI/CD Testing Pipeline](https://github.com/NikanEidi/DragZone/actions/workflows/main.yml/badge.svg)](https://github.com/NikanEidi/DragZone/actions)
![UI Version](https://img.shields.io/badge/UI_Status-Backend_Ready-00F0FF?style=for-the-badge&logo=react&labelColor=1a1a2e)
![Testing](https://img.shields.io/badge/Tests-Pass-B026FF?style=for-the-badge&logo=jest)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
---

## 🐉 The Vision
**DragZone** is an enterprise-grade, multi-modal AI ecosystem built for speed, beauty, and absolute data synthesis. It combines a high-fidelity **Cyberpunk React Architecture** with a modular **FastAPI Omni-Parser Engine**, designed to analyze everything from PDFs and Spreadsheets to live Image feeds and source code.

---

## 🚀 Unified Startup (Quick Start)

The entire ecosystem (Frontend + Backend) can now be launched with a single command:

```bash
# 1. Clone & Enter
git clone https://github.com/NikanEidi/DragZone.git
cd DragZone

# 2. Setup (If first time)
npm install
pip install -r DragEngine/requirements.txt

# 3. IGNITE THE DRAGON
./start_dragon.sh
```

> [!TIP]
> The `start_dragon.sh` script manages all child processes. Pressing **Ctrl+C** will gracefully kill both the FastAPI engine and the Vite server, preventing ghost processes.

---

## 🧠 DragEngine: The Omni-Parser

Located in `/DragEngine`, this modular Python service powers the heavy lifting:

- **PDF Synthesis**: High-fidelity text extraction via `pypdf`.
- **Office Suite**: Full support for `.docx` (Word), `.pptx` (PowerPoint), and `.xlsx` (Excel).
- **Data Tables**: Spreadsheets are parsed into Markdown tables, allowing the AI to reason over tabular data perfectly.
- **Vision Feed**: Integrated **LLaVA** support for technical image description.
- **SSE Streaming**: Server-Sent Events deliver AI responses in real-time with a typewriter effect.

---

## 📱 Multi-Device Excellence & Apple Pencil

DragZone is optimized for the professional mobile workspace:

- **iPad Air / Pro Ready**: Precision touch targets (44x44px) and native touch event handling for the **Apple Pencil**.
- **Responsive Fluidity**: Uses CSS `clamp()` and isolated Canvas rendering to maintain 60FPS on high-refresh mobile displays.
- **Liquid Glass UI**: Multi-layered SVG frames and recursive scale animations that adapt perfectly to MacBook 14" or iPad Portrait layouts.

---

## 🧪 Testing Infrastructure

We maintain 100% green coverage across the stack:

| Layer | Environment | Command |
| :--- | :--- | :--- |
| **Frontend** | Jest + RTL | `npm run test:unit` |
| **Backend** | Pytest | `cd DragEngine && pytest` |
| **Pipeline** | GitHub Actions | Automatic on `main` push |

---

## 📂 Architecture Overview

```text
DragZone/
├── start_dragon.sh      # Unified Bootloader
├── src/                 # React Frontend (Vite + TS)
│   ├── components/      # Glassmorphic UI & VFX
│   ├── hooks/           # AI Controllers (useChat)
├── DragEngine/          # FastAPI Engine (Python)
│   ├── api/routers/     # Modular Endpoints
│   ├── services/        # Omni-Parser Logic
│   ├── core/            # LLM Proxy Client
├── UIcomponents/        # UHD Source Assets
└── .github/workflows/   # CI/CD (Node + Python)
```

---

## 👨‍💻 Author
**Nikan Eidi**  
*Principal Architect & UI Designer*

---

## 📜 License
MIT License - 2026 DragZone Protocol.