from flask import Blueprint, request, jsonify
from services.energy_service import get_peak_time_usage_and_savings, get_comparative_energy_consumption_timebased, get_comparative_energy_consumption, get_energy_consumption_per_location_for_customer, get_monthly_energy_consumption
from datetime import datetime

energy_blueprint = Blueprint('energy_blueprint', __name__)

def validate_date(date_str):
    try:
        datetime.strptime(date_str, "%Y-%m-%d")
        return True
    except ValueError:
        return False

# Energy consumption and saving during peak time
@energy_blueprint.route('/peak-time-usage', methods=['GET'])
def peak_time_usage():
    location_id = request.args.get('location_id', type=int)
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    peak_start = '18:00:00'  # Example peak start time
    peak_end = '22:00:00'    # Example peak end time

    if not location_id or not isinstance(location_id, int):
        return jsonify({"error": "Invalid location ID"}), 400
    if not validate_date(start_date) or not validate_date(end_date):
        return jsonify({"error": "Invalid date format"}), 400

    try:
        savings_data = get_peak_time_usage_and_savings(location_id, start_date, end_date, peak_start, peak_end)
        return jsonify(savings_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# Average energy consumption of similar units    
@energy_blueprint.route('/compare-energy-consumption', methods=['GET'])
def compare_energy_consumption():
    square_footage = request.args.get('square_footage', type=int)
    occupants = request.args.get('occupants', type=int)

    if not square_footage or not isinstance(square_footage, int):
        return jsonify({"error": "Invalid square footage"}), 400
    if not occupants or not isinstance(occupants, int):
        return jsonify({"error": "Invalid occupants"}), 400

    try:
        data = get_comparative_energy_consumption(square_footage, occupants)
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Average Energy consumption of similar units in a time interval
@energy_blueprint.route('/compare-energy-consumption_time_interval', methods=['GET'])
def compare_energy_consumption_timebased():
    square_footage = request.args.get('square_footage', type=int)
    occupants = request.args.get('occupants', type=int)
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')

    if not square_footage or not isinstance(square_footage, int):
        return jsonify({"error": "Invalid square footage"}), 400
    if not occupants or not isinstance(occupants, int):
        return jsonify({"error": "Invalid occupants"}), 400
    if not validate_date(start_date) or not validate_date(end_date):
        return jsonify({"error": "Invalid date format"}), 400

    try:
        data = get_comparative_energy_consumption_timebased(square_footage, occupants, start_date, end_date)
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@energy_blueprint.route('/customer/<string:customer_id>/energy-per-location', methods=['GET'])
def energy_per_location_for_customer(customer_id):
    try:
        energy_data = get_energy_consumption_per_location_for_customer(customer_id)
        return jsonify(energy_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# monthly energy consumption for a location over time    
@energy_blueprint.route('/monthly-energy-consumption', methods=['GET'])
def monthly_energy_consumption():
    location_id = request.args.get('location_id', type=int)
    if not location_id:
        return jsonify({"error": "Location ID is required"}), 400

    try:
        energy_data = get_monthly_energy_consumption(location_id)
        return jsonify(energy_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



