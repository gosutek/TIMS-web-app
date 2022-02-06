import json
import random
import string

DATA_SIZE = 10
ID_SIZE = 15
STATION_NAME_SIZE = 10

license_countries = ["EL", "BE", "BG", "CZ", "DK", "DE", "EE", "IE", "ES", "FR", "HR", "IT", "CY", "LV", "SE"]
vehicle_types = ["Bicycle", "Motorcycle", "Car", "Light truck", "Bus", "Heavy Truck", ]
op_ids = ["SXNF", "NJO4", "1G5N", "JNI9", "WV7J", "NLLG", "1VYY"]
station_ids, vehicles_ids = [], []

years = [i for i in range(2000, 2022)] #timespan 2000-2022
box = [string.ascii_letters, string.digits]

stations = [dict() for _ in range(DATA_SIZE)]
passes = [dict() for _ in range(DATA_SIZE)]
tags = [dict() for _ in range(DATA_SIZE)]
vehicles = [dict() for _ in range(DATA_SIZE)]

def generate_timestamp():
    seconds = random.randint(0, 59)
    minutes = random.randint(0, 59)
    hours = random.randint(0, 23)
    day = random.randint(1, 30)
    month = random.randint(1, 12)
    timestamp = str(random.choice(years)) + "-"
    timestamp = timestamp + "0" + str(month) + "-" if (month < 10) else  timestamp + str(month) + "-"
    timestamp = timestamp + "0" + str(day) + " " if (day < 10) else timestamp + str(day) + " "
    timestamp = timestamp + "0" + str(hours) + ":" if (hours < 10) else timestamp + str(hours) + ":"
    timestamp = timestamp + "0" + str(minutes) + ":" if (minutes < 10) else timestamp + str(minutes) + ":"
    timestamp = timestamp + "0" + str(seconds) if (seconds < 10) else timestamp + str(seconds)

    return timestamp

def generate_id():
    id = ""
    for _ in range(ID_SIZE):
        id = id + (random.choice(random.choice(box)))
    return id

def generate_license():
    return random.choice(string.ascii_uppercase) + random.choice(string.ascii_uppercase) + random.choice(string.ascii_uppercase) + "-"\
        + random.choice(string.digits) + random.choice(string.digits) + random.choice(string.digits)

def generate_passes():
    for i in range(DATA_SIZE):
        id = generate_id()
        timestamp = generate_timestamp()
        charge = round(random.uniform(2, 20), 2)
        passes[i]["id"] = id
        passes[i]["timestamp"] = timestamp
        passes[i]["charge"] = charge
        passes[i]["stationID"] = random.choice(station_ids)
        passes[i]["tagID"] = random.choice(tags)["id"]

def generate_tags():
    for i in range(DATA_SIZE):
        id = generate_id()
        credits = round(random.uniform(0, 69), 2)
        tags[i]["id"] = id
        tags[i]["credits"] = credits
        tags[i]["operatorID"] = random.choice(op_ids)
        tags[i]["vehicleID"] = random.choice(vehicles)["id"]

def generate_stations():
    for i in range(DATA_SIZE):
        id = generate_id()
        station_ids.append(id)
        stations[i]["id"] = id
        stations[i]["operatorID"] = random.choice(op_ids)
        stations[i]["stationName"] = random.choice(string.ascii_uppercase) + str(random.randint(100, 999))

def generate_vehicles():
    for i in range(DATA_SIZE):
        id = generate_id()
        vehicles_ids.append(id)
        vehicles[i]["id"] = id
        vehicles[i]["licenseYear"] = str(random.choice(years))
        vehicles[i]["licensePlate"] = generate_license()
        vehicles[i]["licenseCountry"] = random.choice(license_countries)
        vehicles[i]["vehicleType"] = random.choice(vehicle_types)

generate_vehicles()
output = open("./vehiclesMockData.json", 'w')
json_vehicles = json.dumps(vehicles)
output.write(json_vehicles)

generate_stations()
output = open("./stationsMockData.json", 'w')
json_stations = json.dumps(stations)
output.write(json_stations)

generate_tags()
output = open("./tagsMockData.json", 'w')
json_tags = json.dumps(tags)
output.write(json_tags)

generate_passes()
output = open("./passesMockData.json", 'w')
json_passes = json.dumps(passes)
output.write(json_passes)
