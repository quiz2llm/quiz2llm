from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from src.infra.db.session import get_session
from src.domain.quiz.model.quiz_model import Quiz

router = APIRouter(prefix="/quiz", tags=["quiz"])


class QuizCreate(BaseModel):
    title: str
    main_text: str
    question: Optional[list[str]] = None
    student: str


class QuizUpdate(BaseModel):
    title: Optional[str] = None
    main_text: Optional[str] = None
    question: Optional[list[str]] = None
    student: Optional[str] = None


class QuizResponse(BaseModel):
    id: str
    title: str
    main_text: str
    question: Optional[list[str]] = None
    student: str
    when_created: datetime
    when_answered: Optional[datetime] = None

    model_config = {"from_attributes": True}


@router.post("", response_model=QuizResponse, status_code=201)
def create_quiz(payload: QuizCreate, session: Session = Depends(get_session)):
    quiz = Quiz(**payload.model_dump())
    session.add(quiz)
    session.commit()
    session.refresh(quiz)
    return quiz


@router.get("", response_model=List[QuizResponse])
def list_quizzes(session: Session = Depends(get_session)):
    return session.query(Quiz).all()


@router.get("/{quiz_id}", response_model=QuizResponse)
def get_quiz(quiz_id: str, session: Session = Depends(get_session)):
    quiz = session.get(Quiz, quiz_id)
    if not quiz:
        raise HTTPException(404, "Quiz not found")
    return quiz


@router.put("/{quiz_id}", response_model=QuizResponse)
def update_quiz(quiz_id: str, payload: QuizUpdate, session: Session = Depends(get_session)):
    quiz = session.get(Quiz, quiz_id)
    if not quiz:
        raise HTTPException(404, "Quiz not found")
    for key, val in payload.model_dump(exclude_unset=True).items():
        setattr(quiz, key, val)
    session.commit()
    session.refresh(quiz)
    return quiz


@router.delete("/{quiz_id}", status_code=204)
def delete_quiz(quiz_id: str, session: Session = Depends(get_session)):
    quiz = session.get(Quiz, quiz_id)
    if not quiz:
        raise HTTPException(404, "Quiz not found")
    session.delete(quiz)
    session.commit()


@router.patch("/{quiz_id}/answer", response_model=QuizResponse)
def answer_quiz(quiz_id: str, session: Session = Depends(get_session)):
    quiz = session.get(Quiz, quiz_id)
    if not quiz:
        raise HTTPException(404, "Quiz not found")
    quiz.when_answered = datetime.now()
    session.commit()
    session.refresh(quiz)
    return quiz
