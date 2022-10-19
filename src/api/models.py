from flask_sqlalchemy import SQLAlchemy
import datetime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from sqlalchemy import Float

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    phone = db.Column(db.String(120), default="")
    location = db.Column(db.String(120), default="")
    company = db.Column(db.String(120), default="")

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
            # "password":self.password
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
        }


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    seller = db.Column(db.String(120))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    total = db.Column(db.FLOAT())
    address = db.Column(db.String(120))
    location = db.Column(db.String(120))
    cp = db.Column(db.String(120))
    country = db.Column(db.String(120))
    phone = db.Column(db.String(120))
    company = db.Column(db.String(120))

    user = db.relationship('User', backref='orders')

    def __repr__(self):
        return f'<Order {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "seller": self.seller,
            "created_at": self.created_at,
            "total": self.total,
            "address": self.address,
            "location": self.location,
            "cp": self.cp,
            "country": self.country,
            "phone": self.phone,
            "company": self.company,
        }

class OrderRow(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    quantity = db.Column(db.FLOAT(), default=0)
    subtotal = db.Column(db.FLOAT(), default=0)

    order = db.relationship('Order', backref='order_rows')
    product = db.relationship('Product', backref='order_rows')

    def __repr__(self):
        return f'<Order_Row {self.id}>'

    def __init__(self, order_id, product_id, quantity, subtotal):
        self.order_id = order_id
        self.product_id = product_id
        self.quantity = quantity
        self.subtotal = subtotal

    def serialize(self):
        return {
            "id": self.id,
            "order_id": self.order_id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "subtotal": self.subtotal,
            # "subtotal": self.calculate_subtotal(),
            # "product":self.product
        }

class BasketItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    quantity = db.Column(db.FLOAT())
    subtotal = db.Column(db.FLOAT())

    product = db.relationship('Product', backref='basket_items')
    user = db.relationship('User', backref='basket_items')

    def __init__(self, user_id, product_id, quantity=1, subtotal=0):
        self.user_id = user_id
        self.product_id = product_id
        self.quantity = quantity
        self.subtotal = subtotal

    def __repr__(self):
        return f'<BasketItem {self.id}>'

    def calculate_subtotal(self):
        return self.quantity*self.product.price

    def serialize(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "user_id": self.user_id,
            "quantity":self.quantity,
            "subtotal": self.subtotal,
            # "subtotal": self.calculate_subtotal()
        }