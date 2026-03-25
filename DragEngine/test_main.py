import pytest
from fastapi.testclient import TestClient
from main import app
import io
import json

client = TestClient(app)

class MockOllamaClient:
    async def chat(self, model, messages, stream):
        async def mock_generator():
            yield {'message': {'content': 'Mocked response'}}
        return mock_generator()

    async def generate(self, model, prompt, images, stream=False):
        return {'response': 'Mocked image analysis'}

import core.llm
core.llm.client = MockOllamaClient()

# Also inject into the specific modules if they already imported it
import services.parser
import api.routers.chat
services.parser.client = core.llm.client
api.routers.chat.client = core.llm.client

def test_upload_pdf():
    from reportlab.pdfgen import canvas
    pdf_buffer = io.BytesIO()
    c = canvas.Canvas(pdf_buffer)
    c.drawString(100, 100, "Hello World from Test PDF")
    c.save()
    pdf_buffer.seek(0)
    
    response = client.post(
        "/api/upload",
        files={"files": ("test.pdf", pdf_buffer, "application/pdf")}
    )
    assert response.status_code == 200
    data = response.json()
    assert "context" in data
    assert "[--- START FILE: test.pdf ---]" in data["context"]
    assert "Hello World from Test PDF" in data["context"]

def test_upload_text_file():
    text_content = b"This is a test document."
    response = client.post(
        "/api/upload",
        files={"files": ("test.txt", io.BytesIO(text_content), "text/plain")}
    )
    assert response.status_code == 200
    data = response.json()
    assert "[--- START FILE: test.txt ---]" in data["context"]
    assert "This is a test document." in data["context"]

def test_upload_image():
    img_content = b"GIF89a\x01\x00\x01\x00\x80\x00\x00\xff\xff\xff\x00\x00\x00!\xf9\x04\x01\x00\x00\x00\x00,\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02D\x01\x00;"
    response = client.post(
        "/api/upload",
        files={"files": ("test.png", io.BytesIO(img_content), "image/png")}
    )
    assert response.status_code == 200
    data = response.json()
    assert "[--- START FILE: test.png ---]" in data["context"]
    assert "Mocked image analysis" in data["context"]

def test_chat_endpoint_no_context():
    payload = {
        "messages": [{"role": "user", "content": "Hello"}],
        "context": ""
    }
    response = client.post("/api/chat", json=payload)
    assert response.status_code == 200
    assert "text/event-stream" in response.headers["content-type"]
    assert "Mocked response" in response.text

def test_chat_endpoint_with_context():
    payload = {
        "messages": [{"role": "user", "content": "Analyze this."}],
        "context": "[--- START FILE: data.txt ---]\nSome data\n[--- END FILE ---]"
    }
    response = client.post("/api/chat", json=payload)
    assert response.status_code == 200
    assert "Mocked response" in response.text
