"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
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
        fields = list(new_user.serialize().keys())
        fields.remove("id")

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

# GET ONE USER DATA
@api.route("/user", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()

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
        elif 'password' not in request_keys or request_body['password']=="":
            return jsonify({"msg":'You need to specify the password'}), 400
        elif User.query.filter_by(email = request_body['email']).first() != None and request_body['email']!=user.email:
            return jsonify({"msg":'This email is already in use'}),500
        elif User.query.filter_by(username = request_body['username']).first() != None and request_body['username']!=user.username:
            return jsonify({"msg":'This username is already in use'}),500
        else:
            fields = list(user.serialize().keys())
            fields.remove("id")
            unvalid_fields = []
            for f in request_body:
                if f in fields:
                    # if f == "id":
                    #     return jsonify({"msg":"You cant modify id"}),400
                    # elif f == "phone":
                    #     setattr(user, f, int(request_body[f]))
                    # else:
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

# CREATE NEW BYPRODUCT
@api.route("/byproduct/create", methods=['POST'])
@jwt_required()

def new_byproduct():
    # Access the identity of the current user with get_jwt_identity
    request_body = request.get_json(force=True)
    request_keys = list(request_body.keys())

    if 'name' not in request_keys or request_body['name']=="":
        return jsonify({"msg":'You need to specify the name'}),400
    elif ByProduct.query.filter_by(name = request_body['name']).first() != None:
        return jsonify({"msg":'This name is already in use'}),500
    else:

        new_byproduct = ByProduct()
        fields = list(new_byproduct.serialize().keys())
        fields.remove("id")

        gen = (f for f in fields if f in request_keys)
        for f in gen:
            if request_body[f] != "":
                setattr(new_byproduct, f, request_body[f])

        db.session.add(new_byproduct)
        db.session.commit()
        return jsonify(new_byproduct.serialize()), 200