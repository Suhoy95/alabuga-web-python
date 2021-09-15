#!/bin/bash

set -ex
read id

# Кладем JSON-в файл, на non-UTF8 терминалах, curl отправляет данные в неверной кодировке
echo '{"id":'$id',"name":"Арбуз","quantity": 50,"measure_unit": "кг","cost": 76}' > 03-data.json

# Завести новый товар
curl -d '@03-data.json' \
     -H 'Content-Type: application/json' \
     -H 'Accept: application/json; indent=4' \
     -X PUT "http://127.0.0.1:8000/resources/$id/"

# Пример вывода:
# {
#     "id": 13,
#     "name": "Арбуз",
#     "quantity": 50,
#     "measure_unit": "кг",
#     "cost": 76,
#     "last_update": "2021-09-15T08:24:37.197477Z"
# }
