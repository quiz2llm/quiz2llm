from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from src.infra.db.session import get_session
from pydantic import BaseModel

router = APIRouter(prefix='/auth',tags=['auth'])

class request(BaseModel):
    username:str
    password:str

@router.post('/login',status_code=200)
def generate_token_if_athenticade(
    credencials:request,
    request:Request,
    session:Session = Depends(get_session)):
        return credencials
