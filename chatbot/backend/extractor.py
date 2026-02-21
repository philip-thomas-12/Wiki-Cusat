import os
import json
from pypdf import PdfReader
from langchain_text_splitters import RecursiveCharacterTextSplitter

def extract_text_from_pdf(pdf_path):
    print(f"Extracting text from {pdf_path}...")
    reader = PdfReader(pdf_path)
    full_text = ""
    for page in reader.pages:
        full_text += page.extract_text() + "\n"
    return full_text

def chunk_text(text, chunk_size=1000, chunk_overlap=200):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        length_function=len,
    )
    chunks = text_splitter.split_text(text)
    return chunks

def main():
    # Path to the prospectus in the parent project's data folder
    base_dir = os.path.dirname(os.path.abspath(__file__))
    pdf_path = os.path.abspath(os.path.join(base_dir, "..", "data", "Prospectus2026.pdf"))
    output_dir = os.path.join(base_dir, "processed_data")
    os.makedirs(output_dir, exist_ok=True)
    
    if not os.path.exists(pdf_path):
        print(f"Error: Prospectus not found at {pdf_path}")
        return

    text = extract_text_from_pdf(pdf_path)
    chunks = chunk_text(text)
    
    data = {
        "source": "Prospectus2026.pdf",
        "chunks": chunks
    }
    
    output_path = os.path.join(output_dir, "prospectus_data.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)
        
    print(f"Successfully extracted {len(chunks)} chunks and saved to {output_path}")

if __name__ == "__main__":
    main()
