# folder struchture
```

doc # Documentation
src # backend rest api/
├── app                      # interative parts like controller,services/
│   ├── controller/
│   │   ├── request             # dtos for input data/
│   │   │   └── quiz_request.py
│   │   ├── response           # dtos for output data/
│   │   │   └── quiz_response.py
│   │   ├── student_controller.py
│   │   ├── teacher_controller.py
│   │   └── controller.py       # quiz controller
│   └── services
├── domain # entitys of this project/
│   ├── user/
│   │   ├── user.py           # main factory class
│   │   ├── student.py       # sub-class of user
│   │   └── teacher.py       # sub-class of user
│   └── quiz_model.py     # quiz model
└── infra # database and other structural configurations/
    ├── migrations # alembic migratinos folder/
    │   └── versions # migrations
    ├── alembic.ini
    ├── db.py           # conect to the docker db by sqlAlchemi engine
    └── session.py     # create a sqlAlchemy session
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
- 

# project product 
simple quiz for test and study how model get , and retrive context from a text to awnser simple questions 

# project actors
teachers -> are users that create the quizes, they can:
- create new quizes
- consult their own quizes
- edit and delete their quizes

student -> are a actor for the users that anwser the quizes, they can do :
- anser quizes from diferent teachers 
