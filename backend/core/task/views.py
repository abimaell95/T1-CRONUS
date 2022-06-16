from rest_framework import viewsets, generics
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
        queryset=EventJoinOrder.objects.raw("select core_event.event_id, core_event.description, core_event.start_datetime, core_event.end_datetime, core_event.duration, core_event.state_id, core_event.branch_id, core_event.type_id, core_orderdetails.event_id, core_orderdetails.invoice_num, core_orderdetails.espec_file_url, core_orderdetails.num_pieces, core_orderdetails.client_name from core_event inner join core_orderdetails on core_event.event_id=core_orderdetails.event_id where core_event.event_id = {}".format(id))
        return queryset

class ReparationView(generics.ListAPIView):
    serializer_class = EventJoinReparationSerializer
    def get_queryset(self, id=0):
        queryset=EventJoinReparation.objects.raw("select core_event.event_id, core_event.description, core_event.start_datetime, core_event.end_datetime, core_event.duration, core_event.state_id, core_event.branch_id, core_event.type_id, core_reparationdetails.reparation_id, core_reparationdetails.reason, core_reparationdetails.priority_id from core_event inner join core_reparationdetails on core_event.event_id=core_reparationdetails.event_id where core_event.event_id = {}".format(id))
        return queryset

class MaintenanceView(generics.ListAPIView):
    serializer_class = EventJoinMaintenanceSerializer
    def get_queryset(self, id=0):
        queryset=EventJoinMaintenance.objects.raw("select core_event.event_id, core_event.description, core_event.start_datetime, core_event.end_datetime, core_event.duration, core_event.state_id, core_event.branch_id, core_event.type_id, core_maintenancedetails.maintenance_id, core_maintenancedetails.repetitions, core_maintenancedetails.frecuency, core_maintenancedetails.period_id from core_event inner join core_maintenancedetails on core_event.event_id=core_maintenancedetails.event_id where core_event.event_id = {} ".format(id))
        return queryset

class OrdersView(generics.ListAPIView):
    serializer_class = EventJoinOrderSerializer

    def get_queryset(self):
        year = self.request.query_params.get('year')
        if year is None:
            year = datetime.datetime.now().year-2000

        month = self.request.query_params.get('month')
        if month is None:
            month = datetime.datetime.now().month

        day = self.request.query_params.get('day')
        if day is None:
            day = datetime.datetime.now().day
        
        date_str = '{}-{}-{}'.format(day,month,year)
        dayofweek = datetime.datetime.strptime(date_str, '%d-%m-%y').weekday()

        period = self.request.query_params.get('period')
        if period == 1: #daily
            date_query = "core_event.start_datetime = {}-{}-{}".format(day,month,year)
        else: # == 2 weekly
            if dayofweek==0:
                date_query = "core_event.start_datetime between '{}-{}-{}' and '{}-{}-{}'".format(day,month,year,day+5,month,year)        
            elif dayofweek==1:
                date_query = "core_event.start_datetime between '{}-{}-{}' and '{}-{}-{}'".format(day-1,month,year,day+4,month,year)        
            elif dayofweek==2:
                date_query = "core_event.start_datetime between '{}-{}-{}' and '{}-{}-{}'".format(day-2,month,year,day+3,month,year)        
            elif dayofweek==3:
                date_query = "core_event.start_datetime between '{}-{}-{}' and '{}-{}-{}'".format(day-3,month,year,day+2,month,year)        
            elif dayofweek==4:
                date_query = "core_event.start_datetime between '{}-{}-{}' and '{}-{}-{}'".format(day-4,month,year,day+1,month,year)        
            elif dayofweek==5:
                date_query = "core_event.start_datetime between '{}-{}-{}' and '{}-{}-{}'".format(day-5,month,year,day,month,year)        

        branch_number = self.request.query_params.get('branch')
        if branch_number is None:
            branch_number=0

        queryset=EventJoinOrder.objects.raw("select core_event.event_id, core_event.description, core_event.start_datetime, core_event.end_datetime, core_event.duration, core_event.state_id, core_event.branch_id, core_event.type_id, core_orderdetails.event_id, core_orderdetails.invoice_num, core_orderdetails.espec_file_url, core_orderdetails.num_pieces, core_orderdetails.client_name from core_event inner join core_orderdetails on core_event.event_id=core_orderdetails.event_id where core_event.branch_id={} and {}".format(branch_number,date_query))
        return queryset
    
class ReparationsView(generics.ListAPIView):
    serializer_class = EventJoinReparationSerializer
    def get_queryset(self):
        year = self.request.query_params.get('year')
        if year is None:
            year = datetime.datetime.now().year-2000

        month = self.request.query_params.get('month')
        if month is None:
            month = datetime.datetime.now().month

        day = self.request.query_params.get('day')
        if day is None:
            day = datetime.datetime.now().day
        
        date_str = '{}-{}-{}'.format(day,month,year)
        dayofweek = datetime.datetime.strptime(date_str, '%d-%m-%y').weekday()

        period = self.request.query_params.get('period')
        if period == 1: #daily
            date_query = "core_event.start_datetime = {}-{}-{}".format(day,month,year)
        else: # == 2 weekly
            if dayofweek==0:
                date_query = "core_event.start_datetime between '{}-{}-{}' and '{}-{}-{}'".format(day,month,year,day+5,month,year)        
            elif dayofweek==1:
                date_query = "core_event.start_datetime between '{}-{}-{}' and '{}-{}-{}'".format(day-1,month,year,day+4,month,year)        
            elif dayofweek==2:
                date_query = "core_event.start_datetime between '{}-{}-{}' and '{}-{}-{}'".format(day-2,month,year,day+3,month,year)        
            elif dayofweek==3:
                date_query = "core_event.start_datetime between '{}-{}-{}' and '{}-{}-{}'".format(day-3,month,year,day+2,month,year)        
            elif dayofweek==4:
                date_query = "core_event.start_datetime between '{}-{}-{}' and '{}-{}-{}'".format(day-4,month,year,day+1,month,year)        
            elif dayofweek==5:
                date_query = "core_event.start_datetime between '{}-{}-{}' and '{}-{}-{}'".format(day-5,month,year,day,month,year)        

        branch_number = self.request.query_params.get('branch')

        if branch_number is None:
            branch_number=0

        queryset=EventJoinReparation.objects.raw("select core_event.event_id, core_event.description, core_event.start_datetime, core_event.end_datetime, core_event.duration, core_event.state_id, core_event.branch_id, core_event.type_id, core_reparationdetails.reparation_id, core_reparationdetails.reason, core_reparationdetails.priority_id from core_event inner join core_reparationdetails on core_event.event_id=core_reparationdetails.event_id where core_event.branch_id = {} and {}".format(branch_number,date_query))
        return queryset

class MaintenancesView(generics.ListAPIView):
    serializer_class = EventJoinMaintenanceSerializer
    def get_queryset(self):
        year = self.request.query_params.get('year')
        if year is None:
            year = datetime.datetime.now().year-2000

        month = self.request.query_params.get('month')
        if month is None:
            month = datetime.datetime.now().month

        day = self.request.query_params.get('day')
        if day is None:
            day = datetime.datetime.now().day
        
        date_str = '{}-{}-{}'.format(day,month,year)
        dayofweek = datetime.datetime.strptime(date_str, '%d-%m-%y').weekday()

        period = self.request.query_params.get('period')
        if period == 1: #daily
            date_query = "core_event.start_datetime = {}-{}-{}".format(day,month,year)
        else: # == 2 weekly
            if dayofweek==0:
                date_query = "core_event.start_datetime between '{}-{}-{}' and '{}-{}-{}'".format(day,month,year,day+5,month,year)        
            elif dayofweek==1:
                date_query = "core_event.start_datetime between '{}-{}-{}' and '{}-{}-{}'".format(day-1,month,year,day+4,month,year)        
            elif dayofweek==2:
                date_query = "core_event.start_datetime between '{}-{}-{}' and '{}-{}-{}'".format(day-2,month,year,day+3,month,year)        
            elif dayofweek==3:
                date_query = "core_event.start_datetime between '{}-{}-{}' and '{}-{}-{}'".format(day-3,month,year,day+2,month,year)        
            elif dayofweek==4:
                date_query = "core_event.start_datetime between '{}-{}-{}' and '{}-{}-{}'".format(day-4,month,year,day+1,month,year)        
            elif dayofweek==5:
                date_query = "core_event.start_datetime between '{}-{}-{}' and '{}-{}-{}'".format(day-5,month,year,day,month,year)        

        branch_number = self.request.query_params.get('branch')
        if branch_number is None:
            branch_number=1
        
        queryset=EventJoinMaintenance.objects.raw("select core_event.event_id, core_event.description, core_event.start_datetime, core_event.end_datetime, core_event.duration, core_event.state_id, core_event.branch_id, core_event.type_id, core_maintenancedetails.maintenance_id, core_maintenancedetails.repetitions, core_maintenancedetails.frecuency, core_maintenancedetails.period_id from core_event inner join core_maintenancedetails on core_event.event_id=core_maintenancedetails.event_id where core_event.branch_id = {} and {}".format(branch_number,date_query))
        return queryset