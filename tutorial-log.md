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
## 2. Первое приложение

source: https://docs.djangoproject.com/en/3.2/intro/tutorial01/

1. Создаем шаблонный проект

```shell
django-admin startproject mysite
```

### Обзор структуры базового проекта

```plaintext
mysite/             # Корневая директория для проекта. Имя роли не играет.
    manage.py       # CLI-утилита для работы с проектом, см [dgango-admin & manage.py](https://docs.djangoproject.com/en/3.2/ref/django-admin/)
    mysite/         # Проект оформленный в Python-package
        __init__.py # см. устройство [Python-package](https://docs.python.org/3/tutorial/modules.html#tut-packages)
        settings.py # Конфигурация Django-проекта: https://docs.djangoproject.com/en/3.2/topics/settings/
        urls.py     # URL-схема проекта, см URL dispatcher: https://docs.djangoproject.com/en/3.2/topics/settings/
        asgi.py     # точка входа для ASGI-совместимых серверов (Asynchronous Server Gateway Interface)
        wsgi.py     # точка входа для классических WSGI-совместимых серверов (Web Server Gateway Interface)
```

2. Проверка: запускаем проект на Отладочном-сервере (Developer-сервере)

```shell
cd mysite
python manage.py runserver [IP:port]
> ...
> Starting development server at http://127.0.0.1:8000/
> ...

# стартовать на всех IP-адресох:
python manage.py runserver [0:8000|0.0.0.0:8000]
```

## 3. Создаем Django-app для опросов

- `Django-app` - функциональная единица, часть предоставляющая какую либо Web-функцию/систему.
- `Django-project` - коллекция конфигурации и Django-apps (Django-приложений). Одно и тоже приложение может быть в разных проектах.

1. Создаем Джанго-приложение `polls`:

```shell
python manage.py startapp polls
```

```plaintext
polls/
    __init__.py
    admin.py
    apps.py
    migrations/
        __init__.py
    models.py
    tests.py
    views.py
```

2. Создаем первое представление в [polls/views.py:index()](./mysite/polls/views.py)
3. Создаем [`urls.py` для приложения](./mysite/polls/urls.py)
4. Включаем приложение `polls` в основное приложение `mysite`: [`mysite/urls.py`](./mysite/mysite/urls.py)
5. Запускаем сервер, и переходим на Hello, world: [http://localhost:8000/polls/](http://localhost:8000/polls/)
