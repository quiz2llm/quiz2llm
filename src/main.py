from fastapi import FastAPI
from src.app.controller import router

app = FastAPI()
app.include_router(router)