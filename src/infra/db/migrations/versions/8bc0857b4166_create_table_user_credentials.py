"""create table user_credentials

- Cria a tabela user_credentials para armazenar senhas hasheadas
- FK para users(id) com delete em cascata
- Colunas: user_id (PK+FK), password, last_password_change, fail_attempts

Revision ID: 8bc0857b4166
Revises: e5ea94240770
Create Date: 2026-06-11

"""
from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = '8bc0857b4166'
down_revision: Union[str, Sequence[str], None] = 'e5ea94240770'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        CREATE TABLE user_credentials (
            user_id INT NOT NULL,
            password VARCHAR(255) NOT NULL,
            last_password_change DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            fail_attempts INT NOT NULL DEFAULT 0,
            PRIMARY KEY (user_id),
            CONSTRAINT fk_user_credentials_user
                FOREIGN KEY (user_id) REFERENCES users(id)
                ON DELETE CASCADE
        )
    """)


def downgrade() -> None:
    op.execute("DROP TABLE IF EXISTS user_credentials")
