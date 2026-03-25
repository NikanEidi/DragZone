from typing import List
from fastapi import APIRouter, UploadFile, File
from services.parser import parse_file

router = APIRouter()

@router.post("/upload")
async def upload_files(files: List[UploadFile] = File(...)):
    combined_context = ""
    for file in files:
        combined_context += await parse_file(file)
    return {"context": combined_context}
