from sqlalchemy import text
from models import db

def add_service_location(customer_id, location_data):
    sql_query = text("""
        INSERT INTO ServiceLocations (CustomerID, Apt_no, Street, City, State, Zip, StartDate, SquareFootage, Bedrooms, Occupants)
        VALUES (:customer_id, :apt_no, :street, :city, :state, :zip, :start_date, :square_footage, :bedrooms, :occupants)
    """)
    db.session.execute(sql_query, {
        'customer_id': customer_id, 
        'apt_no': location_data['Apt_no'],
        'street': location_data['Street'],
        'city': location_data['City'],
        'state': location_data['State'],
        'zip': location_data['Zip'],
        'start_date': location_data['StartDate'],
        'square_footage': location_data['SquareFootage'],
        'bedrooms': location_data['Bedrooms'],
        'occupants': location_data['Occupants']
    })
    try:
        db.session.commit()
    except:
        db.session.rollback()
    return {'message': 'Service location added successfully'}

def get_service_locations(customer_id):
    sql_query = text("""
        SELECT LocationID, Apt_no, Street, City, State, Zip, StartDate, SquareFootage, Bedrooms, Occupants
        FROM ServiceLocations
        WHERE CustomerID = :customer_id AND Status = 1
    """)
    result = db.session.execute(sql_query, {'customer_id': customer_id})
    locations = [{'LocationID': row[0], 'Apt_no': row[1], 'Street': row[2], 'City': row[3], 
                  'State': row[4], 'Zip': row[5], 'StartDate': row[6], 'SquareFootage': row[7],
                  'Bedrooms': row[8], 'Occupants': row[9]} for row in result]
    return locations

def update_service_location_status(location_id, status):
    sql_query = text("UPDATE ServiceLocations SET Status = :status WHERE LocationID = :location_id")
    db.session.execute(sql_query, {'location_id': location_id, 'status': status})
    db.session.commit()
    return {'message': 'Service location status updated successfully'}


