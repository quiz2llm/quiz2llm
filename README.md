# quiz2llm

Sistema full-stack para criação e gerenciamento de questionários, desenvolvido como parte de um estudo de Machine Learning para avaliar qual modelo de linguagem melhor compreende o contexto de uma mensagem.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Backend | Python · FastAPI · SQLAlchemy · Alembic · PyJWT · argon2 |
| Frontend | React · TypeScript · Vite · Ant Design |
| Database | MySQL |
| Infra | Docker · docker-compose |
| ML/AI | transformers · PyTorch · scikit-learn · spaCy (planejado) |

## Funcionalidades

- Autenticação JWT com roles (Student / Teacher)
- Token autossuficiente para validação em microserviços (contém `sub`, `username`, `role`)
- CRUD de estudantes e professores
- CRUD de questionários (em implementação)
- API REST documentada com Swagger

## Arquitetura

```
src/                         # Backend Python/FastAPI
├── main.py                  # Entrada da aplicação
├── app/
│   ├── controller/          # Rotas FastAPI
│   │   ├── auth_controler.py
│   │   ├── studant_controller.py
│   │   ├── teacher_controller.py
│   │   ├── request/         # Schemas Pydantic de input
│   │   └── response/        # Schemas Pydantic de output
│   └── service/             # Lógica de negócio
│       ├── student_service.py
│       └── teacher_service.py
├── domain/                  # Modelos SQLAlchemy
│   ├── quiz_model.py
│   └── user/
│       ├── Role.py          # Enum STUDENT=1, TEACHER=2
│       ├── User.py
│       ├── Student.py
│       └── Teacher.py
└── infra/
    ├── db/                  # Engine, sessão, migrações Alembic
    └── security/
        ├── securitModel.py      # user_credentials table
        ├── securityConfig.py    # Password hashing (argon2)
        ├── securityService.py   # Autenticação e signup
        ├── auth_dependency.py   # get_current_user, require_role
        └── token/
            └── token_service.py # Criação e decode de JWT

view/                        # Frontend React/TypeScript
└── src/                     # (diretório separado)
    ├── components/
    ├── pages/
    ├── hooks/
    └── services/
```

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

### 2. Backend

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r src/requirements.txt
alembic -c src/infra/db/alembic.ini upgrade head
uvicorn src.main:app --reload
```

A API roda em `http://localhost:8000` — documentação interativa em `/docs`.

### 3. Frontend

```bash
cd view
npm install
npm run dev
```

O frontend roda em `http://localhost:5173`. Requisições para `/quiz` são proxyadas para o backend.

## API

### Autenticação

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/auth/signup` | Criar conta Student |
| POST | `/auth/login` | Login (Student ou Teacher) |

**Response:**
```json
{
  "access_token": "jwt_token...",
  "token_type": "bearer"
}
```

### Estudantes

| Método | Rota | Autenticação | Role | Descrição |
|--------|------|---|---|---|
| GET | `/student` | ✅ | Student | Listar estudantes |
| GET | `/student/{uuid}` | ✅ | Student | Buscar estudante por UUID |

### Professores

| Método | Rota | Autenticação | Role | Descrição |
|--------|------|---|---|---|
| GET | `/teacher` | ✅ | Teacher | Listar professores |
| GET | `/teacher/{uuid}` | ✅ | Teacher | Buscar professor por UUID |

### Questionários (em implementação)

| Método | Rota | Autenticação | Role | Descrição |
|--------|------|---|---|---|
| POST | `/quiz` | ✅ | Teacher | Criar questionário |
| GET | `/quiz` | ✅ | Student, Teacher | Listar todos |
| GET | `/quiz/{id}` | ✅ | Student, Teacher | Obter por ID |
| PUT | `/quiz/{id}` | ✅ | Teacher | Atualizar |
| DELETE | `/quiz/{id}` | ✅ | Teacher | Excluir |
| POST | `/quiz/{id}/answer` | ✅ | Student, Teacher | Enviar resposta |
| GET | `/quiz/{id}/answer` | ✅ | Student, Teacher | Listar respostas |

## Token JWT

O token é autossuficiente — microserviços externos validam sem chamar esta API:

```python
import jwt
payload = jwt.decode(token, SECRET, algorithms=["HS256"])
# payload: { sub, username, role, exp }
```

Payload contém:
| Campo | Descrição |
|-------|-----------|
| `sub` | UUID do usuário (student_uuid ou teacher_uuid) |
| `username` | Nome do usuário |
| `role` | `1` (STUDENT) ou `2` (TEACHER) |
| `exp` | Timestamp de expiração |

## Estrutura do Projeto

```
├── docker-compose.yaml      # Serviço MySQL
├── doc/
│   ├── opencode/            # Documentação opencode
│   └── system-design.drawio # Diagrama da arquitetura
├── src/                     # Backend
├── view/                    # Frontend (diretório separado)
└── .env                     # Configuração do banco
```

## ML Study (em planejamento)

O objetivo final é utilizar os questionários cadastrados para avaliar a capacidade de diferentes LLM em compreender contexto, e utilizar esse contexto para classificar questionários respondidos.
