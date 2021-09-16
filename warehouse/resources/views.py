from django.shortcuts import render

from rest_framework import (
    viewsets,
    permissions,
    authentication,
    response,
)
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes
)

from .models import WarehouseResource
from .serializers import WhResourceSerializer

class WhResourcesViewSet(viewsets.ModelViewSet):
    queryset = WarehouseResource.objects.all().order_by('name')
    serializer_class = WhResourceSerializer
    authentication_classes =[authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated, permissions.DjangoModelPermissions]
    # permission_classes = [permissions.AllowAny]


@api_view()
@authentication_classes([authentication.SessionAuthentication])
@permission_classes([permissions.IsAuthenticated])
# @permission_classes([permissions.AllowAny])
def total_cost(request):
    totalCost = {
        "total": 0,
        "resources": [],
    }
    for resource in WarehouseResource.objects.all().order_by('name'):
        totalCost["total"] += resource.total_cost
        totalCost["resources"].append({
            "id": resource.id,
            "name": resource.name,
            "total": resource.total_cost,
        })
    return response.Response(totalCost)
