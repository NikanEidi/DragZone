---

## [1.2.0] - 2026-03-24
### 🐉 Cyber Dragon UI/UX Finalization
- **Titan Mascot Integration**: Added a high-fidelity, high-visibility static Dragon Guardian signature to the header.
- **Visual Surgery**: Removed all "ghosting" effects and blurs to restore 100% crispness to signature branding.
- **Dynamic Connection Sync**: Integrated all header, sidebar, and chat-area status pills with a functional **System Status Overlay**.
- **User Action Overhaul**: Re-engineered all header and context-menu buttons (Copy, Download, New Session, Trash) with robust error handling and tactile feedback.
- **Bug Fix — Download Engine**: Resolved a critical "Lost Connection" state caused by blocking `window.prompt` calls during document downloads.

## [1.1.1] - 2026-03-24
### 🧪 Testing & CI/CD
- Integrated **Jest & React Testing Library** for high-performance unit/component testing.
- Configured **Cypress** for end-to-end (E2E) smoke testing.
- Established **GitHub Actions CI/CD Pipeline** for automated PR validation.
- Added **TypeScript configuration** (`tsconfig.json`/`tsconfig.node.json`) for full IDE/Compiler parity.

### 📋 Documentation & Icons
- Integrated **Dragon Head SVG** icon into the README for brand identity.
- Added **FUNCTION_EXPLAINER.md**, **FILE_EXPLAINER.md**, **FOLDER_EXPLAINER.md**, and **PROJECT_TREE.md**.
- Created **TESTING.md** for developer onboarding.
- Moved **ARCHITECTURE.md** to the project root for consistency.

---

*Lead Architect: Nikan Eidi*
