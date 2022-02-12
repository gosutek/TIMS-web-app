import json
import random
import string

DATA_SIZE = 1000
ID_SIZE = 15
STATION_NAME_SIZE = 10
STATION_SIZE = 10

license_countries = ["EL", "BE", "BG", "CZ", "DK", "DE", "EE", "IE", "ES", "FR", "HR", "IT", "CY", "LV", "SE"]
vehicle_types = ["Bicycle", "Motorcycle", "Car", "Light truck", "Bus", "Heavy Truck", ]
op_ids = ["SXNF", "NJO4", "1G5N", "JNI9", "WV7J", "NLLG", "1VYY"]
station_ids, vehicles_ids = [], []

years = [i for i in range(2000, 2022)] #timespan 2000-2022
box = [string.ascii_letters, string.digits]

stations = [dict() for _ in range(STATION_SIZE * len(op_ids))]
passes = [dict() for _ in range(DATA_SIZE)]
tags = [dict() for _ in range(DATA_SIZE)]
vehicles = [dict() for _ in range(DATA_SIZE)]

def generate_timestamp():
    seconds = random.randint(0, 59)
    minutes = random.randint(0, 59)
    hours = random.randint(0, 23)
    month = random.randint(1, 12)
    if (month == 2):
        day = random.randint(1, 28)
    elif (month == 4 or month == 6 or month == 9 or month == 11):
        day = random.randint(1, 30)
    else:
        day = random.randint(1, 31)
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

def generate_vehicles():
    for i in range(DATA_SIZE):
        id = generate_id()
        vehicles_ids.append(id)
        vehicles[i]["id"] = id
        vehicles[i]["licenseYear"] = str(random.choice(years))
        vehicles[i]["licensePlate"] = generate_license()
        vehicles[i]["licenseCountry"] = random.choice(license_countries)
        vehicles[i]["vehicleType"] = random.choice(vehicle_types)

def generate_tags():
    for i in range(DATA_SIZE):
        id = generate_id()
        credits = round(random.uniform(0, 69), 2)
        tags[i]["id"] = id
        tags[i]["credits"] = credits
        tags[i]["OperatorID"] = random.choice(op_ids)
        tags[i]["VehicleID"] = random.choice(vehicles)["id"]

def generate_stations():
    op_gen = (oper for oper in op_ids)
    idx = 0
    for _ in range(len(op_ids)):
        op = next(op_gen)
        for _ in range(STATION_SIZE):
            id = generate_id()
            station_ids.append(id)
            stations[idx]["id"] = id
            stations[idx]["OperatorID"] = op
            stations[idx]["StationName"] = random.choice(string.ascii_uppercase) + str(random.randint(100, 999))
            idx = idx + 1


def generate_passes():
    for i in range(DATA_SIZE):
        id = generate_id()
        timestamp = generate_timestamp()
        charge = round(random.uniform(2, 20), 2)
        passes[i]["id"] = id
        passes[i]["timestamp"] = timestamp
        passes[i]["charge"] = charge
        passes[i]["StationID"] = random.choice(station_ids)
        passes[i]["TagID"] = random.choice(tags)["id"]

def generate_postman_data():

    pm_stationID = random.choice(stations)["id"]
    pm_operatorID_1 = random.choice(op_ids)
    pm_operatorID_2 = random.choice(op_ids)
    while(pm_operatorID_1 == pm_operatorID_2):
        pm_operatorID_2 = random.choice(op_ids)

    postman_data_OK = [{
        "op_ID": random.choice((pm_operatorID_1, pm_operatorID_2)),
        "op1_ID": pm_operatorID_1,
        "op2_ID": pm_operatorID_2,
        "stationID": pm_stationID,
        "date_from": 20000101,
        "date_to": 20220101
    }]
    postman_data_BAD_REQUEST = [
        {
            "op_ID": random.choice((pm_operatorID_1, pm_operatorID_2)),
            "op1_ID": pm_operatorID_1,
            "op2_ID": pm_operatorID_2,
            "stationID": pm_stationID,
            "date_from": "1234",
            "date_to": "5678"
        },
        {
            "op_ID": "",
            "op1_ID": "",
            "op2_ID": "",
            "stationID": "",
            "date_from": 20000101,
            "date_to": 20220101
        },
    ]
    postman_data_NO_DATA_FOUND = [{
        "op_ID": random.choice((pm_operatorID_1, pm_operatorID_2)),
        "op1_ID": pm_operatorID_1,
        "op2_ID": pm_operatorID_2,
        "stationID": pm_stationID,
        "date_from": "20300505",
        "date_to": "20400505"
    }]

    output = open("../../doc/postman/postman_testing_OK.json", 'w')
    json_postman_data_OK = json.dumps(postman_data_OK)
    output.write(json_postman_data_OK)

    output = open("../../doc/postman/postman_testing_BAD_REQUEST.json", 'w')
    json_postman_data_BAD_REQUEST = json.dumps(postman_data_BAD_REQUEST)
    output.write(json_postman_data_BAD_REQUEST)

    output = open("../../doc/postman/postman_testing_NO_DATA_FOUND.json", 'w')
    json_postman_data_NO_DATA_FOUND = json.dumps(postman_data_NO_DATA_FOUND)
    output.write(json_postman_data_NO_DATA_FOUND)


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

generate_postman_data()
