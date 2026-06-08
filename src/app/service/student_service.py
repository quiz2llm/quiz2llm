# session type, serve apenas para tipar a session 
from sqlalchemy.orm import Session 
from sqlalchemy import select
# requesiçoes 
from src.app.controller.request.student_request import create_student,  update_student
# model
from src.domain.user.Student import Student


class student_service:
    def create(self,payload:create_student, session:Session ) -> Student:
        new_student = Student(**payload.model_dump())
        session.add(new_student)
        session.commit()
        session.refresh(new_student)
        return new_student

    def get_all(self, session:Session) -> list[Student]:
        return session.query(Student).all()

    def get_by_id(self,student_id:str, session:Session) -> Student:
        select_by_id_query = select(Student).where(Student.student_uuid == student_id)
        this_student = session.execute(select_by_id_query).scalar_one_or_none()
        print(this_student)
        if not this_student:
            raise ValueError("student not found")
        return this_student