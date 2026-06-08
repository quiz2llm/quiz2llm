from pydantic import BaseModel
from src.domain.user.Role import user_role

class teacher_response(BaseModel):
    teacher_uuid:srt
    name:str
    role:user_role.TEACHER

    model_config={
        "from_attributes":True
    }
