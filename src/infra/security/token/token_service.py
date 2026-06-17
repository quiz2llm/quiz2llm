from datetime import datetime, timezone, timedelta
from src.domain.user.User import User
from src.domain.user.Student import Student
from src.domain.user.Teacher import Teacher
import jwt

SECRET='jaja'
ALGORITHM = 'HS256'
TOKEN_EXPIRE_MINUTES = 60

def create_acess_token(user: User):
    expire = datetime.now(timezone.utc) + timedelta(minutes=TOKEN_EXPIRE_MINUTES)

    if isinstance(user, Student):
        sub = user.student_uuid
    elif isinstance(user, Teacher):
        sub = user.teacher_uuid
    else:
        sub = str(user.id)

    payload = {
        "sub": sub,
        "username": user.name,
        "role": user.role.value,
        "exp": int(expire.timestamp())
    }

    token = jwt.encode(payload, SECRET, algorithm=ALGORITHM)
    return token


def decode_token(token: str) -> dict:
    return jwt.decode(token, SECRET, algorithms=[ALGORITHM])
