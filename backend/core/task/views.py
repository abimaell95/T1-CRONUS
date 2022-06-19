from asyncio.windows_events import NULL
from platform import machine
from xmlrpc.client import DateTime
from django.db import transaction
from django.http import JsonResponse
from rest_framework import status,viewsets, generics
from rest_framework.response import Response
from rest_framework import viewsets, generics
import json
from .serializers import *
from .models import *
from ..workflow import models as workflowModels
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
class OrderView(generics.ListCreateAPIView):
    serializer_class = EventJoinOrderSerializer
    def get_queryset(self, id=0):
        queryset=EventJoinOrder.objects.raw("select core_event.event_id, core_event.description, core_event.start_datetime, core_event.end_datetime, core_event.duration, core_event.state_id, core_event.branch_id, core_event.type_id, core_orderdetails.event_id, core_orderdetails.invoice_num, core_orderdetails.espec_file_url, core_orderdetails.num_pieces, core_orderdetails.client_name from core_event inner join core_orderdetails on core_event.event_id=core_orderdetails.event_id where core_event.event_id = {}".format(id))
        return queryset

    @transaction.atomic
    def post(self,request):
        jd = json.loads(request.body)

        if(jd["start_time"]<10):
            start = "0"+str(jd["start_time"])+":00"
        else:
            start = str(jd["start_time"])+":00"

        if(jd["end_time"]<10):
            end = "0"+str(jd["end_time"])+":00"
        else:
            end = str(jd["end_time"])+":00"
        #print(jd)
        try:
            e = Event.objects.create(description=jd["description"],
            start_datetime=jd["start_date"]+"-"+start,
            end_datetime=jd["end_date"]+"-"+end,
            employee_id=jd["employee"],
            state_id=jd["state"],
            branch_id=jd["branch"],
            type_id=jd["type"])
            e.save()
            print(e)
        except Exception as ex:
            print(ex)
            datos={'message': "Error en Evento"}
            return JsonResponse(datos)

        try:
            o = OrderDetails.objects.create(client_name=jd["client_name"],
            invoice_num=jd["invoice_num"],
            file_url=jd["plan_file"],
            current_step_id=jd["current_step"],
            num_pieces=jd["pieces_number"],
            event=e)
            o.save()
            print(o)
        except Exception as ex:
            print(ex)
            datos={'message': "Error en el Order"}
            return JsonResponse(datos)

        try:
            workflowlist = jd["workflow"]
            for step in workflowlist["steps"]:
                workflowModels.MachineWorkflowStep.objects.create(
                    step_order = step["order"],
                    state_id = 1,
                    machine_id = step["machine"]["id"],
                    order = o)
            datos={'message': "success"}

        except Exception as ex:
            print(ex)
            datos={'message': "Error en el Workflow"}
            return JsonResponse(datos)

        return JsonResponse(datos)

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