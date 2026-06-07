from pydantic import BaseModel
from typing import Optional

class create_student(BaseModel):
    name: str

class update_student(BaseModel):
    name: Optional[str] = None
