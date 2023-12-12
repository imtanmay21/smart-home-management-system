from flask import Blueprint, jsonify, request
from services.customer_service import get_all_customers, get_customer_by_id, get_customer_by_firebase_uid, add_customer

customer_blueprint = Blueprint('customer_blueprint', __name__)


# Get data for all customers
@customer_blueprint.route('/')
def list_customers():
    customers = get_all_customers()
    return jsonify(customers)


# Add customer
@customer_blueprint.route('/add-customer', methods=['POST'])
def add_new_customer():
    data = request.get_json()
    try:
        result = add_customer(data['firebaseUID'], data['firstName'], data['lastName'], data['billingAddress'])
        return jsonify(result), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# Get customer By ID
@customer_blueprint.route('/<int:customer_id>')
def customer_details(customer_id):
    try:
        customer = get_customer_by_id(customer_id)
        if customer:
            return jsonify(customer), 200
        else:
            return jsonify({"message": "Customer not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# Get customer by their firebaseUid (customerID)
@customer_blueprint.route('/get-customer-details', methods=['GET'])
def get_customer_details():
    firebase_uid = request.args.get('firebaseUID')
    try:
        customer_data = get_customer_by_firebase_uid(firebase_uid)
        if customer_data:
            return jsonify(customer_data)
        else:
            return jsonify({"error": "Customer not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

