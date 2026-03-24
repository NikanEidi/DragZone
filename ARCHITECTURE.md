# 🏗️ DragZoneAI Architecture Documentation (Tag 3 - UI Complete)

**Author:** Nikan Eidi  
**Application:** DragZoneAI (Copy)

## 📋 Overview

DragZoneAI is a high-immersion AI chat application built on a **Strict Modular MVC (Model-View-Controller)** pattern. This architectural choice was made to ensure deep maintainability, scalability, and clean integration with local LLM models (e.g., Ollama).

---

## 🏛️ MVC Layers

### 1. Models (State & Data)
- **File**: `src/types/chat.ts`
- **Responsibility**: Defines the core data structures used throughout the application, including `Message`, `Conversation`, `Attachment`, and `ChatStatus`.
- **Implementation**: Local state managers (React `useState` within custom hooks) act as the transient data store before connecting to persistent layers.

### 2. Views (UI & Rendering)
- **File**: `src/components/`
- **Responsibility**: The presentation layer, divided into highly atomic modules.
- **Key Modules**:
  - `chat/`: Input bars, bubble systems, and typing indicators.
  - `layout/`: Global structure including the Cyber Sidebar and Responsive Header.
  - `effects/`: Specialized visual effect layers (VFX) that provide the "Cyberpunk-Dragon" immersion.
  - `ui/` & `ui-custom/`: Themed wrappers like `GlassFrame.tsx`, `PowerCore.tsx`, and `StatusPill.tsx`.

### 3. Controllers (Business Logic)
- **File**: `src/hooks/`
- **Responsibility**: Orchestrating application state, handling user input, and managing external API calls.
- **Key Hooks**:
  - `useChat.ts`: Main controller for managing conversations and message dispatching.
  - `useOllama.ts`: Controller stub pre-architected to handle future fetch streams to a local Ollama endpoint.

---

## 🏎️ Performance & VFX Strategy

To maintain **60FPS even on tablet hardware** (e.g., iPad Mini), the project employs several specialized techniques:

- **Isolated Canvas Layers**: Complex animations like `CloudVape` and `ParticleField` use `requestAnimationFrame` on an isolated HTML5 Canvas. This prevents expensive DOM repaints by keeping visual noise off the main thread.
- **GPU-Centric CSS**: Animations for `DragonGuardian` and the input system use `translate3d(0, 0, 0)` and `will-change` properties to force GPU layer compositing.
- **Fluid Layout Engine**: The application relies extensively on CSS `clamp()` and relative units (vh, vw, rem). This allows the UI to scale seamlessly across device sizes without relying on heavy media query breakpoints.

---

## 🤖 LLM Integration Plan

The architecture is built with **Ollama** in mind. The `useOllama` hook is designed to:
- Establish a connection to the local Ollama HTTP endpoint (default `localhost:11434`).
- Stream generated text chunks incrementally into the `useChat` controller.
- Handle metadata and context injection for themed "Dragon Protocol" responses.

---

## 🎨 Design System

DragZoneAI implements a custom design system centered around:
- **Translucency**: 30px Backdrop blurring + high-contrast text.
- **Tactility**: Custom SVG "Dragon Leather" textures overlays.
- **Responsive Borders**: Frame assets dynamically adjusted based on viewport dimensions.

---

*Last Updated: 2026-03-24*
