"""empty message

Revision ID: 39700e34a8ec
Revises: cbb1dac13678
Create Date: 2022-10-20 17:49:25.058228

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '39700e34a8ec'
down_revision = 'cbb1dac13678'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('image', 'is_default')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('image', sa.Column('is_default', sa.BOOLEAN(), autoincrement=False, nullable=False))
    # ### end Alembic commands ###
