from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from pydantic import BaseModel

from src.infra.db.session import get_session
from src.infra.config.settings import settings
from src.app.service.teacher_service import teacher_service
from src.app.controller.response.teacher_response import teacher_response


class PromoteRequest(BaseModel):
    user_id: int


router = APIRouter(prefix='/teacher', tags=['teacher'])
service = teacher_service()


@router.get('', response_model=list[teacher_response])
def list_teachers(session: Session = Depends(get_session)):
    return service.get_all(session)


@router.get('/{teacher_id}', response_model=teacher_response)
def get_teacher_by_id(
    teacher_id: str,
    session: Session = Depends(get_session)
):
    try:
        return service.get_by_id(teacher_id, session)
    except ValueError:
        raise HTTPException(404, "teacher not found")
