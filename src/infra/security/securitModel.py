from src.infra.db.db import Base
from sqlalchemy.orm import mapped_column,Mapped
from sqlalchemy import String, DateTime, Integer
import datetime

class user_credentials(Base):
    __tablename__ == 'credentials';
    
    user_id: Mapped[str]: mapped_column(String)
    password: Mapped[str]: mapped_column(String)
    last_password_change: Mapped[datetime.datetime] = mapped_column(DateTime)
    fail_atempts: Mapped[int]: Mapped[Integer]