"""cronus URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from core import views
from core.task import views as taskviews
from django.contrib.auth.models import User
from core.models import Customer
from rest_framework import routers, serializers, viewsets
from core.serializers import UserSerializer


router = routers.DefaultRouter()
router.register(r'task_type', taskviews.TaskTypeViewSet)
router.register(r'maintenance_period', taskviews.MaintenancePeriodViewSet)

class CustomerSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        return Customer.objects.create(**validated_data)

    class Meta:
        model = Customer
        fields = ['id', 'name', 'surname', 'email']

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'customers', CustomerViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('user',views.create_user),
    path('admin/', admin.site.urls),
    path('machine/', views.MachineView.as_view()),
    path('task/', taskviews.TaskView.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
