from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from src.infra.db.session import get_session
from src.app.service.teacher_service import teacher_service
from src.app.controller.response.teacher_response import teacher_response
from src.app.controller.request.teacher_request import create_teacher

router = APIRouter(prefix='/teacher', tags=['teacher'])
service = teacher_service()


@router.post('', response_model=teacher_response, status_code=201)
def create_new_teacher(payload: create_teacher, session: Session = Depends(get_session)):
    return service.create(payload, session)


@router.get('/{teacher_id}', response_model=teacher_response, status_code=200)
def get_teacher_by_id(
    teacher_id: str,
    session: Session = Depends(get_session)
):
    try:
        return service.get_by_id(teacher_id, session)
    except ValueError:
        raise HTTPException(404, "teacher not found")


@router.get('', response_model=list[teacher_response], status_code=200)
def get_all_teachers(session: Session = Depends(get_session)):
    return service.get_all(session)
