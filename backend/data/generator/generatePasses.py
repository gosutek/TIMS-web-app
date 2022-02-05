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
    seconds = round(random.uniform(0, 59), 2)
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

for i in range(DATA_SIZE):
    id = generate_id()
    timestamp = generate_timestamp()
    charge = round(random.uniform(2, 20), 2)
    passes[i]["id"] = id
    passes[i]["timestamp"] = timestamp
    passes[i]["charge"] = charge

json_passes = json.dumps(passes)
output.write(json_passes)
