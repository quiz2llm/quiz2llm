from datetime import datetime, timezone, timedelta
from pydantic import BaseModel
from src.domain.user.Student import Student
import jwt

SECRET='jaja'
ALGORITHM = 'HS256'
TOKEN_EXPIRE_MINUTES = 60

def create_acess_token(user:Student):
    # hora q receber a req + tempo de expiraçao
    expire = datetime.now(timezone.utc) + timedelta(TOKEN_EXPIRE_MINUTES) 

    payload = {
        "sub": str(user.student_uuid),
        "exp": int(expire.timestamp())
    }

    token = jwt.encode(payload,SECRET,algorithm=ALGORITHM)
    return token

def decode_token(token:str):
    return jwt.decode(token,SECRET,ALGORITHM)

