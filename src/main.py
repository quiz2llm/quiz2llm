from fastapi import FastAPI
from fastapi.security import OAuth2PasswordBearer

from fastapi.middleware.cors import CORSMiddleware
from src.app.controller import routers

oath2_scheme = OAuth2PasswordBearer(tokenUrl='token')
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

for router in routers:
    app.include_router(router)