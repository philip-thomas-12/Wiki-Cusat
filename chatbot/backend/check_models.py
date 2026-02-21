from dotenv import load_dotenv
import os
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.environ.get('GOOGLE_API_KEY'))
try:
    models = genai.list_models()
    for m in models:
        print(m.name, m.supported_generation_methods)
except Exception as e:
    print(f"Error: {e}")
