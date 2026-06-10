"""alter_table_teachers_add_auth_columns

# Migration: ALTER_TABLE_TEACHERS_ADD_AUTH_COLUMNS
# Adiciona as colunas password e username na tabela teachers
# para suportar autenticação de professores.

Revision ID: 456815865303
Revises: e5ea94240770
Create Date: 2026-06-10 01:53:18.749485

"""
from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = '456815865303'
down_revision: Union[str, Sequence[str], None] = 'e5ea94240770'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        ALTER TABLE teachers
        ADD COLUMN password VARCHAR(255) NOT NULL,
        ADD COLUMN username VARCHAR(255) NOT NULL
    """)


def downgrade() -> None:
    op.execute("""
        ALTER TABLE teachers
        DROP COLUMN password,
        DROP COLUMN username
    """)
