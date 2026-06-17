from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from src.infra.db.session import get_session
from src.infra.security.securityService import securityService
from src.infra.security.token.token_service import create_acess_token


class Request(BaseModel):
    username: str
    password: str



router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/signup", status_code=201)
def signup(payload: Request, session: Session = Depends(get_session)):
    service = securityService(session)
    try:
        user = service.singup(payload.username, payload.password)

        return user
    except ValueError as e:
        raise HTTPException(409, str(e))

        

@router.post("/login")
def login(payload: Request, session: Session = Depends(get_session)):
    print(Request)

    service = securityService(session)
    user = service.authenticate(payload.username, payload.password)
    print(user)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="usuário ou senha inválidos"
        )

    token = create_acess_token(user)

    return {
        "access_token": token,
        "token_type": "bearer"
    }
