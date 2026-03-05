import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import requests
import urllib3
from dotenv import load_dotenv

load_dotenv()
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

app = FastAPI()

# Enable CORS since the frontend will be served independently or just as static files
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

NASA_API_KEY = os.getenv("NASA_API_KEY")

@app.get("/api/apod")
def get_apod(date: str):
    if not NASA_API_KEY:
        raise HTTPException(status_code=500, detail="NASA_API_KEY is not configured on the server.")
    
    url = "https://api.nasa.gov/planetary/apod"
    params = {
        "api_key": NASA_API_KEY,
        "date": date
    }
    
    try:
        response = requests.get(url, params=params, verify=False)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as err:
        if response.status_code == 429:
            raise HTTPException(status_code=429, detail="A cota de acessos da API da NASA foi excedida para a chave atual. Por favor, tente novamente mais tarde.")
        raise HTTPException(status_code=response.status_code, detail=str(err))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Mount frontend at root to serve index.html and all static assets correctly
app.mount("/", StaticFiles(directory="../Frontend", html=True), name="frontend")
