from django.urls import path
from django.urls import path, include
from rest_framework import routers

from . import views 

router = routers.SimpleRouter()
router.register(r'resources', views.WhResourcesViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('total-cost/', views.total_cost, name="total-cost"),
    path('api-auth/', include('rest_framework.urls')),
]
