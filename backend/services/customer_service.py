from sqlalchemy import text
from models import db

def add_customer(firebase_uid, first_name, last_name, billing_address):
    sql_query = text("""
        INSERT INTO Customers (CustomerID, FirstName, LastName, BillingAddress)
        VALUES (:firebase_uid, :first_name, :last_name, :billing_address)
    """)
    db.session.execute(sql_query, {
        'firebase_uid': firebase_uid,
        'first_name': first_name,
        'last_name': last_name,
        'billing_address': billing_address
    })
    try:
        db.session.commit()
    except:
        db.session.rollback()
    return {'message': 'Customer added successfully'}

def get_all_customers():
    sql_query = text("SELECT CustomerID, FirstName, LastName, BillingAddress FROM Customers")
    result = db.session.execute(sql_query)
    customers = [
        {
            'CustomerID': row[0], 
            'FirstName': row[1], 
            'LastName': row[2], 
            'BillingAddress': row[3]
        } for row in result
    ]
    return customers

def get_customer_by_id(customer_id):
    sql_query = text("SELECT CustomerID, FirstName, LastName, BillingAddress FROM Customers WHERE CustomerID = :customer_id")
    result = db.session.execute(sql_query, {'customer_id': customer_id})
    customer = result.fetchone()
    if customer:
        return {
            'CustomerID': customer[0], 
            'FirstName': customer[1], 
            'LastName': customer[2], 
            'BillingAddress': customer[3]
        }
    else:
        return None
    
def get_customer_by_firebase_uid(firebase_uid):
    sql_query = text("""
        SELECT CustomerID, FirstName, LastName, BillingAddress 
        FROM Customers 
        WHERE CustomerID = :firebase_uid
    """)
    result = db.session.execute(sql_query, {'firebase_uid': firebase_uid})
    customer = result.fetchone()

    if customer:
        return {
            'CustomerID': customer[0],
            'FirstName': customer[1],
            'LastName': customer[2],
            'BillingAddress': customer[3]
        }
    else:
        return None
