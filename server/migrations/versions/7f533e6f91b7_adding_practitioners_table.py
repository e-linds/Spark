"""adding practitioners table

Revision ID: 7f533e6f91b7
Revises: 096c5a138e85
Create Date: 2024-01-19 13:27:30.987688

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7f533e6f91b7'
down_revision = '096c5a138e85'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('practitioners',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('sessions', schema=None) as batch_op:
        batch_op.add_column(sa.Column('practioner_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_sessions_practioner_id_practitioners'), 'practitioners', ['practioner_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('sessions', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_sessions_practioner_id_practitioners'), type_='foreignkey')
        batch_op.drop_column('practioner_id')

    op.drop_table('practitioners')
    # ### end Alembic commands ###
