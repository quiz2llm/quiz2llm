from fastapi import FastAPI
from .infra.db import get_conection

app = FastAPI()

def run():
    '''
    entry point
    '''

if __name__=='__main__':
    get_conection()
    run()