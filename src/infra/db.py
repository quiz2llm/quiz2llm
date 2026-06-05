from sqlalchemy import create_engine
from dotenv import load_dotenv
load_dotenv()
import os

DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
HOST = os.getenv("HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

def get_conection():
    try:
        engine = create_engine(
            f"mysql+pymysql://{DB_USER}:{DB_PASS}@{HOST}:{DB_PORT}/{DB_NAME}"
        )
        print('conectado com sucesso')
        print(engine)
        return engine
    except Exception as e :
        print('erro ao conectar ao servido \n',e)
        return e