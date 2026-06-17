from src.infra.db.db import Base
from sqlalchemy.orm import mapped_column, Mapped
from sqlalchemy import String, DateTime, Integer, ForeignKey
import datetime

class user_credentials(Base):
    __tablename__ = 'user_credentials'

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), primary_key=True)
    password: Mapped[str] = mapped_column(String(255))
    last_password_change: Mapped[datetime.datetime] = mapped_column(DateTime, default=datetime.datetime.now)
    fail_attempts: Mapped[int] = mapped_column(Integer, default=0)