# 📄 File Explainer

Key files in the DragZoneAI project and their responsibilities.

### 🏗️ Core Application
- **`src/App.tsx`**: The main orchestrator. It composes the layout, initializes global background effects, and connects the chat controller to the UI.
- **`src/main.tsx`**: React entry point that renders the application into the DOM.
- **`index.html`**: The single-page application host. Includes essential meta tags for performance and theme.

### 🧠 Logic & Controllers
- **`src/hooks/useChat.ts`**: The primary state engine for the chat experience. Manages conversation history, active states, and message dispatching.
- **`src/hooks/useOllama.ts`**: Integration layer for local LLMs via Ollama. Handles HTTP streaming and error states.

### 🎨 Visual & UI
- **`src/components/effects/CloudVape.tsx`**: A Canvas-based smoke simulation for high-performance background ambiance.
- **`src/components/effects/ParticleField.tsx`**: A dynamic particle system providing depth and motion to the interface.
- **`src/components/effects/DragonGuardian.tsx`**: The signature 3D parallax dragon head effect that tracks user interaction.
- **`src/styles/globals.css`**: Contains the design system tokens, Tailwind directives, and "Liquid Glass" animation definitions.

### ⚙️ Configuration
- **`vite.config.ts`**: Build configuration optimized for React and CSS-heavy applications.
- **`package.json`**: Project metadata, dependency lists, and development scripts.
- **`.gitignore`**: Rules for excluding build artifacts and IDE meta-data from version control.
