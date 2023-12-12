from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Customers(db.Model):
    __tablename__ = 'Customers'

    CustomerID = db.Column(db.Integer, primary_key=True)
    FirstName = db.Column(db.String(255), nullable=False)
    LastName = db.Column(db.String(255), nullable=False)
    BillingAddress = db.Column(db.String(255), nullable=False)

    # Relationship with ServiceLocations
    service_locations = db.relationship('ServiceLocations', backref='customer', lazy=True)


class ServiceLocations(db.Model):
    __tablename__ = 'ServiceLocations'

    LocationID = db.Column(db.Integer, primary_key=True)
    CustomerID = db.Column(db.Integer, db.ForeignKey('Customers.CustomerID'), nullable=False)
    Apt_no = db.Column(db.String(50), nullable=False)
    Street = db.Column(db.String(255), nullable=False)
    City = db.Column(db.String(255), nullable=False)
    State = db.Column(db.String(50), nullable=False)
    Zip = db.Column(db.String(20), nullable=False)
    StartDate = db.Column(db.Date, nullable=False)
    SquareFootage = db.Column(db.Integer, nullable=False)
    Bedrooms = db.Column(db.Integer, nullable=False)
    Occupants = db.Column(db.Integer, nullable=False)


class Manufacturer(db.Model):
    __tablename__ = 'Manufacturer'

    ManufacturerID = db.Column(db.Integer, primary_key=True)
    ManufacturerName = db.Column(db.String(255), nullable=False)


class Devices(db.Model):
    __tablename__ = 'Devices'

    DeviceID = db.Column(db.Integer, primary_key=True)
    ManufacturerID = db.Column(db.Integer, db.ForeignKey('Manufacturer.ManufacturerID'), nullable=False)
    Type = db.Column(db.String(100), nullable=False)
    ModelNumber = db.Column(db.String(100), nullable=False)


class EnrolledDevices(db.Model):
    __tablename__ = 'EnrolledDevices'

    EnrolledDeviceID = db.Column(db.Integer, primary_key=True)
    DeviceID = db.Column(db.Integer, db.ForeignKey('Devices.DeviceID'), nullable=False)
    LocationID = db.Column(db.Integer, db.ForeignKey('ServiceLocations.LocationID'), nullable=False)


class DeviceEvents(db.Model):
    __tablename__ = 'DeviceEvents'

    EventID = db.Column(db.Integer, primary_key=True)
    EnrolledDeviceID = db.Column(db.Integer, db.ForeignKey('EnrolledDevices.EnrolledDeviceID'), nullable=False)
    Timestamp = db.Column(db.DateTime, nullable=False)
    EventType = db.Column(db.String(100), nullable=False)
    Value = db.Column(db.String(255), nullable=False)


class EnergyUsage(db.Model):
    __tablename__ = 'EnergyUsage'

    UsageID = db.Column(db.Integer, primary_key=True)
    EnrolledDeviceID = db.Column(db.Integer, db.ForeignKey('EnrolledDevices.EnrolledDeviceID'), nullable=False)
    Timestamp = db.Column(db.DateTime, nullable=False)
    kWh = db.Column(db.Numeric(10, 2), nullable=False)


class EnergyPrices(db.Model):
    __tablename__ = 'EnergyPrices'

    PriceID = db.Column(db.Integer, primary_key=True)
    Zip = db.Column(db.String(20), nullable=False)
    Hour = db.Column(db.Time, nullable=False)
    PricePerkWh = db.Column(db.Numeric(10, 2), nullable=False)
