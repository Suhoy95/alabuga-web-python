#!/bin/bash

set -ex

read id

curl -v -H 'Content-Type: application/json'\
        -H 'Accept: application/json; indent=4' \
     -X DELETE "http://127.0.0.1:8000/resources/$id/"

# > DELETE /resources/13/ HTTP/1.1
# > Host: 127.0.0.1:8000
# > User-Agent: curl/7.60.0
# > Content-Type: application/json
# > Accept: application/json; indent=4
# >
# < HTTP/1.1 204 No Content
# < Date: Wed, 15 Sep 2021 08:31:58 GMT
# < Server: WSGIServer/0.2 CPython/3.7.0
# < Vary: Accept, Cookie
# < Allow: GET, PUT, PATCH, DELETE, HEAD, OPTIONS
# < X-Frame-Options: DENY
# < Content-Length: 0
# < X-Content-Type-Options: nosniff
# < Referrer-Policy: same-origin
# <
#   0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
# * Connection #0 to host 127.0.0.1 left intact
