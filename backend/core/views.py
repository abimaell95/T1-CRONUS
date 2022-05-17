from rest_framework import viewsets
from rest_framework import generics
from .serializers import MachineSerializer, TaskSerializer, TaskTypeSerializer, MaintenancePeriodSerializer
from .models import Machine, Task, TaskType, MaintenancePeriod


class MachineView(generics.ListAPIView):
    serializer_class = MachineSerializer
    def get_queryset(self):
        queryset = Machine.objects.all()
        branch_number = self.request.query_params.get('branch')
        if branch_number is not None:
            queryset = queryset.filter(branch=branch_number)
        return queryset

class TaskTypeViewSet(viewsets.ModelViewSet):
    queryset = TaskType.objects.all().order_by('id')
    serializer_class = TaskTypeSerializer

class MaintenancePeriodViewSet(viewsets.ModelViewSet):
    queryset = MaintenancePeriod.objects.all().order_by('id')
    serializer_class = MaintenancePeriodSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('id')
    serializer_class = TaskSerializer