from flask import Flask
from models import db
from routes.customer_routes import customer_blueprint
from routes.device_routes import device_blueprint
from routes.location_routes import location_blueprint
from routes.energy_routes import energy_blueprint

app = Flask(__name__)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@127.0.0.1:3306/SHEMS'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

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
