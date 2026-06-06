from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class QuizResponse(BaseModel):
    id: str
    title: str
    main_text: str
    question: Optional[list[str]] = None
    student: str
    when_created: datetime
    when_answered: Optional[datetime] = None

    model_config = {"from_attributes": True}
