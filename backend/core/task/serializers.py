from rest_framework.serializers import ModelSerializer
from .models import EventType, EventState, Event, OrderDetails,\
    MaintenanceDetails, MaintenancePeriod, PiecesRange, Priority,\
    EventJoinOrder, EventJoinOrders, EventJoinEventState


class EventTypeSerializer(ModelSerializer):
    class Meta:
        model = EventType
        fields = ("id", "label")


class EventStateSerializer(ModelSerializer):
    class Meta:
        model = EventState
        fields = ("id", "label")


class EventSerializer(ModelSerializer):
    class Meta:
        model = Event
        fields = (
            "event_id",
            "description",
            "start_datetime",
            "end_datetime",
            "employee" "state",
            "branch",
            "type"
        )


class OrderDetailsSerializer(ModelSerializer):
    class Meta:
        model = OrderDetails
        field = (
            "order_id",
            "client_name",
            "invoice_num",
            "file_url",
            "num_pieces",
            "current_step",
            "event_id"
        )

class PiecesRangeSerializer(ModelSerializer):
    class Meta:
        model = PiecesRange
        field = (
            "id",
            "duration",
            "range"
        )

class MaintenanceDetailsSerializer(ModelSerializer):
    class Meta:
        model = MaintenanceDetails
        fields = ("maintenance_id", "repetitions",
                  "frecuency", "period", "event_id")


class MaintenancePeriodSerializer(ModelSerializer):
    class Meta:
        model = MaintenancePeriod
        fields = ("id", "label")


class PrioritySerializer(ModelSerializer):
    class Meta:
        model = Priority
        fields = ("id", "label")


# JOIN TABLES SERIALIZER
class EventJoinOrderSerializer(ModelSerializer):
    class Meta:
        model = EventJoinOrder
        fields = "__all__"
        # 'id_order', 'state_id', 'state_label', 'description',
        # 'pieces', 'employee', 'end_date',
        # 'client_name', 'invoice_num', 'file_url'


"""{
    id_order: id,
    state_id: state,
    state_label: state_label,
    description: description,
    pieces: pieces,
    employee: employee,
    end_date: end_date, yyyy-mm-dd
    client_name: client_name,
    invoice_num: invoice_num,
    file_url: file_url
}"""


class EventJoinOrdersSerializer(ModelSerializer):
    class Meta:
        model = EventJoinOrders
        fields = "__all__"
        # 'id_order', 'invoice_id', 'client_name',
        # 'start_date', 'end_date', 'state_id',
        # 'state_label', 'employee', 'current_step'


"""
{
    invoice_id:"001-001-0000000011",
    client_name: "Juanito Pereza",
    start_date : "13 de Junio del 2022",
    end_date : "Entregado",
    state_id: 4,
    state_label: "Finalizado",
    scheduler : "Juanito Perez",
    current_step : "Finalizado",
}"""


class EventJoinEventStateSerializer(ModelSerializer):
    class Meta:
        model = EventJoinEventState
        fields = "__all__"
        # 'order_id', 'start_datetime', 'end_datetime',
        # 'state_id', 'state_label'
