#!/bin/bash

set -ex

cat 02-data.json

# Завести новый товар
curl -d '@02-data.json' \
     -H 'Content-Type: application/json' \
     -H 'Accept: application/json; indent=4' \
     -X POST http://127.0.0.1:8000/resources/

# Пример ответв
# {
#     "id": 13,
#     "name": "Арбуз",
#     "quantity": 100,
#     "measure_unit": "кг",
#     "cost": 76,
#     "last_update": "2021-09-15T08:19:46.719738Z"
# }
