from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, ForeignKey
from .User import User
from .Role import user_role
import uuid_utils as uuid


class Student(User):
    __tablename__ = "students"

    id: Mapped[int] = mapped_column(ForeignKey("users.id"), primary_key=True)

    student_uuid: Mapped[str] = mapped_column(
        String,
        unique=True,
        default=lambda: str(uuid.uuid7()),
    )

    __mapper_args__ = {
        "polymorphic_identity": user_role.STUDENT,
    }
