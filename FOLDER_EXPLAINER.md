# 📂 Folder Explainer — DragZone (v1.2.0)

Detailed breakdown of the directory structure.

### 📁 `src/`
The core of the application logic and UI.
- **`components/`**: React components organized by responsibility.
  - **`chat/`**: UI elements for the chat interface (bubbles, inputs, scroll areas).
  - **`effects/`**: High-performance visual effects (DragonGuardian, ParticleField).
  - **`layout/`**: Structural components like the Header, Sidebar, and App Shell.
  - **`ui/`**: Generic, low-level UI primitives from the shadcn ecosystem.
  - **`ui-custom/`**: Brand-specific modules like the "PowerCore" diagnostic tool.
- **`hooks/`**: Custom React hooks handling business logic (The "Controllers" in MVC).
- **`types/`**: TypeScript interfaces for unified data modeling (The "Models" in MVC).
- **`styles/`**: Global CSS files and Tailwind transformations.

### 📁 `public/`
Static assets served directly by the web server.
- Contains the officially branded **Favicon** and **OG Image**.
- Hosting the `manifest.webmanifest` for PWA functionality.

### 📁 `DragEngine/`
Configuration folder for the internal Ollama modeling system.
- Includes the `Modelfile` for local engine tuning.

### 📁 `cypress/`
Main end-to-end (E2E) testing suite for platform stability.
