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

## 4. Работа с моделям и Базой Данных

Источник: https://docs.djangoproject.com/en/3.2/intro/tutorial02/

### 4.1 Создание Таблиц по-умолчанию, проверка работоспособности БД

1. Знакомство с [settings.py](mysite/mysite/settings.py): настройка Базы Данных
(`DATABASES`), временной зоны (`TIME_ZONE`), знакомства с Django-приложениями 
установленными по-умолчанию (`INSTALLED_APPS`).
2. Создаем БД и таблицы для включенных Приложений: `python manage.py migrate`
3. С созданной БД можно ознакомится через БД-клиента. В случае SQL, можно посмотреть в [DB Browser for SQLite](https://sqlitebrowser.org/)

## 4.2 Создание Моделей в своём приложении:

1. Создаем модели для Опросника: [polls/models.py](./mysite/polls/models.py)
2. Включаем приложение `polls` в настройки Django-проекта (`mysite/settings.py:INSTALLED_APPS`)
3. Создаем миграцию для нашего приложения: `python manage.py makemigrations polls`:

```plaintext
Migrations for 'polls':
  polls\migrations\0001_initial.py
    - Create model Question
    - Create model Choice
```

4. Проверяем, что будет с БД: `python manage.py sqlmigrate polls 0001` - Выведется SQL код который необходимо применить / предать администратору БД.

```plaintext
BEGIN;
--
-- Create model Question
--
CREATE TABLE "polls_question" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "question_text" varchar(200) NOT NULL, "pub_date" datetime NOT NULL);
--
-- Create model Choice
--
CREATE TABLE "polls_choice" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
 "choice_text" varchar(200) NOT NULL, "votes" integer NOT NULL, "question_id"
 bigint NOT NULL REFERENCES "polls_question" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE INDEX "polls_choice_question_id_c5b4b260" ON "polls_choice" ("question
_id");
COMMIT;
```

5. Применяем миграцию: `python manage.py migrate`

### 4.3 Учимся работать с API Моделей

- [Field lookups (double underscore)](https://docs.djangoproject.com/en/3.2/topics/db/queries/#field-lookups-intro)
- [Related objects reference](https://docs.djangoproject.com/en/3.2/ref/models/relations/)
- [Database API reference](https://docs.djangoproject.com/en/3.2/topics/db/queries/)

```shell
python manage.py shell
```
- [Смотри](https://docs.djangoproject.com/en/3.2/intro/tutorial02/#playing-with-the-api)

1. Полезно описывать метод `__str__` у моделей - данное представление также
используется в автоматически-сгенерированной admin-ке.
2. Важно правильно поставить `TIME_ZONE`: [Список](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

### 4.4 Админка

> Админка создана для только Контент-менеджеров, не для Конечного пользователя!!!

1. Создаем администратора: `python manage.py createsuperuser`
2. Ставим `LANGUAGE_CODE` чтобы интерфейс админки был на нужно языке
3. Правим [`polls/admin.py`](mysite/polls/admin.py), чтобы в админке появились наши модели.
