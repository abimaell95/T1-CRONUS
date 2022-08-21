from rest_framework.serializers import ModelSerializer
from .models import StepState, MachineWorkflowStep,\
    MachineWorkflowStepJoinMachine


class StepStateSerializer(ModelSerializer):
    class Meta:
        model = StepState
        fields = ("id", "label")


class MachineWorkflowStepSerializer(ModelSerializer):
    class Meta:
        model = MachineWorkflowStep
        field = (
            "id",
            "end_datetime",
            "state_id",
            "machine_id",
            "order_id",
        )


# JOIN TABLES SERIALIZERS
class MachineWorkflowStepJoinMachineSerializer(ModelSerializer):
    class Meta:
        model = MachineWorkflowStepJoinMachine
        fields = "__all__"
