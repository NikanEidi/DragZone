# CHANGELOG — DRAGZONE 🐉

## [1.2.0] - 2026-03-24
### 🐉 Cyber Dragon — Branding Immersion & UI Finalization
- **High-Fidelity Mascot**: The `DragonGuardian` is now pinned at a refined vertical offset (`28%`) for maximum visibility across all screen sizes.
- **Website Picture & Icons**: 
  - Replaced default favicon with the ultra-premium `dragon-icon.svg`.
  - Generated and integrated a cinematic **OG Image** (`og-image.png`) for high-impact social sharing.
  - Implemented `manifest.webmanifest` for full PWA support (Apple/Android icons).
- **Functional Interface**: Integrated the **PowerCore** and **Status Pills** with a new **System Status Diagnostic Overlay**.
- **Bug Fix — Download Engine**: Resolved the critical "Lost Connection" state by removing blocking `window.prompt` calls.

### 🧩 System Architecture
- **State Resilience**: Integrated `showSystemInfo` and `layoutMode` across the application for stable view transitions on iPad/MacBook.
- **Merge Conflict Resolution**: Restored premium neon-cyan-purple aesthetics across `App.tsx`, `ChatArea.tsx`, and `Sidebar.tsx`.

---

## [1.1.1] - 2026-03-24
### 🧪 Testing & CI/CD
- Integrated **Jest & React Testing Library** for high-performance unit/component testing.
- Configured **Cypress** for end-to-end (E2E) smoke testing.
- Established **GitHub Actions CI/CD Pipeline**.

### 📋 Documentation & Icons
- Added **FUNCTION_EXPLAINER.md**, **FILE_EXPLAINER.md**, **FOLDER_EXPLAINER.md**, and **PROJECT_TREE.md**.
- Created **TESTING.md** and finalized **ARCHITECTURE.md**.

---

*Lead Architect: Nikan Eidi — DragZone Engineering*
