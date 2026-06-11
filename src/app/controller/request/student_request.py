from pydantic import BaseModel
from typing import Optional

class update_student(BaseModel):
    name: Optional[str] = None
