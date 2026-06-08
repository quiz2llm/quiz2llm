from sqlalchemy.orm import Session
from sqlalchemy import select

from src.app.controller.request.teacher_request import create_teacher, update_teacher
from src.domain.user.Teacher import Teacher


class teacher_service:
    def create(self, payload: create_teacher, session: Session) -> Teacher:
        new_teacher = Teacher(**payload.model_dump())
        session.add(new_teacher)
        session.commit()
        session.refresh(new_teacher)
        return new_teacher

    def get_all(self, session: Session) -> list[Teacher]:
        return session.query(Teacher).all()

    def get_by_id(self, teacher_id: str, session: Session) -> Teacher:
        select_by_id_query = select(Teacher).where(Teacher.teacher_uuid == teacher_id)
        this_teacher = session.execute(select_by_id_query).scalar_one_or_none()
        if not this_teacher:
            raise ValueError("teacher not found")
        return this_teacher
