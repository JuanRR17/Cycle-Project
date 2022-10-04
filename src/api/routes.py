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
    if len(request_keys)==0:
        return "The request body is null", 400
    elif 'username' not in request_keys or request_body['username']=="":
        return 'You need to specify the username',400
    elif 'email' not in request_keys or request_body['email']=="":
        return 'You need to specify the email', 400
    elif 'password' not in request_keys or request_body['password']=="":
        return 'You need to specify the password', 400
    elif User.query.filter_by(email = request_body['email']).first() != None:
        return 'This email is already in use',500
    elif User.query.filter_by(username = request_body['username']).first() != None:
        return 'This username is already in use',500
    else:
        # email = request_body['email']
        # username = request_body['username']
        # password = request_body['password']

        new_user = User()
        fields = list(new_user.serialize().keys())
        fields.remove("id")
        fields.remove("is_active")
        fields.append("password")

        return jsonify(fields)

        # db.session.add(new_user)
        # db.session.commit()
        # return jsonify(new_user.serialize()), 200

# GET ALL USERS
@api.route("/users", methods=['GET'])
def get_users():
    all_users = User.query.all()
    all_users = list(map(lambda x: x.serialize(), all_users))
    json_text = jsonify(all_users)
    return json_text