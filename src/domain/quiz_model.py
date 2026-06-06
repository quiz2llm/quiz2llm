from src.infra.db.db import Base
from sqlalchemy import String, Text, JSON, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from typing import Optional
import datetime
import uuid


class Quiz(Base):
    __tablename__ = "quiz"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True,
        default=lambda: str(uuid.uuid4())
    )

    title: Mapped[str] = mapped_column(String(200))

    main_text: Mapped[str] = mapped_column(Text)

    question: Mapped[Optional[list[str]]] = mapped_column(JSON, nullable=True)

    student: Mapped[str] = mapped_column(String(150))

    when_created: Mapped[datetime.datetime] = mapped_column(
        DateTime,
        default=datetime.datetime.now
    )

    when_answered: Mapped[Optional[datetime.datetime]] = mapped_column(
        DateTime,
        nullable=True
    )