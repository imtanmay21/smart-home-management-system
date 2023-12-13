from flask import Blueprint, request, jsonify
from services.location_service import get_service_locations, add_service_location, update_service_location_status

location_blueprint = Blueprint('location_blueprint', __name__)

# List Service locations of a customer
@location_blueprint.route('/<int:customer_id>/list', methods=['GET'])
def list_locations(customer_id):
    try:
        locations = get_service_locations(customer_id)
        return jsonify(locations), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# Add Service locations for a customer
@location_blueprint.route('/<int:customer_id>/add', methods=['POST'])
def add_location(customer_id):
    try:
        location_data = request.get_json()
        result = add_service_location(customer_id, location_data)
        return jsonify(result), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@location_blueprint.route('/update-location-status', methods=['POST'])
def update_location_status():
    data = request.json
    location_id = data.get('location_id')
    status = data.get('status')

    if not isinstance(location_id, int):
        return jsonify({'error': 'Invalid location ID'}), 400
    if status not in [0, 1]:
        return 'Invalid status', 400
    try:
        result = update_service_location_status(location_id, status)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
