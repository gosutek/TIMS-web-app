import json
import random
import string

DATA_SIZE = 10
ID_SIZE = 6
output = open("../tagsMockData.json", 'w')
box = [string.ascii_letters, string.digits]
tags = [dict() for i in range(DATA_SIZE)]
for i in range(DATA_SIZE):
    id = ""
    credits = round(random.uniform(0, 69), 2)
    for j in range(ID_SIZE):
        id = id + (random.choice(random.choice(box)))
    tags[i]["id"] = id
    tags[i]["credits"] = credits

json_tags = json.dumps(tags)
output.write(json_tags)
