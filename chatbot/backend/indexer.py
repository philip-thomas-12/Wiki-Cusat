import os
import json
import time
import uuid
import chromadb
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables (Make sure you rename .env.example to .env and add your key)
load_dotenv()

def get_embedding_with_retry(text, model="models/gemini-embedding-001", max_retries=3):
    """
    Fetches the embedding for a piece of text using Gemini API with built-in
    retry logic to elegantly handle 429 Rate Limit Errors.
    """
    for attempt in range(max_retries):
        try:
            response = genai.embed_content(
                model=model,
                content=text,
                task_type="retrieval_document"
            )
            return response['embedding']
        except Exception as e:
            if attempt < max_retries - 1:
                wait_time = (attempt + 1) * 5  # Exponential backoff: 5s, 10s...
                print(f"Encountered error (likely rate limit 429). Retrying in {wait_time}s... Error: {e}")
                time.sleep(wait_time)
            else:
                print(f"Failed to get embedding after {max_retries} attempts for text: {text[:50]}...")
                raise e

def main():
    api_key = os.environ.get("GOOGLE_API_KEY")
    if not api_key or api_key == "your_gemini_api_key_here":
        print("ERROR: Please set a valid GOOGLE_API_KEY in your .env file!")
        return

    # Configure Gemini
    genai.configure(api_key=api_key)

    # File paths
    base_dir = os.path.dirname(os.path.abspath(__file__))
    data_path = os.path.join(base_dir, "processed_data", "prospectus_data.json")
    db_path = os.path.join(base_dir, "chroma_db")

    if not os.path.exists(data_path):
        print(f"Error: Could not find parsed chunks at {data_path}")
        return

    # Load JSON chunks
    print("Loading extracted text chunks...")
    with open(data_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    chunks = data["chunks"]
    source_name = data["source"]
    print(f"Loaded {len(chunks)} chunks from {source_name}.")

    # Initialize ChromaDB Persistent Client
    print("Initializing ChromaDB connection...")
    client = chromadb.PersistentClient(path=db_path)
    
    # Create or get the collection
    collection = client.get_or_create_collection(name="cusat_knowledge")

    # BATCHING & RATE LIMIT HANDLING
    batch_size = 20
    total_batches = (len(chunks) + batch_size - 1) // batch_size
    
    print("\nStarting the indexing process...")

    for i in range(0, len(chunks), batch_size):
        batch = chunks[i:i + batch_size]
        
        # UNIQUE ID GENERATION & METADATA
        # Combining source name and a unique hash ensures no collisions
        ids = [f"{source_name}_chunk_{i+j}_{uuid.uuid4().hex[:8]}" for j in range(len(batch))]
        metadatas = [{"source": source_name, "chunk_index": i+j} for j in range(len(batch))]
        
        # Get embeddings with explicit rate-limit spacing
        batch_embeddings = []
        for text in batch:
            embedding = get_embedding_with_retry(text)
            batch_embeddings.append(embedding)
            # A tiny sleep to ensure we don't accidentally bombard the Gemini API 
            # and get a hard rate limit.
            time.sleep(1) 

        # Insert into ChromaDB
        collection.add(
            documents=batch,
            embeddings=batch_embeddings,
            metadatas=metadatas,
            ids=ids
        )
        
        print(f"Indexed batch {i//batch_size + 1} of {total_batches}. Total chunks indexed: {min(i + batch_size, len(chunks))}")

    print("\nSuccess! All document chunks have been embedded and stored in the vector database.")

if __name__ == "__main__":
    main()
