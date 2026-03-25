# ⚙️ Function Explainer — DragZone (v1.2.0)

Key functions and logic flows within the DragZone architecture.

### 🗨️ Chat & Conversation Logic (`useChat.ts`)
- **`sendMessage(content: string)`**: Validates user input, generates a unique message ID, and triggers the AI response cycle via `useOllama`.
- **`newConversation()`**: Resets the active conversation state and clears context buffers.
- **`deleteConversation(id: string)`**: Safely removes a conversation from state and updates the UI selection.
- **`setActiveId(id: string)`**: Orchestrates the transition between sessions.

### 🤖 LLM Integration (`useOllama.ts`)
- **`generate(prompt, context)`**: Formats the user prompt and history for the Ollama API, establishing a POST stream.
- **`processStream(reader)`**: Handles real-time text chunk processing for the "AI typing" effect. Runs incrementally to avoid UI blocking.

### ✨ Visual Effects & UI Logic
- **`handleSystemInfo()` (`App.tsx`)**: Triggers the **PowerCore Diagnostic Overlay**, providing real-time system telemetry.
- **`downloadSnippet(code, language)` (`MessageBubble.tsx`)**: A non-blocking file generator that allows users to instantly save AI-generated code snippets to their local machine.
- **`toggleSidebar()`**: Manages the `sidebarCollapsed` state with spring-based animations.
- **`toggleMax()`**: Switches between standard and full-screen modes, adjusting the `isMax` state across the layout.

### 📦 Document Parsing (Omni-Parser)
- **`handleDrop(files)` (`ChatArea.tsx`)**: The entry point for Drag & Drop files. Dispatches files to specialized parsers (PDF, XLSX, CSV).
- **`parseDocument(file)`**: Extracts text data and metadata for injection into the AI's short-term memory (context).
