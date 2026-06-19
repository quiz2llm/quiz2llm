from pydantic import BaseModel
from typing import Optional


class validate_request(BaseModel):
    token: str
    required_role: Optional[int] = None
