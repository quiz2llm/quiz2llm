from contextlib import asynccontextmanager

from alembic import command
from alembic.config import Config
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.app.controller import routers


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Roda as migrations do Alembic na inicialização do container
    alembic_cfg = Config("src/infra/db/alembic.ini")
    command.upgrade(alembic_cfg, "head")
    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

for router in routers:
    app.include_router(router)