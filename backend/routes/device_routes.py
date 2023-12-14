from flask import Blueprint, jsonify, request
from services.device_service import list_devices_energy, get_device_types, get_models_by_type, add_device, get_energy_consumption_per_device, set_device_status, get_active_devices, get_all_active_devices_of_customer
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
    if not device_type or not isinstance(device_type, str):
        return jsonify({"error": "Invalid device type"}), 400
    try:
        models = get_models_by_type(device_type)
        return jsonify(models), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Get all active devices of customer at a particular serviceLocation    
@device_blueprint.route('/active-devices', methods=['GET'])
def get_active_devices_route():
    customer_id = request.args.get('customer_id', type=str)
    location_id = request.args.get('location_id', type=int)

    if not customer_id or not isinstance(customer_id, str) or not location_id or not isinstance(location_id, int):
        return jsonify({"error": "Invalid customer or location ID"}), 400

    try:
        devices = get_active_devices(customer_id, location_id)
        return jsonify(devices), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Get all active devices of customer
@device_blueprint.route('/all-active-devices', methods=['GET'])
def get_all_active_devices_route():
    customer_id = request.args.get('customer_id', type=str)

    if not customer_id or not isinstance(customer_id, str):
        return jsonify({"error": "Invalid customer ID"}), 400

    try:
        devices = get_all_active_devices_of_customer(customer_id)
        return jsonify(devices), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Add a new device at a location
@device_blueprint.route('/add', methods=['POST'])
def add_new_device():
    data = request.get_json()
    customer_id = data.get('customer_id')
    location_id = data.get('location_id')
    device_type = data.get('device_type')
    model_number = data.get('model_number')

    if not isinstance(customer_id, str) or not isinstance(location_id, int):
        return jsonify({'error': 'Invalid customer ID or location ID'}), 400
    if not isinstance(device_type, str) or not isinstance(model_number, str):
        return jsonify({'error': 'Invalid device type or model number'}), 400

    try:
        result = add_device(customer_id, location_id, device_type, model_number)
        return jsonify(result), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# Energy consunption of device in last 24 hours    
@device_blueprint.route('/customer/<string:customer_id>/devices_energy_24_hours', methods=['GET'])
def get_devices_energy_24_hours(customer_id):
    try:
        end_time = datetime.now()
        start_time = end_time - timedelta(hours=24)
        devices = list_devices_energy(customer_id, start_time, end_time)
        return jsonify(devices), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Energy consunption of device in last week    
@device_blueprint.route('/customer/<string:customer_id>/devices_energy_week', methods=['GET'])
def get_devices_energy_week(customer_id):
    try:
        end_time = datetime.now()
        start_time = end_time - timedelta(days=7)
        devices = list_devices_energy(customer_id, start_time, end_time)
        return jsonify(devices), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# Energy consunption of device in last 30 days        
@device_blueprint.route('/customer/<string:customer_id>/devices_energy_month', methods=['GET'])
def get_devices_energy_month(customer_id):
    try:
        end_time = datetime.now()
        start_time = end_time - timedelta(days=30)
        devices = list_devices_energy(customer_id, start_time, end_time)
        return jsonify(devices), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Energy consunption of device in last year    
@device_blueprint.route('/customer/<string:customer_id>/devices_energy_year', methods=['GET'])
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
    
@device_blueprint.route('/update-device-status', methods=['POST'])
def update_device_status():
    data = request.json
    enrolled_device_id = data.get('enrolled_device_id')
    status = data.get('status')
    if not isinstance(enrolled_device_id, int) or status not in [0, 1]:
        return 'Invalid status', 400
    try:
        result = set_device_status(enrolled_device_id, status)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
