from flask import Blueprint, jsonify, request
from services.device_service import list_devices_energy, get_device_types, get_models_by_type, add_device, get_energy_consumption_per_device
from datetime import datetime, timedelta

device_blueprint = Blueprint('device_blueprint', __name__)


# Get all device types
@device_blueprint.route('/types', methods=['GET'])
def list_device_types():
    try:
        types = get_device_types()
        return jsonify(types), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# Get all device models of a type
@device_blueprint.route('/models', methods=['GET'])
def list_models():
    device_type = request.args.get('type')
    try:
        models = get_models_by_type(device_type)
        return jsonify(models), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# Add a new device at a location
@device_blueprint.route('/add', methods=['POST'])
def add_new_device():
    data = request.get_json()
    try:
        result = add_device(data['customer_id'], data['location_id'], data['device_type'], data['model_number'])
        return jsonify(result), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# Energy consunption of device in last 24 hours    
@device_blueprint.route('/customer/<int:customer_id>/devices_energy_24_hours', methods=['GET'])
def get_devices_energy_24_hours(customer_id):
    try:
        end_time = datetime.now()
        start_time = end_time - timedelta(hours=24)
        devices = list_devices_energy(customer_id, start_time, end_time)
        return jsonify(devices), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Energy consunption of device in last week    
@device_blueprint.route('/customer/<int:customer_id>/devices_energy_week', methods=['GET'])
def get_devices_energy_week(customer_id):
    try:
        end_time = datetime.now()
        start_time = end_time - timedelta(days=7)
        devices = list_devices_energy(customer_id, start_time, end_time)
        return jsonify(devices), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# Energy consunption of device in last 30 days        
@device_blueprint.route('/customer/<int:customer_id>/devices_energy_month', methods=['GET'])
def get_devices_energy_month(customer_id):
    try:
        end_time = datetime.now()
        start_time = end_time - timedelta(days=30)
        devices = list_devices_energy(customer_id, start_time, end_time)
        return jsonify(devices), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Energy consunption of device in last year    
@device_blueprint.route('/customer/<int:customer_id>/devices_energy_year', methods=['GET'])
def get_devices_energy_year(customer_id):
    try:
        end_time = datetime.now()
        start_time = end_time - timedelta(weeks=52)
        devices = list_devices_energy(customer_id, start_time, end_time)
        return jsonify(devices), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# Energy consumption per device at a location
@device_blueprint.route('/energy-consumption-per-device', methods=['GET'])
def energy_consumption_per_device():
    try:
        location_id = request.args.get('location_id')
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')

        # Validate and convert dates if necessary
        # ...

        energy_data = get_energy_consumption_per_device(location_id, start_date, end_date)
        return jsonify(energy_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500