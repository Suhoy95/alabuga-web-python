<img src="./Documentation/images/logo.png" alt="Логотип РиК" width="100px" align="right">

# Склад РиК

Python/Django приложение для работы со складом. Данный проект является
тестовым заданием. Подробности по заданию, ходу его выполнения и заметки можно
посмотреть в [Документации](./Documentation/README.md).

## Установка / Быстрый старт (Install / Getting started)

Для работы над проектом требуется наличие [Python 3](https://www.python.org/downloads/), [Node.js & npm](https://nodejs.org/en/).
Дополнительно, желательно наличие Bash-окружения (Например, [Git-bash для Windows](https://gitforwindows.org/)), и утилиты [`curl`](https://curl.se/windows/). для тестирования REST API.

```sh
python --version
> Python 3.7.0
node --version
> v12.14.1
npm --version
> 6.13.4
```

Установить все зависимости, и собрать React-Frontend можно с помощью скрипта (Также полезно его изучить, для понимания структуры проекта):

```bash
./build.sh
```

Создаем супер-пользователя и заполняем Базу данных тестовыми данными (если необходимо):

```bash
.\venv\Scripts\activate # или source ./venv/bin/activate
cd warehouse
python manage.py createsuperuser

# Заполнить БД тестовыми товарами
python fillTestData.py
```
