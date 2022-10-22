"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory, render_template
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, Image, Product
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager
from datetime import timedelta

from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from werkzeug.utils import secure_filename


ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


ENV = os.getenv("FLASK_ENV")
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# Setup the variables to upload images
UPLOAD_FOLDER = 'static/pictures'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)
jwt = JWTManager(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)

# GET IMAGE
@app.route("/image/<int:id>", methods=['GET'])
def show_image(id):
    image = Image.query.filter_by(id=id).first()
    full_filename=image.path
    print("full_filename")
    print(full_filename)
    return render_template("picture.html", user_image = full_filename)

# CREATE NEW PRODUCT
@app.route("/product", methods=['POST'])
@jwt_required()

def new_product():
    # request_body = request.get_json(force=True)
    request_body = {}

    user_id = request.form.get('user_id')
    request_body['user_id'] = user_id

    name = request.form.get('name')
    request_body['name'] = name

    stock = request.form.get('stock')
    request_body['stock'] = stock

    type = request.form.get('type')
    request_body['type'] = type

    price = request.form.get('price')
    request_body['price'] = price

    unit = request.form.get('unit')
    request_body['unit'] = unit

    location = request.form.get('location')
    request_body['location'] = location

    description = request.form.get('description')
    request_body['description'] = description

    print("request_body")
    print(request_body)

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

        new_prod = new_product.serialize()
        product_id = new_prod['id']
        pic = request.files['pic']

        print("pic")
        print(pic)

        print("confirming Im in app.py")

        if pic:
            picname = request.form.get('picname')
            if allowed_file(picname):
                picname_secure = secure_filename(picname)
                print("picname_secure")
                print(picname_secure)
                print("os.path")
                print(os.path)
                print ("os.getcwd()")
                print (os.getcwd())
                BPpath= "BP"+str(product_id)
                # join(os.getcwd(), static, pictures)
                # target=os.path.join(os.path.sep,'static','pictures','test_docs')
                target=os.path.join(app.config['UPLOAD_FOLDER'],BPpath)
                print("target")
                print(target)
                if not os.path.isdir(target):
                    os.makedirs(target)
                destination="/".join([target, picname_secure])
                pic.save(destination)

                mimetype = pic.mimetype
                print("mimetype")
                print(mimetype)
                new_prod = new_product.serialize()
                product_id = new_prod['id']
                print("product_id")
                print(product_id)
                img = Image(path=destination, mimetype=mimetype, name=picname, product_id=product_id)
                db.session.add(img)
                db.session.commit()

                new_prod['img'] = img.serialize()
                return jsonify(new_prod),200

        return jsonify(new_product.serialize()), 200