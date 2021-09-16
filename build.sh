#!/bin/bash

if [[ "$1" == "--help" ]]; then
    echo "./build.sh - установить зависимости, проинициализировать Базу Данных, собрать React-Frontend"
    echo "./build.sh freeze - сохранить Python-зависимости из виртуального окружения"
    echo "./build.sh clean - удалить все автоматически сгенерированые файлы" 
    exit 0
fi

set -ex

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
    echo "clean"
    exit 0
fi