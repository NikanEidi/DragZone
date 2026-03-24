# Cyber Dragon Agent UI

![Version](https://img.shields.io/badge/version-1.0.0-00F3FF.svg)
![React](https://img.shields.io/badge/React-18.x-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-Custom-A020F0.svg)

## 🐉 Overview
The **Cyber Dragon Agent UI** is a highly modular, production-grade foundational shell designed for a Multimodal AI Web Application. It embraces a strict "Japanese Cyberpunk meets Dark Fantasy" aesthetic, featuring premium matte charcoal leather backgrounds, pixelated terminals, and aggressive electric neon violet/cyan gradients.

This repository provides the **Outer Shell, State Handlers, and UI Wrappers**. 
**NOTE:** It intentionally *does not* include a chatbox or messaging interface. It is architected to allow you to seamlessly inject your custom chatbox into the main content slot.

## 🏗 High-Level Architecture
This frontend is strictly typed and architected to interface seamlessly with a **Python/FastAPI** backend, routing agentic tasks to local or remote LLMs (e.g., Ollama, Gemma).

*   **View Layer:** React 18 functional components with strict modularity.
*   **Styling:** Tailwind CSS with custom JIT arbitrary values for precise neon glow effects.
*   **State Management:** Decoupled custom React Hooks (`useDragonAgent`) prepared for async API operations, WebSockets, and file chunking.
*   **Asset Management:** SVG-driven layout architecture (Pillars, Frames, Buttons).

## 🖼 Asset Integration Guide
The UI relies on specific SVG assets. In the code, these are abstracted within `src/components/assets/DragonAssets.tsx`. 

To integrate your actual SVGs:
1. Place your provided SVGs (`Layer 1.svg`, `LeftS.svg`, `Rights.svg`, `DOWN Left to right.svg`, `Current Screen.svg`, `Vectorize10.svg`, `Drag.svg`) into your project's `/public/assets/` directory.
2. Open `src/components/assets/DragonAssets.tsx`.
3. Replace the placeholder rendering logic with actual `<img src="/assets/YourSVG.svg" />` tags or inline them directly. The components are already pre-wired to the correct layout positions and CSS classes.

| Component | Target SVG | Purpose |
| :--- | :--- | :--- |
| `DragonHead` | `Layer 1.svg` | Absolute top-right guardian entity. Pulsing violet drop-shadow. |
| `LeftPillar` | `LeftS.svg` | Structural left border of the main shell. |
| `RightPillar` | `Rights.svg` | Structural right border of the main shell. |
| `BottomFrame`| `DOWN Left to right.svg`| Bottom structural frame. |
| `ScreenFrame`| `Current Screen.svg` | Primary backdrop for the central UI area. |
| `CoreScale` | `Vectorize10.svg` | Top-left logo. Features CSS breathing animations. |
| `DragWrapper`| `Drag.svg` | Wraps all action buttons. Shifts Violet -> Cyan on hover. |

## 🚀 Setup & Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env.local` file to map to your FastAPI backend:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   VITE_WS_BASE_URL=ws://localhost:8000/ws
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🔌 How to Inject the Chatbox
The master layout is exposed via `CyberDragonLayout`. It is designed to act as a wrapper.

```tsx
import { CyberDragonLayout } from "./components/layout/CyberDragonLayout";
import { MyCustomChatbox } from "./components/MyCustomChatbox";

function App() {
  return (
    <CyberDragonLayout>
      {/* 
        Inject your pre-built messaging UI here. 
        It will be automatically constrained by the Cyber Dragon Screen Frame. 
      */}
      <MyCustomChatbox />
    </CyberDragonLayout>
  );
}
```

## 📡 Backend Integration (`useDragonAgent.ts`)
The `useDragonAgent` hook is your bridge to FastAPI. It manages:
*   `status`: 'idle' | 'analyzing' | 'generating' | 'error'
*   `activeContextFiles`: Tracks uploaded PDFs, code, and images.
*   `triggerAgentCommand()`: A generic dispatcher for specific agentic workflows (e.g., `#workflow`, `#quiz`).

---
*Forged in the Neon Glow. Ready for Deployment.*