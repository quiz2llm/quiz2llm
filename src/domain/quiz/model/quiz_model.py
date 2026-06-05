from infra.db.db import Base
from sqlalchemy import String, Text, ForeignKey, ARRAY, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from typing import List
import datetime
import uuid


class Quiz(Base):
    __tablename__ = "quiz"

    id: Mapped[uuid.UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )
    
    title: Mapped[str] = mapped_column(String(200))
    
    main_text: Mapped[str] = mapped_column(Text)
    
    question: Mapped[List[str] | None] = mapped_column(ARRAY(String), nullable=True)
    
    student: Mapped[str] = mapped_column(String(150))

    when_created: Mapped[datetime.datetime] = mapped_column(
        DateTime(timezone=True),
        default=datetime.datetime.now
    )

    when_answered: Mapped[datetime.datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True
    )