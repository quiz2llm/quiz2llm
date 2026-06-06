"""create_table_quiz

Revision ID: dfe98ffa69ac
Revises: 
Create Date: 2026-06-05 19:32:28.007538

"""
from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = 'dfe98ffa69ac'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        CREATE TABLE quiz (
            id VARCHAR(36) PRIMARY KEY,
            title VARCHAR(200) NOT NULL,
            main_text TEXT NOT NULL,
            question JSON NULL,
            student VARCHAR(150) NOT NULL,
            when_created DATETIME NOT NULL,
            when_answered DATETIME NULL
        )
    """)


def downgrade() -> None:
    op.execute("DROP TABLE IF EXISTS quiz")
