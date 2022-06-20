from traceback import print_tb
from rest_framework import viewsets, generics
from django.shortcuts import render
from .serializers import *
from .models import *
import datetime


class EventTypeViewSet(viewsets.ModelViewSet):
    queryset = EventType.objects.all().order_by('id')
    serializer_class = EventTypeSerializer

class MaintenancePeriodViewSet(viewsets.ModelViewSet):
    queryset = MaintenancePeriod.objects.all().order_by('id')
    serializer_class = MaintenancePeriodSerializer

class PriorityViewSet(viewsets.ModelViewSet):
    queryset = Priority.objects.all().order_by('id')
    serializer_class = PrioritySerializer

#JOIN TABLES VIEWS
class OrderView(generics.ListAPIView):
    serializer_class = EventJoinOrderSerializer
    def get_queryset(self, id=0):
        print(id)
        queryset=EventJoinOrder.objects.raw("select core_orderdetails.id, core_event.state_id, core_eventstate.label, core_event.description, core_orderdetails.num_pieces, core_event.employee_id, core_event.end_datetime, core_orderdetails.client_name, core_orderdetails.invoice_num, core_orderdetails.file_url from core_event inner join core_orderdetails on core_event.id = core_orderdetails.event_id inner join core_eventstate on core_eventstate.id = core_event.state_id where core_orderdetails.id = {}".format(id))
        return queryset

#endpoint ordenes
#cliente, factura, empleado, etapa actual, estado, actividad del step actual, fecha de entrega, fecha de agendar
class OrdersView(generics.ListAPIView):
    serializer_class = EventJoinOrdersSerializer
    def get_queryset(self):
        year = self.request.GET.get('year','')
        if year == "":
            year = datetime.datetime.now().year

        month = self.request.GET.get('month','')
        if month == "":
            month = datetime.datetime.now().month

        day = self.request.GET.get('day','')
        if day == "":
            day = datetime.datetime.now().day

        branch_number = self.request.GET.get('branch','')
        if branch_number == "":
            branch_number=1
        
        query="select core_orderdetails.id, core_orderdetails.invoice_num, core_orderdetails.client_name, core_event.start_datetime, core_event.end_datetime, core_event.state_id as state, core_eventstate.label as state_label, core_event.employee_id as employee, core_machinetype.label as type_label from core_event inner join core_orderdetails on core_event.id=core_orderdetails.event_id and core_event.branch_id = {} and core_event.start_datetime between '{}-{}-{} 00:00:00' and '{}-{}-{} 00:00:00' inner join core_eventstate on core_event.state_id = core_eventstate.id inner join core_machineworkflowstep on core_orderdetails.current_step_id = core_machineworkflowstep.id inner join core_machine on core_machine.serial_number = core_machineworkflowstep.machine_id inner join core_machinetype on core_machinetype.id=core_machine.type_id".format(branch_number,year,month,day,year,month,int(day)+5)
        queryset=EventJoinOrders.objects.raw(query)
        return queryset

#endpoint de eventos
#id, descrip, fecha de entrega, fecha de agendar, hora inicio, hora fin, estado del evento, id_estado
class EventsView(generics.ListAPIView):
    serializer_class = EventJoinEventStateSerializer

    def get_queryset(self):
        year = self.request.GET.get('year','')
        if year == "":
            year = datetime.datetime.now().year

        month = self.request.GET.get('month','')
        if month == "":
            month = datetime.datetime.now().month

        day = self.request.GET.get('day','')
        if day == "":
            day = datetime.datetime.now().day

        branch_number = self.request.GET.get('branch','')
        if branch_number == "":
            branch_number=1

        query="select core_event.id, core_event.start_datetime, core_event.end_datetime, core_event.state_id, core_eventstate.label from core_event inner join core_eventstate on core_event.state_id=core_eventstate.id where core_event.branch_id={} and core_event.start_datetime between '{}-{}-{} 00:00:00' and '{}-{}-{} 00:00:00'".format(branch_number,year,month,day,year,month,int(day)+7)
        queryset=EventJoinEventState.objects.raw(query)
        return queryset