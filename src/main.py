from contextlib import asynccontextmanager

from alembic import command
from alembic.config import Config
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.app.controller import routers

def run_migration():
    alembic_cfg = Config("src/infra/db/alembic.ini")
    command.upgrade(alembic_cfg, "head")
    yield

@asynccontextmanager
async def lifespan(app: FastAPI):
    run_migration()
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
