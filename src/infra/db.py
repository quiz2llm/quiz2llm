from sqlalchemy import create_engine
from dotenv import load_dotenv
load_dotenv()
import os

def get_conection():
    try:
        engine = create_engine(
            f"mysql+pymysql://{DB_USER}:{DB_PASS}@{HOST}:{DB_PORT}/{DB_NAME}"
        )
        return engine
    except Exception as e :
        print('erro ao conectar ao servido \n'+e)
        return e