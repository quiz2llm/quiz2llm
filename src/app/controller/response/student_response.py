from pydantic import BaseModel
from typing import Optional

class student_response(BaseModel):
    student_uuid:str
    name:str

    # issso permite o fastapi a mappear a model para a response :) eu odeio magia 
    model_config={
        "from_attributes":True
    }