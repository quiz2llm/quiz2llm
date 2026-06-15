from sqlalchemy.orm import Session
from src.domain.user.User import User
from src.domain.user.Student import Student
from src.infra.security.securitModel import user_credentials
from src.infra.security.securityConfig import password_encoder
import datetime


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

    def singup(self, username: str, password: str) -> Student:
        user = self.get_by_username(username)
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

        response = {
            "novo_usuario": new_user,
            "hashed_password": password
        }
        print(response)
        # return response
    