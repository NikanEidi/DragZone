# 📄 File Explainer — DragZone (v1.2.0)

Key files in the DragZone project and their responsibilities.

### 🏗️ Core Application
- **`src/App.tsx`**: The main orchestrator. It composes the layout, initializes global background effects, and connects the chat controller to the UI.
- **`index.html`**: The single-page application host. Updated with premium branding (favicon, OG image).
- **`start_dragon.sh`**: The official production launch script for the Cyber Dragon engine.

### 🧠 Logic & Controllers
- **`src/hooks/useChat.ts`**: The primary state engine for the chat experience. Manages conversation history, active states, and message dispatching.
- **`src/hooks/useOllama.ts`**: Integration layer for local LLMs via Ollama. Handles generation streams.

### 🎨 Visual & UI
- **`src/components/effects/DragonGuardian.tsx`**: The high-fidelity branding signature component.
- **`src/components/ui/`**: Base UI elements (buttons, inputs) from the shadcn/radix ecosystem.
- **`src/components/ui-custom/`**: Bespoke DragZone components like `PowerCore.tsx` and `StatusPill.tsx`.

### ⚙️ Configuration
- **`public/manifest.webmanifest`**: Enables PWA (Progressive Web App) features and home-screen icons.
- **`public/og-image.png`**: The cinematic "Website Picture" for social sharing.
- **`package.json`**: Project metadata. Current Version: **1.2.0**.
