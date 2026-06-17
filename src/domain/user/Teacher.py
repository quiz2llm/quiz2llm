from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, ForeignKey
from .User import User
from .Role import user_role
import uuid


class Teacher(User):
    __tablename__ = "teachers"

    id: Mapped[int] = mapped_column(ForeignKey("users.id"), primary_key=True)

    teacher_uuid: Mapped[str] = mapped_column(
        String(36),
        unique=True,
        default=lambda: str(uuid.uuid7()),
    )

    __mapper_args__ = {
        "polymorphic_identity": user_role.TEACHER,
    }
