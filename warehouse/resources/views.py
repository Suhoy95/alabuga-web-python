from django.shortcuts import render

from rest_framework import viewsets
from rest_framework import permissions

from .models import WarehouseResource
from .serializers import WhResourceSerializer

class WhResourcesViewSet(viewsets.ModelViewSet):
    queryset = WarehouseResource.objects.all().order_by('name')
    serializer_class = WhResourceSerializer
    permission_classes = [permissions.AllowAny]
