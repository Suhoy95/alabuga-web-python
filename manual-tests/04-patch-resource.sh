#!/bin/bash

set -ex
read id

# Завести новый товар
curl -v -d '{"quantity":25}' \
     -H 'Content-Type: application/json' \
     -H 'Accept: application/json; indent=4' \
     -X PATCH "http://127.0.0.1:8000/resources/$id/"


# вывод
# {
#     "id": 13,
#     "name": "Арбуз",
#     "quantity": 25,
#     "measure_unit": "кг",
#     "cost": 76,
#     "last_update": "2021-09-15T08:31:24.600719Z"
# }
