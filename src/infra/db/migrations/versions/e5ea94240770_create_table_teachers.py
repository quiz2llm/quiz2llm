"""create table teachers

Revision ID: e5ea94240770
Revises: 9e004e9ab6ad
Create Date: 2026-06-06 20:02:12.415444

"""
from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = 'e5ea94240770'
down_revision: Union[str, Sequence[str], None] = '9e004e9ab6ad'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        CREATE TABLE teachers (
            id INT PRIMARY KEY,
            teacher_uuid VARCHAR(36) NOT NULL UNIQUE,
            FOREIGN KEY (id) REFERENCES users(id)
        )
    """)


def downgrade() -> None:
    op.execute("DROP TABLE IF EXISTS teachers")
