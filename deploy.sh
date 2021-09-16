#!/bin/bash

echo "Лучше используй этот скрипт как README, чем запускать все сразу!"
exit -1

set -ex

# Данный скрипт писался за последние 2,5 часа.
# Возможны ошибки или недочеты, не повторяйте это дома.

SITE_NAME=alabuga.gramend.ru

# К серверу должен быть доступ по SSH
TARTGET_SERVER=root@gramend.ru
TARGET_DIR=/srv/$SITE_NAME

ssh $TARTGET_SERVER "mkdir -p $TARGET_DIR/warehouse"

# Соберем Frontend для production, нет смысла собирать бандл на стороне сервера
if [[ "$0" == "rebuild-fe" ]]; then
    pushd wh-frontend
    npm run publish
    popd
fi

# Копируем файлы проекта на сервер
scp -r requirements.txt \
       wh-frontend/dist/ \
       $TARTGET_SERVER:$TARGET_DIR

# Копирование Django-проекта
find warehouse/ -name "*.pyc" -exec rm -f {} \;
scp -r warehouse/{resources,warehouse,manage.py} \
    $TARTGET_SERVER:"$TARGET_DIR/warehouse"

# Сервер старенький, с питоном 3.5, Пробуем собрать себе pyhton3.7
# https://linuxize.com/post/how-to-install-python-3-7-on-debian-9/
# https://stackoverflow.com/a/53071893
# apt-get install libffi-dev libsqlite3-dev
# curl -O https://www.python.org/ftp/python/3.7.3/Python-3.7.3.tar.xz
# tar -xf Python-3.7.3.tar.xz
# cd Python-3.7.3
# ./configure --enable-optimizations
# make
# make altinstall


ssh $TARTGET_SERVER <<EOF
set -ex
cd $TARGET_DIR
python3.7 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install uwsgi
EOF

echo "Сделай эти команды на сервере, перед тем как продолжать!!"
echo cd $TARTGET_DIR \&\& . venv/bin/activat
echo cd $TARTGET_DIR/warehouse
echo python manage.py migrate
echo "python manage.py createsuperuser"
echo "python manage.py collectstatic"
vim secret_key.txt # (если нет)
exit -1

cat > dist/uwsgi.ini <<EOF
[uwsgi]
chdir=$TARGET_DIR/warehouse
module=warehouse.wsgi:application
master=True
pidfile=/tmp/$SITE_NAME.pid
socket=$TARGET_DIR/$SITE_NAME.socket
processes=5
# www-data
uid=33
# www-data
gid=33
harakiri=20
max-requests=5000
vacuum=True
home=$TARGET_DIR/venv
daemonize=/var/log/uwsgi_$SITE_NAME.log
EOF

scp dist/uwsgi.ini $TARTGET_SERVER:$TARGET_DIR

ssh $TARTGET_SERVER "chown -R www-data:www-data $TARGET_DIR"

cat > dist/nginx.conf <<EOF
# $SITE_NAME.conf

# the upstream component nginx needs to connect to
upstream django {
    server unix://$TARGET_DIR/$SITE_NAME.socket; # for a file socket
    # server 127.0.0.1:8001; # for a web port socket (we'll use this first)
}

# configuration of the server
server {
    # Для первого получения сертификата, нужно будет раздать сайт по HTTP
    # listen 80;

    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/alabuga.gramend.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/alabuga.gramend.ru/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    
    # the domain name it will serve for
    server_name $SITE_NAME; # substitute your machine's IP address or FQDN
    charset utf-8;

    index index.html;
    root /srv/$SITE_NAME/dist/;

    # max upload size
    client_max_body_size 75M; # adjust to taste

    location /static {
        alias /srv/$SITE_NAME/warehouse/static; # your Django project's static files - amend as required
    }

    # Finally, send all non-media requests to the Django server.
    location ~ ^/(resources|total-cost|api-auth|admin) {
        uwsgi_pass django;

        # https://github.com/nginx/nginx/blob/master/conf/uwsgi_params
        uwsgi_param  QUERY_STRING       \$query_string;
        uwsgi_param  REQUEST_METHOD     \$request_method;
        uwsgi_param  CONTENT_TYPE       \$content_type;
        uwsgi_param  CONTENT_LENGTH     \$content_length;

        uwsgi_param  REQUEST_URI        \$request_uri;
        uwsgi_param  PATH_INFO          \$document_uri;
        uwsgi_param  DOCUMENT_ROOT      \$document_root;
        uwsgi_param  SERVER_PROTOCOL    \$server_protocol;
        uwsgi_param  REQUEST_SCHEME     \$scheme;
        uwsgi_param  HTTPS              \$https if_not_empty;

        uwsgi_param  REMOTE_ADDR        \$remote_addr;
        uwsgi_param  REMOTE_PORT        \$remote_port;
        uwsgi_param  SERVER_PORT        \$server_port;
        uwsgi_param  SERVER_NAME        \$server_name;
    }

    location / {
        try_files \$uri \$uri/ \$uri/index.html =404;
    }
}

server {
    listen 80;

    server_name $SITE_NAME;

    location / {
        return 301 https://\$host\$request_uri;
    }
}
EOF

scp dist/nginx.conf $TARTGET_SERVER:/etc/nginx/sites-enabled/$SITE_NAME.conf

# Генерируем SSL сертификат
# certbot certonly --webroot -w /srv/alabuga.gramend.ru/dist/ -d alabuga.gramend.ru --dry-run
# /etc/letsencrypt/live/alabuga.gramend.ru/fullchain.pem
# /etc/letsencrypt/live/alabuga.gramend.ru/privkey.pem


echo "Время запустить uwsgi на сервере и перегрузить nginx"
echo nginx -t && systemctl reload nginx
echo source venv/bin/activate
echo  uwsgi --ini uwsgi.ini

# TODO: Нужно оформить uwsgi в виде systemctl-сервиса