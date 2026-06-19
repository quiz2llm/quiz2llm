# Quiz2LLM

Sistema para criação e gerenciamento de questionários, desenvolvido como parte de um estudo de Machine Learning para avaliar qual modelo de linguagem melhor compreende o contexto de uma mensagem.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Backend | Python · FastAPI · SQLAlchemy · Alembic · PyJWT · argon2 |
| Frontend | React · TypeScript · Vite · Ant Design |
| Database | MySQL |
| Infra | Docker · docker-compose |
| ML/AI | transformers · PyTorch · scikit-learn · spaCy (planejado) |

---

### Serviços

| Serviço | Stack | Porta | Responsabilidade |
|---------|-------|-------|------------------|
| **Monolito** | Python/FastAPI | `:8000` | Auth (login, signup), CRUD de usuários, validação de token |
| **Quiz** | Python/FastAPI | `:8001` | Criação/gerenciamento de questionários, submissão de respostas |
| **Frontend** | React/TypeScript | `:5173` | Interface do usuário |
| **MySQL** | MySQL 8 | `:3306` | Banco de dados compartilhado |

### Comunicação entre serviços

- **Frontend → Quiz ou Monolito**: O frontend envia o JWT no header `Authorization: Bearer <token>` para o serviço que precisa consumir.
- **Quiz → Monolito**: O quiz chama `POST /auth/validade` pra validar o token e descobrir se o usuário existe, está ativo e qual a role. Comunicação via HTTP síncrono (request-response) — ideal pra validação, não precisa de message broker.
- **Confiança**: Ambos os serviços confiam 100% um no outro e compartilham a mesma chave JWT (`SECRET`). O `/validate` existe como ponto central de consulta a dados do usuário (existência, status ativo, role atualizada), não como único validador do token.

### docker-compose

```yaml
services:
  monolito:
    build: ./monolito
    ports: ["8000:8000"]
    environment:
      - SECRET=${SECRET}
      - DB_USER=${DB_USER}
      - DB_PASS=${DB_PASS}
      - DB_HOST=db
      - DB_PORT=3306
      - DB_NAME=quiz2llm
    depends_on: [db]

  quiz:
    build: ./quiz
    ports: ["8001:8001"]
    environment:
      - SECRET=${SECRET}                        # Mesma chave JWT do monolito
      - MONOLITO_URL=http://monolito:8000        # URL interna pra chamar /validate
      - DB_USER=${DB_USER}
      - DB_PASS=${DB_PASS}
      - DB_HOST=db
      - DB_PORT=3306
      - DB_NAME=quiz2llm
    depends_on: [monolito]

  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASS}
      MYSQL_DATABASE: ${DB_NAME}
    ports: ["3306:3306"]
    volumes: [mysql_data:/var/lib/mysql]

volumes:
  mysql_data:
```

---

## Endpoints de Integração

### POST /auth/validade

Endpoint interno (não exposto pro frontend) que o microsserviço de quiz chama pra validar um token e consultar dados atualizados do usuário.

**Request:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response 200 — token válido:**
```json
{
  "valid": true,
  "sub": "0191c5e0-...",
  "username": "joão",
  "role": 2,
  "is_active": true
}
```

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `valid` | bool | Sempre `true` no sucesso |
| `sub` | string | UUID do usuário (`student_uuid` ou `teacher_uuid`) |
| `username` | string | Nome do usuário |
| `role` | int | `1` = STUDENT, `2` = TEACHER |
| `is_active` | bool | Se o usuário está ativo (não desativado) |

**Response 401 — token inválido:**
```json
{ "detail": "invalid token" }
```

**Response 401 — usuário não encontrado:**
```json
{ "detail": "user not found" }
```

**Response 401 — usuário desativado:**
```json
{ "detail": "user is deactivated" }
```

**Response 403 — role não autorizada (se `required_role` foi enviado no request):**
```json
{ "detail": "insufficient permissions" }
```

### Como o Quiz microservice usa o /validate

```python
import httpx
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="http://localhost:8000/auth/login")

class ValidatedUser(BaseModel):
    sub: str
    username: str
    role: int
    is_active: bool

async def get_validated_user(token: str = Depends(oauth2_scheme)) -> ValidatedUser:
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://monolito:8000/auth/validade",
            json={"token": token, "required_role": 2}  # opcional
        )

    if response.status_code == 401:
        raise HTTPException(401, "invalid or deactivated user")
    if response.status_code == 403:
        raise HTTPException(403, "insufficient permissions")

    data = response.json()
    return ValidatedUser(
        sub=data["sub"],
        username=data["username"],
        role=data["role"],
        is_active=data["is_active"],
    )


# Uso numa rota do quiz:
@router.get("/quiz")
def list_quizzes(user: ValidatedUser = Depends(get_validated_user)):
    # user.role diz se é STUDENT(1) ou TEACHER(2)
    # user.is_active sempre é True aqui (se não, teria dado 401)
    return {"message": f"Olá {user.username}, bem-vindo ao quiz!"}
```

### Alternativa: validar o JWT localmente (sem chamar /validate)

Como ambos os serviços compartilham a mesma `SECRET`, o quiz pode decodificar o token sozinho e usar o `/validate` só pra checar se o usuário ainda existe e está ativo:

```python
import jwt
import httpx
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="http://localhost:8000/auth/login")
SECRET = "jaja"  # deve vir do .env
ALGORITHM = "HS256"

async def get_validated_user(token: str = Depends(oauth2_scheme)):
    # Passo 1: decodifica localmente (rápido, sem rede)
    try:
        payload = jwt.decode(token, SECRET, algorithms=[ALGORITHM])
    except jwt.PyJWTError:
        raise HTTPException(401, "invalid token")

    # Passo 2: chama /validate pra checar se user existe e está ativo
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://monolito:8000/auth/validade",
            json={"token": token}
        )

    if response.status_code != 200:
        raise HTTPException(401, "user not found or deactivated")

    return response.json()
```

---

## Token JWT

O token é gerado pelo monolito no login/signup e carregado em todos os microsserviços.

### Payload

| Campo | Descrição |
|-------|-----------|
| `sub` | UUID do usuário (`student_uuid` ou `teacher_uuid`) |
| `username` | Nome do usuário |
| `role` | `1` (STUDENT) ou `2` (TEACHER) |
| `exp` | Timestamp de expiração (1 hora) |

### Algoritmo

- Algoritmo: `HS256`
- A chave `SECRET` é compartilhada entre monolito e quiz via variável de ambiente.
- O token é autossuficiente: qualquer serviço com a `SECRET` pode decodificá-lo sem chamar ninguém.

### Exemplo de decodificação

```python
import jwt

payload = jwt.decode(token, SECRET, algorithms=["HS256"])
# payload = {
#     "sub": "0191c5e0-...",
#     "username": "joão",
#     "role": 2,
#     "exp": 1718000000
# }
```

---

## Funcionalidades

- Autenticação JWT com roles (Student / Teacher)
- Criação e gerenciamento de questionários (microsserviço quiz)
- CRUD de estudantes e professores
- Validação centralizada de usuários (`/auth/validade`)
- API REST documentada com Swagger

---

## Estrutura do Projeto

```
quiz2llm/
├── docker-compose.yaml          # Monolito + Quiz + MySQL
├── monolito/                    # Backend auth/users (este repositório)
│   ├── src/
│   │   ├── main.py
│   │   ├── app/
│   │   │   ├── controller/
│   │   │   │   ├── auth_controler.py       # /auth/signup, /auth/login, /auth/validade
│   │   │   │   ├── studant_controller.py
│   │   │   │   └── teacher_controller.py
│   │   │   └── service/
│   │   ├── domain/
│   │   │   └── user/
│   │   └── infra/
│   │       ├── db/               # Engine, sessão, migrações Alembic
│   │       └── security/         # JWT, Argon2, auth_dependency
│   └── ...
├── quiz/                         # Microsserviço de quiz (em implementação)
│   ├── src/
│   │   ├── main.py
│   │   ├── app/
│   │   │   ├── controller/       # Rotas do quiz
│   │   │   └── service/
│   │   ├── domain/
│   │   │   └── quiz_model.py
│   │   ├── infra/
│   │   │   └── db/               # Migrações do quiz
│   │   └── requirements.txt
│   ├── Dockerfile
│   └── ...
├── view/                         # Frontend React/TypeScript
└── .env                          # Configuração compartilhada
```

---

## Pré-requisitos

- Python 3.x
- Node.js 18+
- Docker

## Setup

### 1. Banco de Dados

```bash
cp .env.example .env   # configure as credenciais
docker compose up -d   # inicia MySQL
```

### 2. Backend (Monolito)

```bash
cd monolito
python -m venv .venv
source .venv/bin/activate
pip install -r src/requirements.txt
alembic -c src/infra/db/alembic.ini upgrade head
uvicorn src.main:app --reload --port 8000
```

### 3. Backend (Quiz)

```bash
cd quiz
python -m venv .venv
source .venv/bin/activate
pip install -r src/requirements.txt
alembic -c src/infra/db/alembic.ini upgrade head
uvicorn src.main:app --reload --port 8001
```

A API do monolito roda em `http://localhost:8000` e do quiz em `http://localhost:8001` — documentação interativa em `/docs`.

---

## API Reference

### Autenticação (Monolito — :8000)

| Método | Rota | Autenticação | Descrição |
|--------|------|---|---|
| POST | `/auth/signup` | ❌ | Criar conta Student |
| POST | `/auth/login` | ❌ | Login (Student ou Teacher) |
| POST | `/auth/validade` | ❌ (interno) | Validar token e checar status do usuário |

### Estudantes (Monolito — :8000)

| Método | Rota | Autenticação | Role | Descrição |
|--------|------|---|---|---|
| GET | `/student` | ✅ | Qualquer | Listar estudantes |
| GET | `/student/{uuid}` | ✅ | Qualquer | Buscar estudante por UUID |

### Professores (Monolito — :8000)

| Método | Rota | Autenticação | Role | Descrição |
|--------|------|---|---|---|
| GET | `/teacher` | ✅ | Teacher | Listar professores |
| GET | `/teacher/{uuid}` | ✅ | Teacher | Buscar professor por UUID |

### Quiz (Quiz — :8001)

| Método | Rota | Autenticação | Role | Descrição |
|--------|------|---|---|---|
| ... | ... | ✅ | ... | (em implementação) |

---

## Variáveis de Ambiente

| Variável | Descrição |
|----------|-----------|
| `SECRET` | Chave secreta JWT (compartilhada entre serviços) |
| `DB_USER` | Usuário do MySQL |
| `DB_PASS` | Senha do MySQL |
| `DB_HOST` | Host do MySQL |
| `DB_PORT` | Porta do MySQL |
| `DB_NAME` | Nome do banco |
| `MONOLITO_URL` | URL interna do monolito (ex: `http://monolito:8000`) — usado pelo quiz |
