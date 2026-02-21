from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import chromadb
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="CUSAT Chatbot API")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

# Config Gemini
api_key = os.environ.get("GOOGLE_API_KEY")
if api_key and api_key != "your_gemini_api_key_here":
    genai.configure(api_key=api_key)

# Database path
base_dir = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(base_dir, "chroma_db")

# Create a generation model instance
generation_model = None
if api_key:
    generation_model = genai.GenerativeModel("models/gemini-2.5-flash")

def get_query_embedding(text):
    try:
        response = genai.embed_content(
            model="models/gemini-embedding-001",
            content=text,
            task_type="retrieval_query"
        )
        return response['embedding']
    except Exception as e:
        print(f"Embedding error: {e}")
        return None

@app.get("/")
async def root():
    return {"message": "CUSAT Chatbot API is running"}

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if not api_key:
        raise HTTPException(status_code=500, detail="Gemini API Key missing")
        
    user_query = request.message
    
    # 1. Embed query to search Vector DB
    query_embedding = get_query_embedding(user_query)
    
    if not query_embedding:
        return ChatResponse(reply="I encountered an error understanding your query. Please try again.")
    
    # 2. Search Vector DB
    try:
        client = chromadb.PersistentClient(path=db_path)
        collection = client.get_or_create_collection(name="cusat_knowledge")
        
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=5  # Get top 5 most relevant chunks
        )
        
        # Extract passages matching the query
        context_passages = []
        if results and 'documents' in results and len(results['documents']) > 0:
            context_passages = results['documents'][0]
            
        context_text = "\n\n---\n\n".join(context_passages)
    except Exception as e:
        print(f"ChromaDB error: {e}")
        context_text = ""
    
    # 3. Create prompt
    prompt = f"""
You are the 'Ultimate CUSAT Guide', a knowledgeable and helpful intelligent assistant for Cochin University of Science and Technology (CUSAT).
You have been provided with the following context from CUSAT's official prospectus and documents.

Context:
{context_text}

User Question: {user_query}

Instructions:
1. Answer the user's question accurately using ONLY the information provided in the context.
2. If the user asks for help with networking or finding project partners/professors, acknowledge that we are currently building the project registry, but provide any relevant info if found in the context.
3. If the answer is not in the context, politely inform the user that you don't have that specific information yet and they might want to check the official website if it's very specific.
4. Keep the response friendly, highly readable, and well-structured using Markdown formatting.
"""
    
    # 4. Generate Response
    try:
        response = generation_model.generate_content(prompt)
        reply = response.text
    except Exception as e:
        reply = f"Sorry, I encountered an error while generating the response: {str(e)}"
        
    return ChatResponse(reply=reply)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
