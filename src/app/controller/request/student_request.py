from pydantic import BaseModel
from typing import Optional

class create_student():
    name:str

class update_student():
    name:Optional[str] = None
