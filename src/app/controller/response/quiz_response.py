from pydantic import BaseModel


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
