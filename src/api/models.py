from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    is_active = db.Column(db.Boolean(), default=False)
    phone = db.Column(db.Integer(80), unique=True)
    location = db.Column(db.String(120))
    company = db.Column(db.String(120))

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "is_active": self.is_active,
            "phone": self.phone,
            "location": self.location,
            "company":self.company
            # do not serialize the password, its a security breach
        }

class By_Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    name = db.Column(db.String(120), nullable=False)
    price = db.Column(db.String(120), unique=True, nullable=False)
    locationX = db.Column(db.Numeric(120), nullable=False)
    locationY = db.Column(db.Numeric(120), nullable=False)
    type = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<By_Product {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "price": self.price,
            "phone": self.phone,
            "locationX": self.locationX,
            "locationY":self.locationY,
            "type": self.type,
            "description":self.description,
        }

class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    name = db.Column(db.String(120), nullable=False)
    is_default = db.Column(db.Boolean(),)

    def __repr__(self):
        return f'<Image {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "name": self.name,
            "is_default": self.is_default
        }
