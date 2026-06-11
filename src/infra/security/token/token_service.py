import jwt

SECRET='jaja'
ALGORITHM = 'HS256'
TOKEN_EXPIRE_MINUTES = 60


def create_acess_token(password:str):
    token = jwt.encode(password,SECRET,ALGORITHM)
    return token

