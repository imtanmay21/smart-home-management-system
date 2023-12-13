from flask import Blueprint, request, jsonify
from services.location_service import get_service_locations, add_service_location

location_blueprint = Blueprint('location_blueprint', __name__)

# List Service locations of a customer
@location_blueprint.route('/<string:customer_id>/list', methods=['GET'])
def list_locations(customer_id):
    try:
        locations = get_service_locations(customer_id)
        return jsonify(locations), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# Add Service locations for a customer
@location_blueprint.route('/<string:customer_id>/add', methods=['POST'])
def add_location(customer_id):
    try:
        location_data = request.get_json()
        result = add_service_location(customer_id, location_data)
        return jsonify(result), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
