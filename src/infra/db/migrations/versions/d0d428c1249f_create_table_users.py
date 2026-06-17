"""create_table_users

Cria a tabela users com suporte a herança polimórfica (STUDENT/TEACHER)
- id: chave primária auto-incremento
- name: nome do usuário
- create_at: data de criação
- role: ENUM('STUDENT', 'TEACHER') para discriminação polimórfica

Revision ID: d0d428c1249f
Revises: 
Create Date: 2026-06-17 16:02:26.675149

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd0d428c1249f'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        CREATE TABLE users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            create_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            role ENUM('STUDENT', 'TEACHER') NOT NULL DEFAULT 'STUDENT'
        )
    """)


def downgrade() -> None:
    op.execute("DROP TABLE IF EXISTS users")
