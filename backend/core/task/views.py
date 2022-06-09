from rest_framework import viewsets
from rest_framework import generics
from .serializers import TaskSerializer, TaskTypeSerializer, MaintenancePeriodSerializer
from .models import Task, TaskType, TaskDetails, MaintenancePeriod, MaintenanceDetails, ReparationDetails

class TaskTypeViewSet(viewsets.ModelViewSet):
    queryset = TaskType.objects.all().order_by('id')
    serializer_class = TaskTypeSerializer

class MaintenancePeriodViewSet(viewsets.ModelViewSet):
    queryset = MaintenancePeriod.objects.all().order_by('id')
    serializer_class = MaintenancePeriodSerializer

class TaskView(generics.ListAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        queryset = Task.objects.all()
        id_task = self.request.query_params.get('id')
        print( queryset )