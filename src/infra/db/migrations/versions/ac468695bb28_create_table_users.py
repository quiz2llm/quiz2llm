"""create table users

Revision ID: ac468695bb28
Revises: 27bca3cbedfd
Create Date: 2026-06-06 20:02:12.415360

"""
from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = 'ac468695bb28'
down_revision: Union[str, Sequence[str], None] = '27bca3cbedfd'
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
