from src.infra.db.db import Base
from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, Sequence, String, DateTime
from .Role import user_role

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer,Sequence('user_id'), primary_key=True)
    
    name: Mapped[str] = mapped_column(String(100))

    create_at: Mapped[datetime] = mapped_column(DateTime,default=datetime.now())

    Role: Mapped[user_role] = mapped_column(String, default='STUDENT')