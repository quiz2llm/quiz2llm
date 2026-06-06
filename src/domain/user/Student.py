from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, ForeignKey
from .User import User
import uuid


class Student(User):
    __tablename__ = "students"

    id: Mapped[int] = mapped_column(ForeignKey("users.id"), primary_key=True)

    student_uuid: Mapped[str] = mapped_column(
        String(32),
        unique=True,
        default=lambda: str(uuid.uuid4()).replace("-", ""),
    )

    __mapper_args__ = {
        "polymorphic_identity": "STUDENT",
    }
