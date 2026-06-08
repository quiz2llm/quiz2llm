# quiz2llm

Sistema full-stack para criação e gerenciamento de questionários, desenvolvido como parte de um estudo de Machine Learning para avaliar qual modelo de linguagem melhor compreende o contexto de uma mensagem.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Backend | Python · FastAPI · SQLAlchemy · Alembic |
| Frontend | React · TypeScript · Vite · Ant Design |
| Database | MySQL |
| Infra | Docker · docker-compose |
| ML/AI | transformers · PyTorch · scikit-learn · spaCy (planejado) |

## Funcionalidades

- CRUD completo de questionários (título, texto base, perguntas)
- Visualização **convidado** (somente leitura)
- Visualização **administrador** (criar, editar e excluir)
- Alternância de papéis (Guest / Admin) em tempo real
- Tema claro/escuro
- API REST documentada com Swagger

## Arquitetura

```
src/                         # Backend Python/FastAPI
├── main.py                  # Entrada da aplicação
├── app/
│   ├── controller/          # Rotas e schemas Pydantic
│   └── service/             # Lógica de negócio
├── domain/                  # Modelos SQLAlchemy (Quiz, User, Student, Teacher)
└── infra/db/                # Engine, sessão, migrações Alembic

view/                        # Frontend React/TypeScript
└── src/
    ├── components/          # Componentes reutilizáveis
    ├── pages/               # Páginas da aplicação
    ├── hooks/               # Hooks personalizados
    └── services/            # Cliente HTTP (axios)
```

## Pré-requisitos

- Python 3.x
- Node.js 18+
- Docker

## Setup

### 1. Banco de Dados

```bash
cp .env.example .env   # configure as credenciais
docker-compose up -d   # inicia MySQL
```

### 2. Backend

```bash
source .venv/bin/activate
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

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/quiz` | Criar questionário |
| GET | `/quiz` | Listar todos |
| GET | `/quiz/{id}` | Obter por ID |
| PUT | `/quiz/{id}` | Atualizar |
| DELETE | `/quiz/{id}` | Excluir |
| PATCH | `/quiz/{id}/answer` | Marcar como respondido |

## Estrutura do Projeto

```
├── docker-compose.yaml      # Serviço MySQL
├── doc/
│   └── system-design.drawio # Diagrama da arquitetura
├── src/                     # Backend
├── view/                    # Frontend
│   └── .pencil/             # Design system (Pencil)
└── .env                     # Configuração do banco
```

## ML Study (em planejamento)

O objetivo final é utilizar os questionários cadastrados para avaliar a capacidade de diferentes LLM em compreender contexto, e utilizar esse contexto para classificar questionários respondidos .
