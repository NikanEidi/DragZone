import ollama
import os

client = ollama.AsyncClient(host=os.getenv("OLLAMA_HOST", "http://localhost:11434"))
