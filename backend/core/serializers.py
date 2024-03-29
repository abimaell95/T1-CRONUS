from rest_framework.serializers import ModelSerializer
from .models import MachineState, BranchOffice,\
    Employee, MachineType, Machine, MachineJoinType


class MachineStateSerializer(ModelSerializer):
    class Meta:
        model = MachineState
        fields = ("id", "label")


class BranchOfficeSerializer(ModelSerializer):
    class Meta:
        model = BranchOffice
        fields = ("id", "name", "address", "city")


class EmployeeSerializer(ModelSerializer):
    class Meta:
        model = Employee
        fields = ("employee_id", "name", "surname",
                  "address", "email", "branch")


class MachineTypeSerializer(ModelSerializer):
    class Meta:
        model = MachineType
        fields = ("id", "label")


class MachineSerializer(ModelSerializer):
    class Meta:
        model = Machine
        fields = (
            "serial_number",
            "model",
            "brand",
            "step_order",
            "purchase_date",
            "type",
            "state",
            "branch",
            "employee_id",
        )


class MachineJoinTypeSerializer(ModelSerializer):
    class Meta:
        model = MachineJoinType
        fields = "__all__"
