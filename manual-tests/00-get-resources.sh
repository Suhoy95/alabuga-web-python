#!/bin/bash

set -ex

# Получить список товаров
curl -H 'Accept: application/json; indent=4' http://127.0.0.1:8000/resources/

# Пример ответа:
# {
#     "count": 10,
#     "next": "http://127.0.0.1:8000/resources/?limit=5&offset=5",
#     "previous": null,
#     "results": [
#         {
#             # ...
#         },
#         {
#             "id": 3,
#             "name": "Конфеты",
#             "quantity": 450,
#             "measure_unit": "кг",
#             "cost": 256,
#             "last_update": "2021-09-14T16:23:25.776457Z"
#         },
#         {
#             # ...
#         },
#         {
#             # ...
#         },
#         {
#             # ...
#         }
#     ]
# }