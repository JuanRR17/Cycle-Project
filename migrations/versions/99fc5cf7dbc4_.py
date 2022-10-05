"""empty message

Revision ID: 99fc5cf7dbc4
Revises: 8ba7dedd0df1
Create Date: 2022-10-04 17:53:06.321935

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '99fc5cf7dbc4'
down_revision = '8ba7dedd0df1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('status',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('usable_by_buyer', sa.Boolean(), nullable=True),
    sa.Column('usable_by_source', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('type',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('unit',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('unit', sa.String(length=120), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('unit')
    )
    op.create_table('basket',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('total', sa.Numeric(precision=120), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('by_product',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('type_id', sa.Integer(), nullable=True),
    sa.Column('unit_id', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('stock', sa.String(length=120), nullable=True),
    sa.Column('price', sa.Numeric(precision=120), nullable=True),
    sa.Column('locationX', sa.Numeric(precision=120), nullable=True),
    sa.Column('locationY', sa.Numeric(precision=120), nullable=True),
    sa.Column('description', sa.String(length=120), nullable=True),
    sa.ForeignKeyConstraint(['type_id'], ['type.id'], ),
    sa.ForeignKeyConstraint(['unit_id'], ['unit.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('order',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.Column('status_id', sa.Integer(), nullable=True),
    sa.Column('total', sa.Numeric(precision=120), nullable=True),
    sa.Column('address', sa.String(length=120), nullable=True),
    sa.Column('location', sa.String(length=120), nullable=True),
    sa.ForeignKeyConstraint(['status_id'], ['status.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('basket_row',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('basket_id', sa.Integer(), nullable=True),
    sa.Column('by_product_id', sa.Integer(), nullable=True),
    sa.Column('quantity', sa.Numeric(precision=120), nullable=True),
    sa.Column('subtotal', sa.Numeric(precision=120), nullable=True),
    sa.ForeignKeyConstraint(['basket_id'], ['basket.id'], ),
    sa.ForeignKeyConstraint(['by_product_id'], ['by_product.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('image',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('img', sa.Text(), nullable=False),
    sa.Column('mimetype', sa.Text(), nullable=False),
    sa.Column('by_product_id', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('is_default', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['by_product_id'], ['by_product.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('img')
    )
    op.create_table('order_row',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('order_id', sa.Integer(), nullable=True),
    sa.Column('by_product_id', sa.Integer(), nullable=True),
    sa.Column('quantity', sa.Numeric(precision=120), nullable=True),
    sa.Column('subtotal', sa.Numeric(precision=120), nullable=True),
    sa.ForeignKeyConstraint(['by_product_id'], ['by_product.id'], ),
    sa.ForeignKeyConstraint(['order_id'], ['order.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('user', sa.Column('username', sa.String(length=120), nullable=False))
    op.add_column('user', sa.Column('phone', sa.Integer(), nullable=True))
    op.add_column('user', sa.Column('location', sa.String(length=120), nullable=True))
    op.add_column('user', sa.Column('company', sa.String(length=120), nullable=True))
    op.alter_column('user', 'is_active',
               existing_type=sa.BOOLEAN(),
               nullable=True)
    op.create_unique_constraint(None, 'user', ['phone'])
    op.create_unique_constraint(None, 'user', ['username'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'user', type_='unique')
    op.drop_constraint(None, 'user', type_='unique')
    op.alter_column('user', 'is_active',
               existing_type=sa.BOOLEAN(),
               nullable=False)
    op.drop_column('user', 'company')
    op.drop_column('user', 'location')
    op.drop_column('user', 'phone')
    op.drop_column('user', 'username')
    op.drop_table('order_row')
    op.drop_table('image')
    op.drop_table('basket_row')
    op.drop_table('order')
    op.drop_table('by_product')
    op.drop_table('basket')
    op.drop_table('unit')
    op.drop_table('type')
    op.drop_table('status')
    # ### end Alembic commands ###