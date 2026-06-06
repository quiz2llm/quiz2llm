# Projeto Quiz — Guia de Estudo

## Sumário

1. [Arquitetura Geral](#1-arquitetura-geral)
2. [O Model (Quiz)](#2-o-model-quiz)
3. [O Base (DeclarativeBase)](#3-o-base-declarativebase)
4. [O Alembic](#4-o-alembic)
5. [A Session](#5-a-session)
6. [O Controller (FastAPI + CRUD)](#6-o-controller)
7. [O Entry Point (main.py)](#7-o-entry-point)
8. [Fluxo Completo Passo a Passo](#8-fluxo-completo)
9. [Comandos Úteis](#9-comandos-uteis)

---

## 1. Arquitetura Geral

```
┌─────────────────────────────────────────────────────────┐
│                     main.py                              │
│  (ponto de entrada — cria app FastAPI, conecta rotas)   │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  controller.py                           │
│  (rotas da API — recebe HTTP, chama banco via session)   │
└────────────────────┬────────────────────────────────────┘
                     │ injeta sessão via Depends()
┌────────────────────▼────────────────────────────────────┐
│                   session.py                             │
│  (SessionLocal — fábrica de sessões SQLAlchemy)          │
└────────────────────┬────────────────────────────────────┘
                     │ usa engine
┌────────────────────▼────────────────────────────────────┐
│                    db.py                                 │
│  (engine + Base — conexão com MySQL + base declarativa)  │
└─────────┬──────────────────────────────┬─────────────────┘
          │                              │
          ▼                              ▼
      [MySQL]               ┌──────────────────────────┐
                            │  migrations/ (Alembic)   │
                            │  env.py + versões .py    │
                            └──────────────────────────┘
```

**Fluxo de uma requisição:**

```
HTTP POST /quiz
    → FastAPI (main.py)
    → controller.py (rota)
    → session.py (cria sessão)
    → model/quiz_model.py (SQLAlchemy ORM)
    → db.py (engine)
    → MySQL
```

---

## 2. O Model (Quiz)

Arquivo: `src/domain/quiz/model/quiz_model.py`

### O que é?

Um **model** no SQLAlchemy é uma classe Python que representa uma **tabela** no banco de dados. Cada **atributo** da classe vira uma **coluna** na tabela. Cada **instância** da classe vira uma **linha**.

### Código comentado

```python
# A classe Base é a "mãe" de todos os models.
# Ela vem do db.py e contém o registro de todas as tabelas.
from src.infra.db.db import Base

# Importamos tipos de coluna que o SQLAlchemy oferece.
# String → VARCHAR, Text → TEXT, JSON → JSON, DateTime → DATETIME
from sqlalchemy import String, Text, JSON, DateTime

# Mapped e mapped_column são a forma moderna (SQLAlchemy 2.0)
# de declarar colunas com type hints.
from sqlalchemy.orm import Mapped, mapped_column

from typing import Optional
import datetime
import uuid


class Quiz(Base):
    # Nome real da tabela no MySQL
    __tablename__ = "quiz"

    # Cada variável de classe vira uma coluna.
    # Mapped[str] diz: "essa coluna guarda strings"
    # mapped_column(...) diz: "configurações da coluna"

    id: Mapped[str] = mapped_column(
        String(36),          # VARCHAR(36) no MySQL
        primary_key=True,    # Chave primária
        default=lambda: str(uuid.uuid4())  # Gera UUID automático
    )
    # ⬆ Usamos String(36) em vez de PG_UUID porque o banco é MySQL.
    # O default=lambda: ... gera um ID novo quando a linha é criada.

    title: Mapped[str] = mapped_column(String(200))

    main_text: Mapped[str] = mapped_column(Text)

    question: Mapped[Optional[list[str]]] = mapped_column(
        JSON,                # MySQL guarda como JSON
        nullable=True        # Pode ser NULL
    )
    # ⬆ Antes usava ARRAY(String) (só PostgreSQL).
    #   Agora usa JSON, que funciona em MySQL.
    #   Optional[list[str]] = None → valor padrão se não for passado.

    student: Mapped[str] = mapped_column(String(150))

    when_created: Mapped[datetime.datetime] = mapped_column(
        DateTime,
        default=datetime.datetime.now  # Seta data/hora ao criar
    )

    when_answered: Mapped[Optional[datetime.datetime]] = mapped_column(
        DateTime,
        nullable=True        # NULL até que o quiz seja respondido
    )
```

### Pra que serve cada coluna?

| Coluna | Tipo | O que guarda |
|--------|------|-------------|
| `id` | VARCHAR(36) | Identificador único do quiz (UUID) |
| `title` | VARCHAR(200) | Título do questionário |
| `main_text` | TEXT | Texto principal / enunciado |
| `question` | JSON | Lista de perguntas (ex: `["Q1", "Q2"]`) |
| `student` | VARCHAR(150) | Nome do estudante |
| `when_created` | DATETIME | Quando o quiz foi criado |
| `when_answered` | DATETIME | Quando foi respondido (NULL se não respondeu) |

---

## 3. O Base (DeclarativeBase)

Arquivo: `src/infra/db/db.py`

```python
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
    engine = create_engine(
        f"mysql+pymysql://{DB_USER}:{DB_PASS}@{HOST}:{DB_PORT}/{DB_NAME}"
    )
    print('conectado com sucesso')
    return engine

from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass
```

### O que tem aqui?

1. **Carregar variáveis de ambiente** — `load_dotenv()` lê o arquivo `.env` na raiz e joga tudo em `os.getenv(...)`.

2. **Criar a engine** — `create_engine(...)` é a "ponte" entre Python e MySQL. A `get_conection()` cria e devolve essa ponte.

3. **DeclarativeBase** — é a classe base que todos os models vão herdar. Ela tem um atributo especial `.metadata` que guarda **todas as tabelas** que foram registradas.

### Por que o `Base.metadata` é importante?

Quando você cria uma classe que herda de `Base`, o SQLAlchemy **automaticamente registra** ela no `Base.metadata`. É assim que o Alembic descobre quais tabelas existem.

```python
# Isso aqui:
class Quiz(Base):
    __tablename__ = "quiz"
    ...

# Automaticamente adiciona "quiz" em:
#   Base.metadata.tables["quiz"]
```

---

## 4. O Alembic

### O que é?

Alembic é o "git" do banco de dados. Cada vez que você muda o model (adiciona coluna, muda tipo, etc.), o Alembic gera um arquivo `.py` com os comandos SQL para aplicar essa mudança.

### Estrutura

```
src/infra/db/
├── alembic.ini                   ← config
├── migrations/
│   ├── env.py                    ← "cérebro" — conecta model ao banco
│   └── versions/
│       ├── dfe98ffa69ac_criar_quiz.py     ← migração 1
│       └── 27bca3cbedfd_atualizar_model.py ← migração 2
```

### env.py (o cérebro)

Arquivo: `src/infra/db/migrations/env.py`

```python
from src.infra.db.db import Base
import src.domain.quiz.model.quiz_model  # ← ESSENCIAL!

target_metadata = Base.metadata  # ← FALA PRO ALEMBIC: "essas são as tabelas"
```

#### Por que o `target_metadata` precisa ser `Base.metadata` e não o `Quiz`?

O `target_metadata` diz pro Alembic: **"compare o banco real com todas essas tabelas aqui"**.

- Se você passar `Quiz` (um model só), o Alembic só enxerga **um** model. Se amanhã criar `User`, `Answer`, etc., o Alembic não vai ver.
- Se você passar `Base.metadata`, o Alembic **enxerga todos os models** que herdam de `Base`.

**Regra de ouro:**

```python
# ✅ CERTO — Alembic enxerga TODOS os models
import src.domain.quiz.model.quiz_model  # registra Quiz no metadata
import src.domain.user.model.user_model  # registra User no metadata
target_metadata = Base.metadata

# ❌ ERRADO — Alembic só enxerga Quiz
from src.domain.quiz.model.quiz_model import Quiz
target_metadata = Quiz
```

#### Por que o `import src.domain.quiz.model.quiz_model` é necessário?

Porque o **simples ato de importar** a classe `Quiz` faz ela ser registrada no `Base.metadata`. Se você não importar, o `Base.metadata` fica vazio e o Alembic não vê tabela nenhuma.

```python
# Sem esse import:
Base.metadata.tables  # {} ← vazio!

# Com o import:
import src.domain.quiz.model.quiz_model
Base.metadata.tables  # {"quiz": Table("quiz", ...)} ← cheio!
```

### Fluxo de trabalho com Alembic

```
1. Cria/Altera um model (ex: adiciona coluna "score")
2. Roda: alembic revision --autogenerate -m "adiciona score"
   → Alembic compara: banco real vs Base.metadata
   → Gera um arquivo .py com os comandos SQL
3. Roda: alembic upgrade head
   → Executa os comandos SQL no banco
```

### Migrações sem autogenerate (quando MySQL está offline)

Se o MySQL não está rodando, você não pode usar `--autogenerate` porque o Alembic precisa conectar no banco para comparar.

```bash
# Gera uma migração "vazia" (só upgrade/downgrade)
alembic -c src/infra/db/alembic.ini revision -m "descricao"

# Você edita manualmente o arquivo gerado
```

---

## 5. A Session

Arquivo: `src/infra/db/session.py`

```python
from sqlalchemy.orm import sessionmaker
from src.infra.db.db import get_conection

# 1. Cria o motor (engine)
engine = get_conection()

# 2. Cria uma "fábrica de sessões"
SessionLocal = sessionmaker(bind=engine)

# 3. Função que entrega uma sessão e fecha depois
def get_session():
    session = SessionLocal()   # abre sessão
    try:
        yield session          # entrega pro FastAPI usar
    finally:
        session.close()        # fecha (mesmo se der erro)
```

### Pra que serve a Session?

A sessão é onde você **conversa com o banco**. As operações básicas são:

```python
# Adicionar
session.add(objeto)

# Salvar no banco
session.commit()

# Atualizar objeto (pegar ID gerado, etc)
session.refresh(objeto)

# Buscar por ID
session.get(Model, id)

# Buscar todos
session.query(Model).all()

# Deletar
session.delete(objeto)
```

### Por que `yield` em vez de `return`?

`yield` transforma `get_session()` em um **generator**. O FastAPI usa isso com `Depends()`: ele chama a função, pega a sessão, usa, e quando a requisição termina, volta pra executar o `finally` que fecha a sessão.

```
get_session():
    [abre sessão] → yield [entrega] → requisição roda → finally [fecha]
```

Se fosse `return`, a sessão abria mas nunca fechava — vazamento de conexão.

---

## 6. O Controller

Arquivo: `src/app/controller.py`

### Estrutura

```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime
from src.infra.db.session import get_session
from src.domain.quiz.model.quiz_model import Quiz

# Cria um "mini-app" de rotas com prefixo /quiz
router = APIRouter(prefix="/quiz", tags=["quiz"])
```

### Pydantic Schemas

Antes de mandar/receber dados via HTTP, precisamos de **schemas** (Pydantic) que validam os dados:

```python
class QuizCreate(BaseModel):
    title: str                      # obrigatório
    main_text: str                  # obrigatório
    question: Optional[list[str]] = None  # opcional
    student: str                    # obrigatório

class QuizResponse(BaseModel):
    id: str
    title: str
    main_text: str
    question: Optional[list[str]] = None
    student: str
    when_created: datetime
    when_answered: Optional[datetime] = None

    model_config = {"from_attributes": True}
    # ⬆ from_attributes = True permite criar esse schema
    #   a partir de um objeto Quiz do SQLAlchemy
```

**Diferença:**
- `QuizCreate` → o que o cliente manda no POST (sem id, sem datas)
- `QuizResponse` → o que a API devolve (com id e datas)
- `QuizUpdate` → o que o cliente manda no PUT (tudo opcional)

### CRUD — cada operação

#### CREATE — POST /quiz

```python
@router.post("", response_model=QuizResponse, status_code=201)
def create_quiz(payload: QuizCreate, session: Session = Depends(get_session)):
    # 1. Converte o schema Pydantic em dict
    # 2. Cria um objeto Quiz com **kwargs
    quiz = Quiz(**payload.model_dump())

    # 3. Adiciona na sessão (prepara INSERT)
    session.add(quiz)

    # 4. Executa o INSERT no banco
    session.commit()

    # 5. Recarrega o objeto (pra ter id, datas etc)
    session.refresh(quiz)
    return quiz
```

**O que acontece no banco:**
```sql
INSERT INTO quiz (id, title, main_text, question, student, when_created)
VALUES ('abc-123', 'Meu Quiz', 'Texto', '["Q1"]', 'João', '2026-06-06 00:00:00');
```

#### READ ALL — GET /quiz

```python
@router.get("", response_model=List[QuizResponse])
def list_quizzes(session: Session = Depends(get_session)):
    return session.query(Quiz).all()
```

```sql
SELECT * FROM quiz;
```

#### READ ONE — GET /quiz/{id}

```python
@router.get("/{quiz_id}", response_model=QuizResponse)
def get_quiz(quiz_id: str, session: Session = Depends(get_session)):
    quiz = session.get(Quiz, quiz_id)  # busca por PK
    if not quiz:
        raise HTTPException(404, "Quiz not found")
    return quiz
```

```sql
SELECT * FROM quiz WHERE id = 'abc-123';
```

#### UPDATE — PUT /quiz/{id}

```python
@router.put("/{quiz_id}", response_model=QuizResponse)
def update_quiz(quiz_id: str, payload: QuizUpdate, session: Session = Depends(get_session)):
    quiz = session.get(Quiz, quiz_id)
    if not quiz:
        raise HTTPException(404, "Quiz not found")

    # Só atualiza campos que foram enviados
    for key, val in payload.model_dump(exclude_unset=True).items():
        setattr(quiz, key, val)

    session.commit()
    session.refresh(quiz)
    return quiz
```

```sql
UPDATE quiz SET title = 'Novo Título' WHERE id = 'abc-123';
```

#### DELETE — DELETE /quiz/{id}

```python
@router.delete("/{quiz_id}", status_code=204)
def delete_quiz(quiz_id: str, session: Session = Depends(get_session)):
    quiz = session.get(Quiz, quiz_id)
    if not quiz:
        raise HTTPException(404, "Quiz not found")
    session.delete(quiz)
    session.commit()
```

```sql
DELETE FROM quiz WHERE id = 'abc-123';
```

#### CUSTOM — PATCH /quiz/{id}/answer

```python
@router.patch("/{quiz_id}/answer", response_model=QuizResponse)
def answer_quiz(quiz_id: str, session: Session = Depends(get_session)):
    quiz = session.get(Quiz, quiz_id)
    if not quiz:
        raise HTTPException(404, "Quiz not found")
    quiz.when_answered = datetime.now()
    session.commit()
    session.refresh(quiz)
    return quiz
```

```sql
UPDATE quiz SET when_answered = '2026-06-06 12:00:00' WHERE id = 'abc-123';
```

### O que é `Depends(get_session)`?

```python
def create_quiz(payload: QuizCreate, session: Session = Depends(get_session)):
```

O `Depends()` é um sistema de **injeção de dependência** do FastAPI.

- O FastAPI vê que `session` depende de `get_session`
- Antes de executar a rota, ele chama `get_session()`, que:
  1. Cria `SessionLocal()` (abre sessão)
  2. `yield` a sessão
- Quando a rota termina, o FastAPI volta pro `get_session()` e executa `session.close()`

**Sem `Depends()`** você teria que abrir e fechar sessão manualmente em CADA rota.

---

## 7. O Entry Point

Arquivo: `src/main.py`

```python
from fastapi import FastAPI
from src.app.controller import router

app = FastAPI()
app.include_router(router)
```

A `app.include_router(router)` conecta as rotas do controller na aplicação. Agora todos os endpoints definidos em `controller.py` (com prefixo `/quiz`) ficam acessíveis.

---

## 8. Fluxo Completo

### Ciclo de vida de uma feature

```
1. VOCÊ           → Cria/altera um model (quiz_model.py)
2. VOCÊ           → Roda alembic revision --autogenerate
3. ALEMBIC        → Gera migração .py
4. VOCÊ           → Roda alembic upgrade head
5. MYSQL          → Tabela criada/alterada
6. VOCÊ           → Cria rota no controller.py
7. FASTAPI        → Rota disponível em /quiz
8. CLIENTE        → Faz requisição HTTP
9. CONTROLLER     → Pega dados, chama session
10. SQLALCHEMY    → Gera SQL, executa no MySQL
11. MYSQL         → Devolve resultado
12. CONTROLLER    → Converte pra JSON, devolve pro cliente
```

### Mapa de arquivos

```
src/
├── main.py                          ← entrada, cria app FastAPI
├── app/
│   └── controller.py                ← rotas CRUD
├── domain/
│   └── quiz/
│       └── model/
│           └── quiz_model.py        ← classe Quiz (a tabela)
└── infra/
    └── db/
        ├── __init__.py
        ├── db.py                    ← engine + Base
        ├── session.py               ← SessionLocal + get_session
        ├── alembic.ini              ← config Alembic
        └── migrations/
            ├── env.py               ← target_metadata
            └── versions/            ← migrações .py
```

---

## 9. Comandos Úteis

```bash
# ─── ALEMBIC ───────────────────────────────────

# Criar migração (compara model vs banco)
alembic -c src/infra/db/alembic.ini revision --autogenerate -m "descricao"

# Criar migração vazia (MySQL offline)
alembic -c src/infra/db/alembic.ini revision -m "descricao"

# Aplicar migrações pendentes
alembic -c src/infra/db/alembic.ini upgrade head

# Ver status
alembic -c src/infra/db/alembic.ini current

# Voltar uma migração
alembic -c src/infra/db/alembic.ini downgrade -1

# ─── FASTAPI ───────────────────────────────────

# Rodar servidor (com reload automático)
uvicorn src.main:app --reload

# ─── DOCKER ────────────────────────────────────

# Subir MySQL
docker compose up -d

# Parar MySQL
docker compose down

# ─── PYTHON ────────────────────────────────────

# Testar import do model
python3 -c "from src.domain.quiz.model.quiz_model import Quiz; print(Quiz.__tablename__)"
```

---

## Perguntas para fixação

1. O que acontece se eu esquecer de importar o model no `env.py`?
2. Por que `target_metadata` precisa ser `Base.metadata` e não um model específico?
3. Qual a diferença entre `session.add()`, `session.commit()` e `session.refresh()`?
4. O que `Depends(get_session)` faz exatamente?
5. Por que usamos `yield` em vez de `return` no `get_session()`?
6. Por que o model usa `String(36)` em vez de `PG_UUID`?
7. O que muda entre PUT e PATCH na API?
