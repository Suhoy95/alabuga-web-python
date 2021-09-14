# Django-tutorial log

Ключевые заметки.

## 1. Установка Django локально - в виртуальном, окружении

1. Создание и активация виртуального окружения

```shell
python -m venv venv

# add to .gitignore
# venv/

venv\Scripts\activate # Cmd (Windows)
. ./venv/bin/activate # Bash (Linux / Unix-like)
```

2. Установка Django в виртуальное окружение

```shell
python -m pip install Django
```

3. Проверка

```shell
python
>>> import django
>>> print(django.get_version())
3.2.7

# Либо,
python -m django --version
```
