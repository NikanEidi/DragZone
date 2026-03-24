# 📂 Folder Explainer (v1.1.3 - Tag 3)

Detailed breakdown of the directory structure of DragZoneAI.

### 📁 `src/`
The core of the application logic and UI.
- **`src/components/`**: React components organized by responsibility.
  - **`chat/`**: UI elements for the chat interface (bubbles, inputs, scroll areas).
  - **`effects/`**: High-performance visual effects using HTML5 Canvas or complex CSS animations.
  - **`layout/`**: Structural components like the Header, Sidebar, and App Shell.
  - **`ui/`**: Generic, low-level UI primitives (buttons, inputs, dialogs).
  - **`ui-custom/`**: Brand-specific, complex UI modules like the "PowerCore" or "GlassFrame".
- **`src/hooks/`**: Custom React hooks handling business logic, API calls, and state management (The "Controllers" in MVC).
- **`src/types/`**: TypeScript interfaces and types for unified data modeling (The "Models" in MVC).
- **`src/styles/`**: Global CSS files and Tailwind transformations.

### 📁 `UIcomponents/`
A repository of high-fidelity design assets.
- Contains massive SVG and PNG assets derived from original Figma designs.
- Includes frame borders, background textures, and brand icons like the dragon head.

### 📁 `public/`
Static assets served directly by the web server.

### 📁 `.gemini/`
Configuration and logic for agentic AI assistance behavior.
