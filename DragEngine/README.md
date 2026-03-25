# DragEngine: Enterprise Omni-Parser Backend

## Overview
**DragEngine** is a fully modularized, high-performance Python FastAPI backend that serves as the "brain" for the DragZone ecosystem. It handles multi-modal data synthesis, enabling the AI to reason over a vast variety of file types instantly.

## Architecture Let-down
The engine is structured for enterprise scalability:
- `api/routers/`: Stores endpoint definitions for decoupled logic.
- `services/parser.py`: The `Omni-Parser` logic that handles file interpretation.
- `core/llm.py`: Global state management for `ollama.AsyncClient()`.
- `models/chat.py`: Type-safe Pydantic definitions syncing with TypeScript.

## Supported Modalities (Omni-Parser)
- **PDF**: Automatic text extraction via `pypdf`.
- **Word/PowerPoint**: Slides and paragraphs parsing via `python-docx` and `python-pptx`.
- **Excel/CSV**: Large-scale tabular analysis via `pandas`, converting rows into LLM-friendly Markdown Tables.
- **HTML**: Clean text stripping via `BeautifulSoup`.
- **Image Intelligence**: Direct routing to local `LLaVA` models to describe architecture, flows, and scenes.
- **Source Code**: UTF-8 fallback rendering.

## Dragon Protocol (SSE)
It uses a highly optimized `StreamingResponse` asynchronous generator that pipes tokens directly into the React UI at superhuman speeds.

## Installation
Ensure you are in the `DragEngine` directory:
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Running
Use the unified wrapper from the root of the project:
```bash
cd ..
./start_dragon.sh
```

## Testing
The logic is fully tested via mocked assertions. Run:
```bash
pytest test_main.py
```
This ensures the API handlers execute perfectly isolated from the AI provider.
