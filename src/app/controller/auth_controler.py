from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from src.infra.db.session import get_session
from src.infra.security.securityService import securityService


class SignupRequest(BaseModel):
    username: str
    password: str


class LoginRequest(BaseModel):
    username: str
    password: str


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/signup", status_code=201)
def signup(payload: SignupRequest, session: Session = Depends(get_session)):
    service = securityService(session)
    try:
        user = service.singup(payload.username, payload.password)
        token = token_service.create_token(user.student_uuid,payload.password)

        return token
    except ValueError as e:
        raise HTTPException(409, str(e))


@router.post("/login")
def login(payload: LoginRequest, session: Session = Depends(get_session)):
    service = securityService(session)
    if not service.verify_password(payload.username, payload.password):
        raise HTTPException(401, "usuário ou senha inválidos")

    return {"message": "autenticado com sucesso"}
