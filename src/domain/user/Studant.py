from .User import *
import uuid

class Student(User):
    __tablename__ ="students"
    student_id : Mapped[str] = mapped_column(
        String(32),
        primary_key=True,
        default=lambda:srt(uuid.uuid7())
        )
