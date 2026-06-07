from pydantic import BaseModel
from typing import Optional

class student_response(BaseModel):
    student_uuid:str
    name:str
