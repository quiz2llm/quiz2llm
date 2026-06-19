from pydantic import BaseModel


class validate_response(BaseModel):
    valid: bool
    sub: str
    username: str
    role: int
    is_active: bool
