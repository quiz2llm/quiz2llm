from sqlalchemy.orm import Session

from src.domain.user.User import User
from src.domain.user.Student import Student
from src.infra.security.securitModel import user_credentials
from src.infra.security.securityConfig import password_encoder
from src.main import oath2_scheme

import datetime


from fastapi import Depends
from typing import Annotated
class securityService:
    def __init__(self, session: Session):
        self.session = session

    def get_by_username(self, username: str) -> User | None:
        return self.session.query(User).filter(User.name == username).first()

    def verify_password(self, username: str, password: str) -> bool:
        user = self.get_by_username(username)
        if not user:
            return False

        creds = self.session.get(user_credentials, user.id)
        if not creds:
            return False

        return password_encoder.verify_password(password, creds.password)

        if user:
            raise ValueError("usuário já existe")

        new_user = Student(name=username)
        self.session.add(new_user)
        self.session.flush()

        hashed = password_encoder.hash_password(password)
        creds = user_credentials(
            user_id=new_user.student_uuid,
            password=hashed,
            last_password_change=datetime.datetime.now(),
            fail_attempts=0,
        )
        self.session.add(creds)
        self.session.commit()

        return new_user

        def get_curent_user(curent_user: Annotated=[str,Depends(oath2_scheme)]) -> User:
            '''
            '''
            if