from rest_framework.serializers import ModelSerializer
from .models import *

class EventTypeSerializer(ModelSerializer):
    class Meta:
        model = EventType
        fields = (
            'id', 'label'
        )

class EventStateSerializer(ModelSerializer):
    class Meta:
        model = EventState
        fields = (
            'id', 'label'
        )

class EventSerializer(ModelSerializer):
    class Meta:
        model = Event
        fields = (
            'event_id', 'description', 'start_datetime', 'end_datetime', 'duration',
            'state', 'branch', 'type'
        )

class OrderDetailsSerializer(ModelSerializer):
    class Meta:
        model = OrderDetails
        field = (
            'order_id', 'client_name', 'invoice_num', 'espec_file_url', 'num_pieces', 'event_id'
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
            'maintenance_id', 'repetitions', 'frecuency', 'period', 'event_id'
        )

class PrioritySerializer(ModelSerializer):
    class Meta:
        model = Priority
        fields = (
            'id', 'label'
        )

class ReparationDetailsSerializer(ModelSerializer):
    class Meta:
        model = ReparationDetails
        fields = (
            'reparation_id', 'reason', 'priority', 'event_id'
        )

#JOIN TABLES SERIALIZER
class EventJoinOrderSerializer(ModelSerializer):
    class Meta:
        model = EventJoinOrder
        fields = (
            'event_id', 'order_id', 'description', 'start_datetime', 'end_datetime', 'duration', 'state',
            'branch', 'type', 'client_name', 'invoice_num', 'espec_file_url', 'num_pieces'
        )

class EventJoinReparationSerializer(ModelSerializer):
    class Meta:
        model = EventJoinReparation
        fields = (
            'event_id', 'reparation_id', 'description', 'start_datetime', 'end_datetime', 'duration', 'state',
            'branch', 'type', 'reason', 'priority'
        )

class EventJoinMaintenanceSerializer(ModelSerializer):
    class Meta:
        model = EventJoinMaintenance
        fields = (
            'event_id', 'maintenance_id', 'description', 'start_datetime', 'end_datetime', 'duration', 'state',
            'branch', 'type', 'repetitions', 'frecuency', 'period'
        )