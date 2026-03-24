# ⚙️ Function Explainer

Key functions and logic flows within the DragZoneAI architecture.

### 🗨️ Chat & Conversation Logic (`useChat.ts`)
- **`sendMessage(content: string)`**:
  - Validates user input.
  - Generates a unique message ID and updates the local conversation state.
  - Triggers the AI response cycle (connecting to `useOllama`).
- **`newConversation()`**:
  - Resets the active conversation state.
  - Clears context buffers while maintaining history for quick switching.
- **`deleteConversation(id: string)`**:
  - Safely removes a conversation from persistent storage and updates the UI selection.
- **`setActiveId(id: string)`**:
  - Orchestrates the transition between conversations, including UI focus and state loading.

### 🤖 LLM Integration (`useOllama.ts`)
- **`generateResponse(prompt: string, context: any[])`**:
  - Formats user prompt and history for the Ollama API.
  - Opens an HTTP POST stream to `localhost:11434`.
- **`processStream(reader: ReadableStream)`**:
  - Handles real-time text chunk processing for that "AI typing" effect.
  - Manages JSON parsing and partial response accumulation.

### ✨ Visual Effects Logic (`effects/`)
- **`drawParticles()` (`ParticleField.tsx`)**:
  - High-frequency canvas clear and redraw cycle optimized for minimal JS heap impact.
- **`handleParallax(e: MouseEvent)` (`DragonGuardian.tsx`)**:
  - Maps 2D screen coordinates to limited 3-axis rotation degree values for the dragon head.
- **`animateCloudLoop()` (`CloudVape.tsx`)**:
  - Perlin-noise based movement logic for ambient smoke particles.
