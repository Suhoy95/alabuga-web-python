#!/bin/bash

if [[ "$1" == "--help" ]]; then
    echo "./build.sh - установить зависимости, проинициализировать Базу Данных, собрать React-Frontend"
    echo "./build.sh freeze - сохранить Python-зависимости из виртуального окружения"
    echo "./build.sh clean - удалить все автоматически сгенерированые файлы" 
    exit 0
fi

if [[ "$1" == "freeze" ]]; then
    if [ ! -d "venv" ]; then 
        echo "Виртуально окружение (venv) не установлено!"
        exit -1
    fi
    source venv/bin/activate || source venv/Scripts/activate
    pip freeze > requirements.txt
    exit 0
fi

if [[ "$1" == "clean" ]]; then
    git clean -xnfd
    echo "Вы уверены?"
    read
    git clean -xfd
    exit 0
fi

set -x

# Установка Python-окружения и библиотек в Виртуальное окружение
python -m venv venv
source venv/bin/activate || source venv/Scripts/activate
pip install -r requirements.txt

# Инициализация Базы Данных
pushd warehouse
python manage.py migrate
popd

# Установка Node.js пакетов
pushd wh-frontend
npm install

# Сборка React-frontend в wh-frontend/dist/
npm run publish
popd
