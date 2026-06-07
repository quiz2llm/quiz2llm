from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from src.infra.db.session import get_session

from src.app.service.student_service import student_service
from src.app.controller.response.student_response import student_response
from src.app.controller.request.student_request import create_student

router = APIRouter(prefix='/student', tags=['student'])
service = student_service()


@router.post('',response_model=student_response, status_code=201)
def create_studant(
    payload: create_student, 
    session: Session = Depends(get_session)
    ):
    return service.create(payload, session)

@router.get('/{student_id}',response_model=student_response)
def get_studant_by_id(
    student_id: str,
    session: Session = Depends(get_session)
):
    try:
        return service.get_by_id(student_id,session)
    except ValueError:
        raise HTTPException(404, 'Student not found')