from rest_framework import viewsets
from .serializers import MachineSerializer, TaskSerializer, TaskTypeSerializer, MaintenancePeriodSerializer
from .models import Machine, Task, TaskType, MaintenancePeriod


class MachineViewSet(viewsets.ModelViewSet):
    queryset = Machine.objects.all().order_by('serial_number')
    serializer_class = MachineSerializer

class TaskTypeViewSet(viewsets.ModelViewSet):
    queryset = TaskType.objects.all().order_by('id')
    serializer_class = TaskTypeSerializer

class MaintenancePeriodViewSet(viewsets.ModelViewSet):
    queryset = MaintenancePeriod.objects.all().order_by('id')
    serializer_class = MaintenancePeriodSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('id')
    serializer_class = TaskSerializer