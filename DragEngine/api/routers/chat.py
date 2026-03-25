from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from models.chat import ChatRequest
from core.llm import client

router = APIRouter()

@router.post("/chat")
async def chat_endpoint(request: ChatRequest):
    messages = [{"role": m.role, "content": m.content} for m in request.messages]
    
    if request.context and messages and messages[-1]["role"] == "user":
        latest_message = messages[-1]["content"]
        messages[-1]["content"] = f"CONTEXT PROVIDED:\n{request.context}\n\nUSER PROMPT: {latest_message}"

    async def generate_chunks():
        try:
            response = await client.chat(
                model='dragon-agent',
                messages=messages,
                stream=True,
            )
            async for chunk in response:
                content = chunk['message']['content']
                if content:
                    yield content
        except Exception as e:
            yield f"\n\n[DRAGON ENGINE OFFLINE]: {str(e)}\n"

    return StreamingResponse(generate_chunks(), media_type="text/event-stream")
