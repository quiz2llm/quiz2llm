from pydantic import BaseModel
from typing import Optional

class update_teacher(BaseModel):
    name: Optional[str] = None