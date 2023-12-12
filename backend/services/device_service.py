from sqlalchemy import text
from datetime import datetime, timedelta
from models import db

def list_devices_energy(customer_id, start_time, end_time):
    # Calculate the time range for the last 24 hours
    # end_time = datetime.now()
    # start_time = end_time - timedelta(hours=24)

    sql_query = text("""
    SELECT ed.EnrolledDeviceID, d.Type, d.ModelNumber, SUM(eu.kWh) as TotalEnergy
    FROM EnrolledDevices ed
    JOIN Devices d ON ed.DeviceID = d.DeviceID
    JOIN ServiceLocations sl ON ed.LocationID = sl.LocationID
    JOIN Customers c ON sl.CustomerID = c.CustomerID
    LEFT JOIN EnergyUsage eu ON ed.EnrolledDeviceID = eu.EnrolledDeviceID
    AND eu.Timestamp BETWEEN :start_time AND :end_time
    WHERE c.CustomerID = :customer_id
    GROUP BY ed.EnrolledDeviceID, d.Type, d.ModelNumber
    """)

    result = db.session.execute(sql_query, {'customer_id': customer_id, 'start_time': start_time, 'end_time': end_time})
    devices = [
        {
            'EnrolledDeviceID': row[0], 
            'Type': row[1], 
            'ModelNumber': row[2], 
            'TotalEnergy': row[3] or 0
        } 
        for row in result
    ]
    return devices

def get_device_types():
    sql_query = text("SELECT DISTINCT Type FROM Devices")
    result = db.session.execute(sql_query)
    return [{'Type': row[0]} for row in result]  # Accessing row elements by index

def get_models_by_type(device_type):
    sql_query = text("SELECT ModelNumber FROM Devices WHERE Type = :device_type")
    result = db.session.execute(sql_query, {'device_type': device_type})
    return [{'ModelNumber': row[0]} for row in result]  # Accessing row elements by index

def add_device(customer_id, location_id, device_type, model_number):
    find_device_sql = text("SELECT DeviceID FROM Devices WHERE Type = :device_type AND ModelNumber = :model_number")
    device = db.session.execute(find_device_sql, {'device_type': device_type, 'model_number': model_number}).fetchone()
    if device:
        device_id = device[0]
        insert_sql = text("""
            INSERT INTO EnrolledDevices (DeviceID, LocationID) VALUES (:device_id, :location_id)
        """)
        db.session.execute(insert_sql, {'device_id': device_id, 'location_id': location_id})
        db.session.commit()
        return {'message': 'Device added successfully'}
    else:
        return {'message': 'Device type or model not found'}
    
def get_energy_consumption_per_device(location_id, start_date, end_date):
    sql_query = text("""
        SELECT d.DeviceID, d.Type, SUM(e.kWh) as TotalEnergy
        FROM EnergyUsage e
        JOIN EnrolledDevices ed ON e.EnrolledDeviceID = ed.EnrolledDeviceID
        JOIN Devices d ON ed.DeviceID = d.DeviceID
        WHERE ed.LocationID = :location_id AND e.Timestamp BETWEEN :start_date AND :end_date
        GROUP BY d.DeviceID, d.Type
    """)
    result = db.session.execute(sql_query, {'location_id': location_id, 'start_date': start_date, 'end_date': end_date})
    return [{'DeviceID': row[0], 'Type': row[1], 'TotalEnergy': row[2]} for row in result]


