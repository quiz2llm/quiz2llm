from pydantic import BaseModel
from typing import Optional


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

