from flask_sqlalchemy import SQLAlchemy
import datetime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    phone = db.Column(db.String(120), default="")
    location = db.Column(db.String(120), default="")
    company = db.Column(db.String(120), default="")

    basket = relationship("Basket", back_populates="user", uselist=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "phone": self.phone,
            "location": self.location,
            "company":self.company,
            "password":self.password
            # do not serialize the password, its a security breach
        }

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    name = db.Column(db.String(120), nullable=False)
    stock = db.Column(db.Integer)
    type = db.Column(db.String(120))
    price = db.Column(db.Integer)
    unit = db.Column(db.String(120))
    location = db.Column(db.String(120))
    description = db.Column(db.String(120))

    user = db.relationship('User', backref='products')
    

    def __repr__(self):
        return f'<Product {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "stock": self.stock,
            "type": self.type,
            "price": self.price,
            "unit": self.unit,
            "location": self.location,
            "description":self.description
        }

class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    img = db.Column(db.Text, unique=True, nullable=False)
    mimetype = db.Column(db.Text, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    name = db.Column(db.String(120), nullable=False)
    is_default = db.Column(db.Boolean(), nullable=False)

    product = db.relationship('Product', backref='images')

    def __repr__(self):
        return f'<Image {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "img": self.img,
            "mimetype": self.mimetype,
            "product_id": self.product_id,
            "name": self.name,
            "is_default": self.is_default
        }

class Status(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    usable_by_buyer = db.Column(db.Boolean())
    usable_by_source = db.Column(db.Boolean())

    def __repr__(self):
        return f'<Status {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "usable_by_buyer": self.usable_by_buyer,
            "usable_by_source": self.usable_by_source
        }

class Favourite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))

    user = db.relationship('User', backref='favourites')
    product = db.relationship('Product', backref='favourites')
    
    def __init__(self, user_id, product_id):
        self.user_id = user_id
        self.product_id = product_id

    def __repr__(self):
        return f'<Favourite {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "product_id": self.product_id
            # "product":self.product.serialize()
        }


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    status_id = db.Column(db.Integer, db.ForeignKey('status.id'))
    total = db.Column(db.Numeric(120))
    address = db.Column(db.String(120))
    location = db.Column(db.String(120))

    user = db.relationship('User', backref='orders')
    status = db.relationship('Status', backref='orders')

    def __repr__(self):
        return f'<Order {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "created_at": self.created_at,
            "status_id": self.status_id,
            "total": self.total,
            "address": self.address,
            "location": self.location
        }

class OrderRow(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    quantity = db.Column(db.Numeric(120))
    subtotal = db.Column(db.Numeric(120))

    order = db.relationship('Order', backref='order_rows')
    product = db.relationship('Product', backref='order_rows')

    def __repr__(self):
        return f'<Order_Row {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "order_id": self.order_id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "subtotal": self.subtotal,
            "product":self.product
        }
    
class Basket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    total = db.Column(db.Numeric(120))

    user = db.relationship('User', back_populates='basket')

    def __repr__(self):
        return f'<Basket {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "total": self.total
        }

class BasketRow(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    basket_id = db.Column(db.Integer, db.ForeignKey('basket.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    quantity = db.Column(db.Numeric(120))
    subtotal = db.Column(db.Numeric(120))

    basket = db.relationship('Basket', backref='basket_rows')
    product = db.relationship('Product', backref='basket_rows')

    def __repr__(self):
        return f'<BasketRow {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "order_id": self.order_id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "subtotal": self.subtotal
        }