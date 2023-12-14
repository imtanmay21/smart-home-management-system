from sqlalchemy import text
from models import db

def get_peak_time_usage_and_savings(location_id, start_date, end_date, peak_start, peak_end):
    sql_query = text("""
        SELECT e.EnrolledDeviceID, SUM(e.kWh) as PeakEnergy, SUM(e.kWh * p.PricePerkWh) as PeakCost, 
               SUM(e.kWh * op.PricePerkWh) as OffPeakCost
        FROM EnergyUsage e
        JOIN EnrolledDevices ed ON e.EnrolledDeviceID = ed.EnrolledDeviceID
        JOIN EnergyPrices p ON TIME(e.Timestamp) BETWEEN :peak_start AND :peak_end
        JOIN EnergyPrices op ON TIME(e.Timestamp) NOT BETWEEN :peak_start AND :peak_end
        WHERE ed.LocationID = :location_id AND e.Timestamp BETWEEN :start_date AND :end_date
        GROUP BY e.EnrolledDeviceID
    """)
    result = db.session.execute(sql_query, {'location_id': location_id, 'start_date': start_date, 'end_date': end_date,
                                            'peak_start': peak_start, 'peak_end': peak_end})
    data = [{'DeviceID': row[0], 'PeakEnergy': row[1], 'PeakCost': row[2], 'OffPeakCost': row[3]} for row in result]
    return data

def get_comparative_energy_consumption_timebased(square_footage, occupants, start_date, end_date):
    sql_query = text("""
        SELECT AVG(eu.kWh) as AverageEnergy
        FROM EnergyUsage eu
        JOIN EnrolledDevices ed ON eu.EnrolledDeviceID = ed.EnrolledDeviceID
        JOIN ServiceLocations sl ON ed.LocationID = sl.LocationID
        WHERE sl.SquareFootage BETWEEN :square_footage - 100 AND :square_footage + 100
        AND sl.Occupants = :occupants
        AND eu.Timestamp BETWEEN :start_date AND :end_date
        AND ed.Status = 1
    """)
    
    result = db.session.execute(sql_query, {
        'square_footage': square_footage, 
        'occupants': occupants, 
        'start_date': start_date, 
        'end_date': end_date
    })
    average_energy = result.scalar()
    return {'AverageEnergy': average_energy}

def get_comparative_energy_consumption(square_footage, occupants):
    sql_query = text("""
        SELECT AVG(eu.kWh) as AverageEnergy
        FROM EnergyUsage eu
        JOIN EnrolledDevices ed ON eu.EnrolledDeviceID = ed.EnrolledDeviceID
        JOIN ServiceLocations sl ON ed.LocationID = sl.LocationID
        WHERE sl.SquareFootage BETWEEN :square_footage - 100 AND :square_footage + 100
        AND sl.Occupants = :occupants
        AND ed.Status = 1
    """)
    result = db.session.execute(sql_query, {
        'square_footage': square_footage, 
        'occupants': occupants
    })
    average_energy = result.scalar()
    return {'AverageEnergy': average_energy}


def get_energy_consumption_per_location_for_customer(customer_id):
    sql_query = text("""
        SELECT sl.LocationID, sl.Street, SUM(eu.kWh) as TotalEnergy
        FROM EnergyUsage eu
        JOIN EnrolledDevices ed ON eu.EnrolledDeviceID = ed.EnrolledDeviceID
        JOIN ServiceLocations sl ON ed.LocationID = sl.LocationID
        WHERE sl.CustomerID = :customer_id AND ed.Status = 1
        GROUP BY sl.LocationID, sl.Street
    """)
    result = db.session.execute(sql_query, {'customer_id': customer_id})
    return [{'LocationID': row[0], 'Street': row[1], 'TotalEnergy': row[2]} for row in result]

def get_monthly_energy_consumption(location_id):
    sql_query = text("""
        SELECT DATE_FORMAT(eu.Timestamp, '%Y-%m') as MonthYear, SUM(eu.kWh) as TotalEnergy
        FROM EnergyUsage eu
        JOIN EnrolledDevices ed ON eu.EnrolledDeviceID = ed.EnrolledDeviceID
        WHERE ed.LocationID = :location_id
        GROUP BY DATE_FORMAT(eu.Timestamp, '%Y-%m')
        ORDER BY MonthYear
    """)
    result = db.session.execute(sql_query, {'location_id': location_id})
    return [{'MonthYear': row[0], 'TotalEnergy': row[1]} for row in result]



