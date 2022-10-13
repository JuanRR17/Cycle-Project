"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product, Favourite
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

# Create Flask app
api = Blueprint('api', __name__)

# SIGN UP
@api.route("/signup", methods=['POST'])
def sign_up():
    request_body = request.get_json(force=True)
    request_keys = list(request_body.keys())

    if 'username' not in request_keys or request_body['username']=="":
        return jsonify({"msg":'You need to specify the username'}),400
    elif 'email' not in request_keys or request_body['email']=="":
        return jsonify({"msg":'You need to specify the email'}), 400
    elif 'password' not in request_keys or request_body['password']=="":
        return jsonify({"msg":'You need to specify the password'}), 400
    elif User.query.filter_by(email = request_body['email']).first() != None:
        return jsonify({"msg":'This email is already in use'}),500
    elif User.query.filter_by(username = request_body['username']).first() != None:
        return jsonify({"msg":'This username is already in use'}),500
    else:

        new_user = User()
        fields = ["username","email","password","phone","location","company"]

        gen = (f for f in fields if f in request_keys)
        for f in gen:
            if request_body[f] != "":
                setattr(new_user, f, request_body[f])

        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.serialize()), 200

# GET ALL USERS
@api.route("/users", methods=['GET'])
def get_users():
    all_users = User.query.all()
    all_users = list(map(lambda x: x.serialize(), all_users))
    json_text = jsonify(all_users)
    return json_text

# CREATE JWT TOKEN
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    userEmailCheck = User.query.filter_by(email=email).first()
    if userEmailCheck == None:
        return jsonify({"msg":"This user doesn\'t exist"}),401
    else:
        user = User.query.filter_by(email=email, password=password).first()
        if user == None:
            return jsonify({"msg": "Wrong password"}), 401
        else:
            access_token = create_access_token(identity=email)
            return jsonify(access_token=access_token), 200

# GET CURRENT USER DATA
@api.route("/user", methods=["GET"])
@jwt_required()
def protected():
    print("get current user data")
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    search = User.query.filter_by(email=current_user).first()

    all_favourites = []
    user_favourites = Favourite.query.filter_by(user_id=search.id)
    for f in user_favourites:
        if f.product != None:
            favourite = dict(f.serialize())
            favourite['product']=f.product.serialize()
            all_favourites.append(favourite)
    
    user_products = Product.query.filter_by(user_id=search.id)
    user_products = list(map(lambda x: x.serialize(), user_products))

    user = search.serialize()
    user['favourites'] = all_favourites
    user['products'] = user_products

    return jsonify(user), 200

# GET ONE USER DATA
@api.route("/user/<int:id>", methods=["GET"])
def get_user(id):
    user = User.query.filter_by(id=id).first()

    return jsonify(user.serialize()), 200

# UPDATE USER
@api.route('/user/<int:id>', methods=['PUT'])
@jwt_required()
def update_user(id):
    # Access the identity of the current user with get_jwt_identity
    user = User.query.filter_by(id=id).first()
    if user != None:
        request_body = request.get_json(force=True)
        request_keys = list(request_body.keys())

        if 'username' not in request_keys or request_body['username']=="":
            return jsonify({"msg":'You need to specify the username'}),400
        elif 'email' not in request_keys or request_body['email']=="":
            return jsonify({"msg":'You need to specify the email'}), 400
        elif User.query.filter_by(email = request_body['email']).first() != None and request_body['email']!=user.email:
            return jsonify({"msg":'This email is already in use'}),500
        elif User.query.filter_by(username = request_body['username']).first() != None and request_body['username']!=user.username:
            return jsonify({"msg":'This username is already in use'}),500
        else:
            fields = ["username","email","password","phone","location","company"]

            unvalid_fields = []
            for f in request_body:
                if f in fields:
                    if f!="password":
                        setattr(user, f, request_body[f])
                    elif request_body[f]!="":
                        setattr(user, f, request_body[f])
                else:
                    unvalid_fields.append(f)
            if len(unvalid_fields)>0:
                return jsonify({"msg":f"These fields are not valid: {unvalid_fields}"}),400
            else:
                db.session.commit()
                return jsonify(user.serialize()),200
    else:
        return jsonify({"msg":"This user doesnt exist"}),500
    
# DELETE USER
@api.route('/user/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_user(id):
    try:
        user = User.query.filter_by(id=id).first()
        if user == None:
            raise Exception()
    except Exception:
        return jsonify({"msg":"This user doesn\'t exist"}),500
    else:
        db.session.delete(user)
        db.session.commit()
        return jsonify(user.serialize()),200

# CREATE NEW PRODUCT
@api.route("/product", methods=['POST'])
@jwt_required()

def new_product():
    request_body = request.get_json(force=True)
    request_keys = list(request_body.keys())

    if 'name' not in request_keys or request_body['name']=="":
        return jsonify({"msg":'You need to specify the name'}),400
    else:
        new_product = Product()
        fields = list(new_product.serialize().keys())
        fields.remove("id")

        gen = (f for f in fields if f in request_keys)
        for f in gen:
            if request_body[f] != "":
                setattr(new_product, f, request_body[f])

        db.session.add(new_product)
        db.session.commit()
        return jsonify(new_product.serialize()), 200

# GET ALL PRODUCTS
@api.route("/products", methods=['GET'])

def get_products():
    products = Product.query.all()
    all_products=[]
    for p in products:
        if p.user != None:
            product = dict(p.serialize())
            product['user']=p.user.serialize()
            all_products.append(product)
    return jsonify(all_products)

# GET ONE PRODUCT DATA
@api.route("/product/<int:id>", methods=["GET"])
def get_product(id):
    search = db.session.query(Product, User).filter(User.id == Product.user_id).filter(Product.id == id).first()
    product_and_user = list(map(lambda x: x.serialize(), search))
    product = dict(product_and_user[0])
    user = dict(product_and_user[1])
    product['user'] = user
    return jsonify(product), 200

# DELETE PRODUCT
@api.route('/product/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_product(id):
    try:
        product = Product.query.filter_by(id=id).first()
        if product == None:
            raise Exception()
    except Exception:
        return jsonify({"msg":"This product doesn\'t exist"}),500
    else:
        db.session.delete(product)
        db.session.commit()
        return jsonify(product.serialize()),200

# UPDATE PRODUCT
@api.route('/product/<int:id>', methods=['PUT'])
@jwt_required()
def update_product(id):
    product = Product.query.filter_by(id=id).first()
    if product != None:
        request_body = request.get_json(force=True)
        request_keys = list(request_body.keys())

        if 'name' not in request_keys or request_body['name']=="":
            return jsonify({"msg":'You need to specify the name'}),400
        else:
            fields = list(product.serialize().keys())
            fields.remove("id")
            unvalid_fields = []
            for f in request_body:
                if f in fields:
                    setattr(product, f, request_body[f])
                else:
                    unvalid_fields.append(f)
            if len(unvalid_fields)>0:
                return jsonify({"msg":f"These fields are not valid: {unvalid_fields}"}),400
            else:
                db.session.commit()
                return jsonify(product.serialize()),200
    else:
        return jsonify({"msg":"This product doesnt exist"}),500

# ADD FAVOURITE
@api.route("/favourite", methods=['POST'])
@jwt_required()

def add_favourite():
    request_body = request.get_json(force=True)
    user_id = request_body['user_id']
    product_id = request_body['product_id']

    new_favourite = Favourite(user_id, product_id)

    db.session.add(new_favourite)
    db.session.commit()

    favorite = new_favourite.serialize()
    favorite['product']=new_favourite.product.serialize()
    return jsonify(favorite), 200

# REMOVE FAVOURITE
@api.route('/favourite/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_favourite(id):
    try:
        favourite = Favourite.query.filter_by(id=id).first()
        if favourite == None:
            raise Exception()
    except Exception:
        return jsonify({"msg":"This favourite doesn\'t exist"}),500
    else:
        db.session.delete(favourite)
        db.session.commit()
        return jsonify(favourite.serialize()),200
