from pydantic import BaseModel
from typing import Optional

class create_teacher(BaseModel):
    name:str

class update_teacher(BaseModel):
    name:Optional[str] = None