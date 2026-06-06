from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from src.infra.db.session import get_session
from src.app.controller.response.quiz_response import QuizCreate, QuizResponse, QuizUpdate
from src.app.service.quiz_service import QuizService

router = APIRouter(prefix="/quiz", tags=["quiz"])
service = QuizService()


@router.post("", response_model=QuizResponse, status_code=201)
def create_quiz(payload: QuizCreate, session: Session = Depends(get_session)):
    return service.create_quiz(payload, session)


@router.get("", response_model=List[QuizResponse])
def list_quizzes(session: Session = Depends(get_session)):
    return service.list_quizzes(session)


@router.get("/{quiz_id}", response_model=QuizResponse)
def get_quiz(quiz_id: str, session: Session = Depends(get_session)):
    try:
        return service.get_quiz(quiz_id, session)
    except ValueError:
        raise HTTPException(404, "Quiz not found")


@router.put("/{quiz_id}", response_model=QuizResponse)
def update_quiz(quiz_id: str, payload: QuizUpdate, session: Session = Depends(get_session)):
    try:
        return service.update_quiz(quiz_id, payload, session)
    except ValueError:
        raise HTTPException(404, "Quiz not found")


@router.delete("/{quiz_id}", status_code=204)
def delete_quiz(quiz_id: str, session: Session = Depends(get_session)):
    try:
        service.delete_quiz(quiz_id, session)
    except ValueError:
        raise HTTPException(404, "Quiz not found")


@router.patch("/{quiz_id}/answer", response_model=QuizResponse)
def answer_quiz(quiz_id: str, session: Session = Depends(get_session)):
    try:
        return service.answer_quiz(quiz_id, session)
    except ValueError:
        raise HTTPException(404, "Quiz not found")
