from rest_framework.serializers import ModelSerializer
from .models import *

class StepStateSerializer(ModelSerializer):
    class Meta:
        model = StepState
        fields = (
            'id', 'label'
        )

class MachineWorkflowStepSerializer(ModelSerializer):
    class Meta:
        model = MachineWorkflowStep
        field = (
            'id', 'step_order', 'end_datetime', 'state_id', 'machine_id', 'type', 'order_id'
        )

class WorkflowSerializer(ModelSerializer):
    class Meta:
        model = Workflow
        fields = (
            'id', 'label'
        )

class WorkflowStepsSerializer(ModelSerializer):
    class Meta:
        model = WorkflowSteps
        fields = (
            'id', 'step_order', 'workflow_id', 'machine_id'
        )

#JOIN TABLES SERIALIZERS
class MachineWorkflowStepJoinMachineSerializer(ModelSerializer):
    class Meta:
        model = MachineWorkflowStepJoinMachine
        fields = '__all__'
            #'step_id', 'order_id', 'step_order', 'end_time', 'state_id', 'step_activity'


class WorkflowJoinWStepsSerializer(ModelSerializer):
    class Meta:
        model = WorkflowJoinWSteps
        fields = '__all__'
