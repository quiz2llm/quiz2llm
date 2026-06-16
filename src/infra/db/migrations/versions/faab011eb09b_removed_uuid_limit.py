"""removed - uuid limit

Revision ID: faab011eb09b
Revises: 8bc0857b4166
Create Date: 2026-06-16 01:11:40.550131

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'faab011eb09b'
down_revision: Union[str, Sequence[str], None] = '8bc0857b4166'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
