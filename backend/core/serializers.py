from rest_framework.serializers import ModelSerializer
from .models import *

class MachineStateSerializer(ModelSerializer):
    class Meta:
        model = MachineState
        fields = (
            'id', 'label'
        )

class BranchOfficeSerializer(ModelSerializer):
    class Meta:
        model = Employee
        fields = (
            'branch_id', 'name', 'address', 'city'
        )


class EmployeeSerializer(ModelSerializer):
    class Meta:
        model = Employee
        fields = (
            'employee_id', 'name', 'surname', 'address', 'email', 'branch'
        )

class MachineSerializer(ModelSerializer):
    class Meta:
        model = Machine
        fields = (
            'serial_number', 'model', 'brand', 'purchase_date', 'state',
            'branch', 'employee_id'
        )
