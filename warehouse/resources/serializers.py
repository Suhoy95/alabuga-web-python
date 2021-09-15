from rest_framework import serializers

from .models import WarehouseResource

class WhResourceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = WarehouseResource
        fields = [
            'id',
            'name',
            'quantity',
            'measure_unit',
            'cost',
            'last_update',
        ]
