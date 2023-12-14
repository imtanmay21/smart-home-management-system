from flask import Flask
from models import db
from routes.customer_routes import customer_blueprint
from routes.device_routes import device_blueprint
from routes.location_routes import location_blueprint
from routes.energy_routes import energy_blueprint
from flask_cors import CORS
from urllib.parse import quote

app = Flask(__name__)

# Assuming 'password' is your actual password containing special characters
password = 'tanmay@2112'
encoded_password = quote(password, safe='')

# app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://root:{encoded_password}@localhost:3306/SHEMS'

# Database configuration
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:tanmay@2112@localhost:3306/SHEMS'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@127.0.0.1:3306/SHEMS'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)


# Enable CORS for all routes
CORS(app)

# Register Blueprints
app.register_blueprint(customer_blueprint, url_prefix='/customers')
app.register_blueprint(device_blueprint, url_prefix='/devices')
app.register_blueprint(location_blueprint, url_prefix='/locations')
app.register_blueprint(energy_blueprint, url_prefix='/energy')

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
