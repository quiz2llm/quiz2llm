from .User import *
import uuid

class Teacher(User):
    teacher_id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=lambda:str(uuid.uuid7)
        )