from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy.orm import Session

from src.infra.db.session import get_session


router = APIRouter('/teacher',tags=['teacher'])

@router.post('',response_model=teacher_response,status_code=201)
def create_new_teacher(payload:techear_create,session: Session = Depends(get_session)):
    return service.creat(payload,session)

@router.get('/{id}',response_model=teacher_response, status_code=200)
def get_teacher_by_id(
    id:str=id,
    session:Session = Depends(get_session)
    ):
    try:
        return service.get_by_id(id,session)
    except ValueError:
        raise HTTPException("teacher not found")
@router.get('',response_model=list[teacher_response],status_code=200)
def get_all_teachers(session:Session = Depends(get_session)):
    return service.get_all(Session)
