# 📂 Project Tree (v1.1.3 - Tag 3)

```text
DragZone/
├── .github/             # GitHub Actions Workflows
│   └── workflows/
│       └── main.yml     # CI/CD Pipeline
├── .gemini/             # AI Assistant Configuration
├── cypress/             # E2E Testing Suite
│   └── e2e/
│       └── smoke.cy.ts  # Smoke Tests
├── public/              # Static Assets (Logo, Favicon)
├── src/                 # Source Code
│   ├── components/      # UI Layer (Views)
│   │   ├── chat/        # Chat Bubbles, Message Lists
│   │   ├── effects/     # VFX, Canvases, 3D Branded Elements
│   │   ├── layout/      # App Shell, Header, Sidebar
│   │   ├── ui/          # Atomic Base Components
│   │   └── ui-custom/   # Premium Branded Components
│   ├── hooks/           # Logic Layer (Controllers)
│   │   ├── useChat.ts   # Chat State & Message Logic
│   │   └── useOllama.ts # LLM Stream Integration
│   ├── types/           # Interface Definitions (Models)
│   ├── styles/          # Design System (Tailwind/CSS)
│   ├── App.tsx          # Root Component Composition
│   ├── App.test.tsx     # Root Component Unit Test
│   └── main.tsx         # React Main Entry
├── UIcomponents/        # Design Assets & Ultra High-Res Graphics
│   ├── Frame/           # Border & Shell Graphics
│   └── Icon.svg         # Dragon Head Branded Icon
├── start_dragon.sh      # Unified Bootloader (Frontend + Backend)
├── DragEngine/          # FastAPI Omni-Parser Backend
│   ├── main.py          # FastAPI Entry Point
│   ├── requirements.txt # Backend Dependencies
│   ├── api/             # API Router Layer
│   │   └── routers/
│   │       ├── chat.py   # Streaming Chat Router
│   │       └── upload.py # Multi-Modal Upload Router
│   ├── services/        # Logic Layer
│   │   └── parser.py    # Omni-Parser Implementation
│   ├── core/            # Config & Infrastructure
│   │   └── llm.py       # Ollama Client Singleton
│   ├── models/          # Data Schemas
│   │   └── chat.py      # Pydantic Chat Models
│   └── test_main.py     # Backend Unit Tests
├── README.md            # Modern Documentation Hub
├── ARCHITECTURE.md      # Engineering Deep-Dive
├── CHANGELOG.md         # Version Tracking (v1.1.1)
├── CONTRIBUTING.md      # Development Standards
├── FILE_EXPLAINER.md    # Guide to Key Files
├── FOLDER_EXPLAINER.md  # Directory Structure Guide
├── FUNCTION_EXPLAINER.md# Documentation of Core Logic
├── TESTING.md           # Testing Methodology
├── cypress.config.ts    # Cypress Configuration
├── jest.config.cjs      # Jest Configuration
├── jest.setup.ts        # Jest Environment Setup
├── tsconfig.json        # TypeScript Project Config
├── tsconfig.node.json   # TypeScript Node Config
├── tsconfig.jest.json   # TypeScript Jest Override
└── LICENSE              # MIT License (Nikan Eidi)
```
