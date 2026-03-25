# 🏗️ DragZone Architecture Documentation (v1.2.0)

**Author:** Nikan Eidi  
**Application:** DragZone — AI Cyber-Engine

## 📋 Overview

DragZone is a high-immersion AI chat application built on a **Strict Modular MVC (Model-View-Controller)** pattern. This architectural choice ensures deep maintainability, scalability, and clean integration with local LLM models (e.g., Ollama).

---

## 🏛️ MVC Layers

### 1. Models (State & Data)
- **Typed Interfaces**: `src/types/chat.ts` defines the core data structures (`Message`, `Conversation`, `Attachment`).
- **Data Fetching**: Custom hooks (`useChat.ts`, `useOllama.ts`) act as the transient data store and API handlers.

### 2. Views (UI & Rendering)
- **Atomic Components**: `src/components/chat/` handles input and message rendering.
- **VFX Layers**: `src/components/effects/` manages GPU-accelerated atmospheric effects.
- **Themed UI**: `src/components/ui-custom/` provides the "Liquid Glass" and "PowerCore" interactive components.

### 3. Controllers (Business Logic)
- **Central Intelligence**: `src/App.tsx` orchestrates global state, including `layoutMode`, `sidebarCollapsed`, and `showSystemInfo`.
- **Logic Hooks**: `useChat.ts` manages the conversation lifecycle and message dispatching.

---

## 🏎️ Performance & VFX Strategy

To maintain **60FPS** across all devices (MacBook, iPad, Mobile):

- **GPU Offloading**: Uses `translate3d(0, 0, 0)` and `will-change` to force layer compositing for high-fidelity assets like the `DragonGuardian`.
- **Fluid Layout**: Extensively uses CSS `clamp()` and relative units to minimize layout shifts (CLS) across viewports.
- **Asset Optimization**: High-fidelity SVGs are used for branding signatures to ensure crispness at any resolution.

---

## 🤖 LLM Integration

The architecture is built for **Ollama** (Local AI):
- **Endpoint**: Connects to `localhost:11434`.
- **Streaming**: Incremental text streaming into the `useChat` controller for real-time responsiveness.
- **Context Injection**: Dedicated Omni-Parser layer for injecting PDF, CSV, and image data into the AI's reasoning engine.

---

## 🎨 Branding Immersion

- **Signature Mascot**: A high-fidelity, pinned `DragonGuardian` component provides the visual anchor for the brand.
- **Web Identity**: Integrated `favicon.svg`, `og-image.png`, and `manifest.webmanifest` for a professional, platform-native feel.

---

*Last Updated: 2026-03-24*
