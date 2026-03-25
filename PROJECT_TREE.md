# 🌳 Project Tree — DragZone (v1.2.0)

```text
.
├── ARCHITECTURE.md           # MVC & Rendering Strategy
├── CHANGELOG.md               # Release History
├── README.md                  # Main Portal
├── TESTING.md                 # Test Suite Guide
├── DragEngine/                # Local Engine Definitions
│   └── Modelfile              # Ollama Model Configuration
├── public/                    # Static Assets
│   ├── favicon.svg            # Dragon Icon
│   ├── og-image.png           # Website Picture
│   └── manifest.webmanifest   # PWA Config
├── src/                       # Application Source
│   ├── App.tsx                # Main Controller & Layout
│   ├── assets/                # Design Style Assets (SVGs)
│   ├── components/            # View Layer (React Components)
│   │   ├── chat/              # Chat Messaging UI
│   │   ├── effects/           # GPU-Accelerated VFX
│   │   ├── layout/            # Navigation & Sidebar
│   │   └── ui-custom/         # Premium Themed UI
│   ├── hooks/                 # Business Logic (Custom Hooks)
│   │   ├── useChat.ts         # Conversation Management
│   │   └── useOllama.ts       # Engine Integration
│   ├── styles/                # Global Design Tokens
│   └── types/                 # Type Definitions
├── cypress/                   # E2E Testing Suite
├── start_dragon.sh            # Production Launch Script
└── package.json               # Dependecy & Build Config
```
