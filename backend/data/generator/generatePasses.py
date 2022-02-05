import json
import random
import string

DATA_SIZE = 10
ID_SIZE = 15

output = open("../passesMockData.json", 'w')

years = [i for i in range(2000, 2022)] #timespan 2000-2022
box = [string.ascii_letters, string.digits]
passes = [dict() for _ in range(DATA_SIZE)]

def generate_timestamp():
    timestamp = ""
    day = random.randint(1, 30)
    month = random.randint(1, 12)
    timestamp = timestamp + str(random.choice(years))
    if (month < 10):
        timestamp = timestamp + "0" + str(month)
    else:
        timestamp = timestamp + str(month)
    if (day < 10):
        timestamp = timestamp + "0" + str(day)
    else:
        timestamp = timestamp + str(day)
    return timestamp

def generate_id():
    id = ""
    for _ in range(ID_SIZE):
        id = id + (random.choice(random.choice(box)))
    return id

for i in range(DATA_SIZE):
    id = generate_id()
    timestamp = generate_timestamp()
    charge = round(random.uniform(2, 20), 2)
    passes[i]["id"] = id
    passes[i]["timestamp"] = timestamp
    passes[i]["charge"] = charge

json_passes = json.dumps(passes)
output.write(json_passes)
