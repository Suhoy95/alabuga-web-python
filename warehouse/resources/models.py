from django.db import models
from django.db.models.base import Model

# Create your models here.

class WarehouseResource(models.Model):
    MEASURE_UNITS = [
        ('шт', 'штук'),
        ('кг', 'киллограм'),
        ('л', 'литров'),
    ]

    name = models.CharField("Название товара", max_length=255)
    quantity = models.PositiveIntegerField("Количество")
    measure_unit = models.CharField("Единица измерения", max_length=10, choices=MEASURE_UNITS)
    cost = models.PositiveIntegerField("Цена")
    last_update = models.DateTimeField("Дата последней поставки/отгрузки", auto_now=True)

    def __str__(self) -> str:
        return f"{self.name} ({self.quantity} {self.measure_unit} X {self.cost})"

    @property
    def total_cost(self):
        return self.cost * self.quantity

