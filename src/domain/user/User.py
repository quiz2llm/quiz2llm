from src.infra.db.db import Base
from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, String, DateTime, Enum
from .Role import user_role


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)

    name: Mapped[str] = mapped_column(String(100))

    create_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)

    role: Mapped[user_role] = mapped_column(Enum(user_role), default=user_role.STUDENT)

    __mapper_args__ = {
        "polymorphic_on": "role",
    }
