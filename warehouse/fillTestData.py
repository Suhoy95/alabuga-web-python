# https://stackoverflow.com/questions/41518910/how-to-make-a-script-to-insert-data-in-my-default-sqlite3-database-django
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'warehouse.settings')

import django
django.setup()

from resources.models import WarehouseResource

objs = WarehouseResource.objects.bulk_create([
    WarehouseResource(name="Шоколад", quantity=50, measure_unit="шт", cost=80),
    WarehouseResource(name="Арбуз", quantity=100, measure_unit="кг", cost=100),
    WarehouseResource(name="Ананасы", quantity=100, measure_unit="кг", cost=150),
    WarehouseResource(name="Апельсины", quantity=100, measure_unit="кг", cost=100),
    WarehouseResource(name="Бананы", quantity=100, measure_unit="кг", cost=75),
    
    WarehouseResource(name="Лимонад 'Воткинский'", quantity=80, measure_unit="л", cost=85),
    WarehouseResource(name="Квас Вятский", quantity=70, measure_unit="л", cost=80),
    WarehouseResource(name="Тарелка плоская", quantity=25, measure_unit="шт", cost=40),
    WarehouseResource(name="Тарелка глубокая", quantity=25, measure_unit="шт", cost=40),
    WarehouseResource(name="Стакан", quantity=25, measure_unit="шт", cost=50),

    WarehouseResource(name="Чайная пара", quantity=25, measure_unit="шт", cost=100),
    WarehouseResource(name="Вилки", quantity=25, measure_unit="шт", cost=10),
    WarehouseResource(name="Ложки", quantity=25, measure_unit="шт", cost=10),
    WarehouseResource(name="Сахар", quantity=70, measure_unit="кг", cost=50),
])
