# session
from sqlalchemy.orm import Session
# requesiçoes 
from src.app.controller.request.student_request import create_student,  update_student
# model
from src.domain.user.Student import Student


class student_service:
    def create(self,payload:create_student, session:Session) -> Student:
        print(payload)
        new_student = Student(**payload.model_dump())
        session.add(new_student)
        session.commit()
        session.refresh(new_student)
        return new_student