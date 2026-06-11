from os import getenv
from dotenv import load_dotenv

load_dotenv()


class Settings:
    TEACHER_PROMOTION_KEY: str = getenv("TEACHER_PROMOTION_KEY", "")


settings = Settings()
