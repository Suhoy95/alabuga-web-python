#!/bin/bash

set -ex

read id

curl -H 'Accept: application/json; indent=4' \
     -X GET "http://127.0.0.1:8000/resources/$id/"

# Пример, если товар с id есть
# {
#     "id": 14,
#     "name": "Арбуз",
#     "quantity": 100,
#     "measure_unit": "кг",
#     "cost": 76,
#     "last_update": "2021-09-15T08:37:13.530736Z"
# }

# Пример, если товара с id нет
# {
#     "detail": "Not found."
# }
