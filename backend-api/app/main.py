from fastapi import FastAPI
from app.routers import client_routes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(client_routes.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)