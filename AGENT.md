# folder struchture
```

doc # Documentation
src/
├── __init__.py
├── main.py
├── .gitignore
├── app/
│   ├── __init__.py
│   ├── controller/
│   │   ├── __init__.py
│   │   ├── auth_controler.py
│   │   ├── quiz_controller.py
│   │   ├── studant_controller.py
│   │   ├── teacher_controller.py
│   │   ├── request/
│   │   │   ├── __init__.py
│   │   │   ├── quiz_request.py
│   │   │   ├── student_request.py
│   │   │   └── teacher_request.py
│   │   └── response/
│   │       ├── __init__.py
│   │       ├── quiz_response.py
│   │       ├── student_response.py
│   │       └── teacher_response.py
│   └── service/
│       ├── __init__.py
│       ├── quiz_service.py
│       ├── student_service.py
│       └── teacher_service.py
├── domain/
│   ├── __init__.py
│   ├── quiz_model.py
│   └── user/
│       ├── __init__.py
│       ├── Role.py
│       ├── Student.py
│       ├── Teacher.py
│       └── User.py
└── infra/
    ├── __init__.py
    ├── db/
    │   ├── __init__.py
    │   ├── alembic.ini
    │   ├── db.py
    │   ├── session.py
    │   └── migrations/
    │       ├── README
    │       ├── env.py
    │       ├── script.py.mako
    │       └── versions/
    │           ├── 27bca3cbedfd_atualiza_model_quiz_para_mysql.py
    │           ├── 8bc0857b4166_create_table_user_credentials.py
    │           ├── 9e004e9ab6ad_create_table_students.py
    │           ├── ac468695bb28_create_table_users.py
    │           ├── dfe98ffa69ac_create_table_quiz.py
    │           └── e5ea94240770_create_table_teachers.py
    └── security/
        ├── __init__.py
        ├── securitModel.py
        ├── securityConfig.py
        ├── securityService.py
        └── token/
            ├── __init__.py
            └── token_service.py

view # frontend in react/
└── src # front end inteface code/
    ├── assets         # images,icons thigs that compose the page
    ├── components     # react components
    ├── hooks           # react hooks 
    ├── pages           # pages of the aplication
    └── services         # bridges between the front end backend

```
# tech stack
## Backend 
- fastAPI
- uvicorn
- pydantic
- sqlAlchemy
- alembic
## Frontend
- react
- ant-d
- axios
- lint

# usefull comands 

**Docker**
```bash 
docker compose up -d  # to create a new container of the aplication

docker compose down -v # remove the container and the volume
```
**Backend**
```bash
python -m venv .venv

pip install -r requiremets.txt # install dependecens

source .venv/bin/active.fish # entry in the virtual enviroment

uvicorn src.main:app --reload # run the rest api
```
**Frontend**
```bash
npm install

npm run dev 
```

# enpoints 
**/quiz**
- "" # POST create new quiz
- "" # GET get all quizes
- "/{id}" # GET get a quiz by id  
- "/{id}" # PUT alter a quiz 
- "/{id}" # DELETE delete a existant quiz by id 

**/student**
- "" # POST create new student
- "/{id}" # GET student by id

**/teacher**
- in progress

# GITHUB REPO 
> kani0dev/quiz2llm
use the mcp in this repo