from rest_framework.serializers import ModelSerializer
from .models import Machine

class MachineSerializer(ModelSerializer):
    class Meta:
        model = Machine
        fields = (
            'serial_number', 'model', 'brand', 'purchase_date', 'created_date', 'state',
            'branch'
        )
