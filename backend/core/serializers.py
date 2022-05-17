from rest_framework.serializers import ModelSerializer
from .models import Machine, Task, TaskType, MaintenancePeriod

class MachineSerializer(ModelSerializer):
    class Meta:
        model = Machine
        fields = (
            'serial_number', 'model', 'brand', 'purchase_date', 'created_date', 'state',
            'branch'
        )

class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = (
            'id', 'description', 'start_datetime', 'end_datetime', 'duration',
            'state', 'id_machine', 'id_kind'
        )

class TaskTypeSerializer(ModelSerializer):
    class Meta:
        model = TaskType
        fields = (
            'id', 'label'
        )

class MaintenancePeriodSerializer(ModelSerializer):
    class Meta:
        model = MaintenancePeriod
        fields = (
            'id', 'label'
        )