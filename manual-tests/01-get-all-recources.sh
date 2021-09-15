#!/bin/bash

set -ex
echo "!!! Читай комментарии к скрипту !!!"

# Получить весь список товаров 
# можно сделать запрос с limit=1, а после сделать запрос с limit=count.
# curl -H 'Accept: application/json; indent=4' http://127.0.0.1:8000/resources/?limit=1
# (При желании данную возможность можно выключить, установив `max_limit` у LimitOffsetPagination
# https://www.django-rest-framework.org/api-guide/pagination/#limitoffsetpagination)

curl -H 'Accept: application/json; indent=4' http://127.0.0.1:8000/resources/?limit=10

echo "!!! Читай комментарии к скрипту !!!"
# Пример вывода:
# {
#     "count": 10,
#     "next": null,
#     "previous": null,
#     "results": [
#         { #... },
#          {
#             "id": 3,
#             "name": "Конфеты",
#             "quantity": 450,
#             "measure_unit": "кг",
#             "cost": 256,
#             "last_update": "2021-09-14T16:23:25.776457Z"
#         },
#         { # ... },
#         { # ... },
#         { # ... },
#         { # ... },
#         { # ... },
#         { # ... },
#         { # ... },
#         { # ... }
#     ]
# }
