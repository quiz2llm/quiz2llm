from sqlalchemy.orm import Session
from src.domain.quiz_model import Quiz
from src.app.controller.request.quiz_request import QuizCreate, QuizUpdate
from datetime import datetime


class QuizService:
    def create_quiz(self, payload: QuizCreate, session: Session) -> Quiz:
        quiz = Quiz(**payload.model_dump())
        session.add(quiz)
        session.commit()
        session.refresh(quiz)
        return quiz

    def list_quizzes(self, session: Session) -> list[Quiz]:
        return session.query(Quiz).all()

    def get_quiz(self, quiz_id: str, session: Session) -> Quiz:
        quiz = session.get(Quiz, quiz_id)
        if not quiz:
            raise ValueError("Quiz not found")
        return quiz

    def update_quiz(self, quiz_id: str, payload: QuizUpdate, session: Session) -> Quiz:
        quiz = session.get(Quiz, quiz_id)
        if not quiz:
            raise ValueError("Quiz not found")
        for key, val in payload.model_dump(exclude_unset=True).items():
            setattr(quiz, key, val)
        session.commit()
        session.refresh(quiz)
        return quiz

    def delete_quiz(self, quiz_id: str, session: Session) -> None:
        quiz = session.get(Quiz, quiz_id)
        if not quiz:
            raise ValueError("Quiz not found")
        session.delete(quiz)
        session.commit()

    def answer_quiz(self, quiz_id: str, session: Session) -> Quiz:
        quiz = session.get(Quiz, quiz_id)
        if not quiz:
            raise ValueError("Quiz not found")
        quiz.when_answered = datetime.now()
        session.commit()
        session.refresh(quiz)
        return quiz
