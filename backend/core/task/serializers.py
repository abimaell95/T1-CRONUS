from rest_framework.serializers import ModelSerializer
from .models import Task, TaskType, TaskKind, TaskState, TaskDetails, MaintenancePeriod, MaintenanceDetails, ReparationDetails, Priority

class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = (
            'id', 'description', 'start_datetime', 'end_datetime', 'duration',
            'state', 'id_machine', 'id_kind'
        )

class TaskKindSerializer(ModelSerializer):
    class Meta:
        model = TaskKind
        field = (
            'id', 'label'
        )

class TaskStateSerializer(ModelSerializer):
    class Meta:
        model = TaskState
        field = (
            'id', 'label'
        )

class TaskDetailsSerializer(ModelSerializer):
    class Meta:
        model = TaskDetails
        field = (
            'id', 'invoice_num', 'espec_file_url', 'cuts', 'type', 'id_task',
             'id_client', 'id_employee'
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


class MaintenancePeriodSerializer(ModelSerializer):
    class Meta:
        model = MaintenancePeriod
        fields = (
            'id', 'label'
        )

class MaintenanceDetailsSerializer(ModelSerializer):
    class Meta:
        model = MaintenanceDetails
        fields = (
            'id', 'repetitions', 'frecuency', 'period', 'id_task'
        )

class ReparationDetailsSerializer(ModelSerializer):
    class Meta:
        model = ReparationDetails
        fields = (
            'id', 'reason', 'priority', 'id_task'
        )

class PrioritySerializer(ModelSerializer):
    class Meta:
        model = Priority
        fields = (
            'id', 'label'
        )