"""atualiza model quiz para mysql

Revision ID: 27bca3cbedfd
Revises: dfe98ffa69ac
Create Date: 2026-06-06 00:13:43.886981

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '27bca3cbedfd'
down_revision: Union[str, Sequence[str], None] = 'dfe98ffa69ac'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
