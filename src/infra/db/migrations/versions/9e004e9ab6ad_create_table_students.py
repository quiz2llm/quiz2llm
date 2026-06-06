"""create table students

Revision ID: 9e004e9ab6ad
Revises: ac468695bb28
Create Date: 2026-06-06 20:02:12.415426

"""
from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = '9e004e9ab6ad'
down_revision: Union[str, Sequence[str], None] = 'ac468695bb28'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        CREATE TABLE students (
            id INT PRIMARY KEY,
            student_uuid VARCHAR(32) NOT NULL UNIQUE,
            FOREIGN KEY (id) REFERENCES users(id)
        )
    """)


def downgrade() -> None:
    op.execute("DROP TABLE IF EXISTS students")
