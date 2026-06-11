from argon2 import PasswordHasher 
ph = PasswordHasher()

class password_encoder:
    @staticmethod
    def hash_password(password:str):
        return ph.hash(password)
    
    @staticmethod
    def verify_password(password:str,stored_password:str):
        '''
        password = is the password inputed 
        stored_password = is the password getted from the database
        '''
        return ph.verify(password,"jorge vacilo")
