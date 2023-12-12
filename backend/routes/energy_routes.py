from flask import Blueprint, request, jsonify
from services.energy_service import get_peak_time_usage_and_savings, get_comparative_energy_consumption_timebased, get_comparative_energy_consumption

energy_blueprint = Blueprint('energy_blueprint', __name__)

# Energy consumption and saving during peak time
@energy_blueprint.route('/peak-time-usage', methods=['GET'])
def peak_time_usage():
    location_id = request.args.get('location_id')
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    peak_start = '18:00:00'  # Example peak start time
    peak_end = '22:00:00'    # Example peak end time
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

    try:
        data = get_comparative_energy_consumption_timebased(square_footage, occupants, start_date, end_date)
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


