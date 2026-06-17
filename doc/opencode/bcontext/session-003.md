# Context Version Session-003

**Date:** 2026-06-17  
**Project:** `quiz2llm`  
**Author:** kani0dev  
**Session Objective:** Remoção da quiz model, reset Alembic e início de microservice architecture

---

## Summary

O model e migration do quiz foram removidos da base de código como primeiro passo da migração para arquitetura de microsserviços (quiz será movido para serviço separado). A remoção da migration raiz (quiz) quebrou a cadeia do Alembic, exigindo um reset completo: tabela `alembic_version` dropada, migrations antigas deletadas, e 4 novas migrations recriadas (users, students, teachers, user_credentials) com VARCHAR(36) para compatibilidade com UUID7. As tabelas existentes foram preservadas via `alembic stamp head`.

---

## Actions Taken

### 1. Remoção do Quiz Model e Migration
- **Commits:** `6e9df124` (refactor) + `0fdbb8ac` (fix)
- Arquivo `src/domain/quiz_model.py` deletado
- Migration raiz `27bca3cbedfd` (CREATE_TABLE_QUIZ) deletada
- Controller e service do quiz removidos (`quiz_controller.py`, `quiz_service.py`, `quiz_request.py`, `quiz_response.py`)

### 2. Validação dos Models Existentes
**Issues encontradas:**

| Model | Issue | Severidade |
|-------|-------|------------|
| `Student.student_uuid` | `String` sem length definido; migration usava `VARCHAR(32)` | Medium |
| Student + Teacher | `uuid.uuid4()` gera 36 chars, mas `VARCHAR(32)` só cabe 32 | **High** |
| `ac468695bb28` | Syntax error: `down_revision: = None` (faltava type hint) | **High** |
| `faab011eb09b` | Migration vazia (`upgrade()` = `pass`) | Medium |

### 3. Upgrade de Segurança: uuid4 → uuid7
- `Student.py`: `uuid.uuid4()` → `uuid.uuid7()`
- `Teacher.py`: `uuid.uuid4()` → `uuid.uuid7()`
- UUID7 gera identificadores ordenáveis por timestamp, reduzindo fragmentação em índices e aumentando segurança vs UUID4 puramente aleatório.

### 4. Hard Reset do Alembic
- Drop da tabela `alembic_version` no MySQL
- Deleção de todos os 5 arquivos de migration antigos em `versions/`

### 5. Criação de 4 Novas Migrations (sequenciais)

| # | Migration ID | Nome | SQL |
|---|-------------|------|-----|
| 1 | `d0d428c1249f` | `create_table_users` | `CREATE TABLE users (id INT AUTO_INCREMENT PK, name VARCHAR(100), create_at DATETIME, role ENUM('STUDENT','TEACHER'))` |
| 2 | `e4f3d58cc1ef` | `create_table_students` | `CREATE TABLE students (id INT PK FK→users(id), student_uuid VARCHAR(36) UNIQUE)` |
| 3 | `c4290d110035` | `create_table_teachers` | `CREATE TABLE teachers (id INT PK FK→users(id), teacher_uuid VARCHAR(36) UNIQUE)` |
| 4 | `f60040853d77` | `create_table_user_credentials` | `CREATE TABLE user_credentials (user_id INT PK FK→users(id) ON DELETE CASCADE, password VARCHAR(255), last_password_change DATETIME, fail_attempts INT)` |

**Diferenças das migrations antigas:**
- `student_uuid` agora é `VARCHAR(36)` (antes `VARCHAR(32)`) — compatível com UUID7
- Migration vazia `removed_uuid_limit` não foi recriada
- Syntax error `down_revision: = None` corrigido (template mako gera type hint correto)

### 6. Stamp Head (dados preservados)
```bash
alembic stamp head
# → f60040853d77 (head)
```
As tabelas já existiam no banco com dados. O `stamp` apenas registrou a revisão atual sem executar DDL.

---

## Files Changed

### Created
- `src/infra/db/migrations/versions/d0d428c1249f_create_table_users.py`
- `src/infra/db/migrations/versions/e4f3d58cc1ef_create_table_students.py`
- `src/infra/db/migrations/versions/c4290d110035_create_table_teachers.py`
- `src/infra/db/migrations/versions/f60040853d77_create_table_user_credentials.py`

### Modified
- `src/domain/user/Student.py` — `uuid4()` → `uuid7()`
- `src/domain/user/Teacher.py` — `uuid4()` → `uuid7()`

### Deleted (em commits anteriores)
- `src/domain/quiz_model.py`
- `src/infra/db/migrations/versions/27bca3cbedfd_*.py` (migration quiz raiz)
- `src/app/controller/quiz_controller.py`
- `src/app/service/quiz_service.py`
- `src/app/controller/request/quiz_request.py`
- `src/app/controller/response/quiz_response.py`
- Migrations antigas: `ac468695bb28`, `9e004e9ab6ad`, `e5ea94240770`, `8bc0857b4166`, `faab011eb09b`

---

## Technical Decisions

| Decisão | Justificativa |
|---------|---------------|
| **Hard reset (drop + recreate)** | A cadeia de migrations estava quebrada (migration raiz removida). Reset limpo era a única forma segura de restaurar o Alembic. |
| **Stamp em vez de upgrade** | Tabelas já existiam com dados. `stamp` evita perda de dados e conflitos de DDL. |
| **VARCHAR(36) para UUIDs** | UUID7 (e UUID4) geram strings de 36 caracteres com traços. `VARCHAR(32)` truncaria os dados. |
| **UUID7 sobre UUID4** | UUID7 é ordenável por timestamp (menos fragmentação em índices B-tree) e mais seguro por ser imprevisível dentro do mesmo milissegundo. |
| **Migration por tabela** | Segue a regra de nomenclatura `(sql_operation)_(what)_(name)` — uma migration por operação para rastreabilidade. |

---

## Notable Changes

- **Quiz removido da base de código** — Primeiro passo da migração para microsserviços. O quiz será gerenciado por um serviço separado.
- **student_uuid VARCHAR(32) → VARCHAR(36)** — Correção de bug silencioso: UUIDs de 36 caracteres estavam sendo armazenados em coluna de 32, causando truncamento silencioso.
- **Segurança de UUID aumentada** — Troca de UUID4 (aleatório puro) para UUID7 (timestamp + aleatório), reduzindo chance de colisão e melhorando performance de índice.
- **Migration vazia eliminada** — `removed_uuid_limit` (`faab011eb09b`) foi descartada por não conter operações reais.
- **Dados preservados** — Apesar do reset completo do Alembic, as tabelas e dados existentes não foram afetados.

---

## Version History

| Entry | Date | Description |
|-------|------|-------------|
| Session-001 | 2026-06-06 | Correções de domínios SQLAlchemy + migrações Alembic |
| Session-002 | 2026-06-10 | Refatoração frontend — arquitetura Ant Design |
| Session-003 | 2026-06-17 | Remoção do quiz model, reset Alembic, uuid4→uuid7, e início de microservice architecture |
