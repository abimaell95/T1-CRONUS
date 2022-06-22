from rest_framework import viewsets, generics
from .serializers import *
from .models import *
from django.db import transaction
from django.http import JsonResponse
from django.utils.dateparse import parse_datetime
import json
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
class OrderView(generics.ListAPIView):
    serializer_class = EventJoinOrderSerializer
    def get_queryset(self):
        id=self.request.GET.get('id','')
        queryset=EventJoinOrder.objects.raw("select core_orderdetails.id, core_event.state_id as state, core_eventstate.label, core_event.description, core_orderdetails.num_pieces, core_employee.name, core_employee.surname, core_event.end_datetime, core_orderdetails.client_name, core_orderdetails.invoice_num, core_orderdetails.file_url from core_event inner join core_orderdetails on core_event.id = core_orderdetails.event_id inner join core_eventstate on core_eventstate.id = core_event.state_id inner join core_employee on core_event.employee_id=core_employee.id where core_orderdetails.id = {}".format(id))
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
            employee_id="0927643825",
            state_id=1,
            branch_id=1,
            type_id=jd["type"])
            e.save()
            eJson={'id':e.id,'start_datetime':e.start_datetime,'end_datetime':e.end_datetime,'employee_id':e.employee_id,'state_id':e.state_id,'branch_id':e.branch_id,'type_id':e.type_id}
        except Exception as ex:
            print(ex)
            datos={'message': "Error en Evento"}
            return JsonResponse(datos)

        try:
            o = OrderDetails.objects.create(client_name=jd["client_name"],
            invoice_num=jd["invoice_num"],
            file_url=jd["plan_file"],
            current_step_id=1,
            num_pieces=jd["pieces_number"],
            event=e)
            o.save()
            oJson={'id':o.id,'invoice_num':o.invoice_num,'file_url':o.file_url,'current_step_id':o.current_step_id,'num_pieces':o.num_pieces,'event_id':e.id}
        except Exception as ex:
            print(ex)
            datos={'message': "Error en el Order"}
            return JsonResponse(datos)

        try:
            workflowlist = jd["workflow"]
            l = len(workflowlist["steps"])
            c=1
            wList = []
            for step in workflowlist["steps"]:
                w = workflowModels.MachineWorkflowStep.objects.create(
                    step_order = step["order"],
                    state_id = 1,
                    end_datetime = datetime.datetime(2019, 1, 1, 0, 0, 0),
                    machine_id = "000"+str(c),
                    order = o)
                w.save()
                wJson={'id':w.id,'step_order':w.step_order,'state_id':w.state_id,'end_datetime':w.end_datetime,'machine_id':w.machine_id,'order_id':o.id}
                wList.append(wJson)
                c+=1
            datos={'message': "success", 'evento:':eJson, 'order':oJson, 'WorflowMachineSteps':wList}

        except Exception as ex:
            print(ex)
            datos={'message': "Error en el Workflow"}
            return JsonResponse(datos)

        return JsonResponse(datos)


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
        
        query="select core_orderdetails.id, core_orderdetails.invoice_num, core_orderdetails.client_name, core_event.start_datetime, core_event.end_datetime, core_event.state_id as state, core_eventstate.label as state_label, core_employee.name, core_employee.surname, core_machinetype.label as type_label from core_event inner join core_orderdetails on core_event.id=core_orderdetails.event_id and core_event.branch_id = {} and core_event.start_datetime between '{}-{}-{} 00:00:00' and '{}-{}-{} 00:00:00' inner join core_eventstate on core_event.state_id = core_eventstate.id inner join core_machineworkflowstep on core_orderdetails.current_step_id = core_machineworkflowstep.id inner join core_machine on core_machine.serial_number = core_machineworkflowstep.machine_id inner join core_machinetype on core_machinetype.id=core_machine.type_id inner join core_employee on core_event.employee_id=core_employee.id".format(branch_number,year,month,day,year,month,int(day)+5)
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

        period = self.request.GET.get('period','')
        if period == 0: #weekly
            query_date="core_event.start_datetime between '{}-{}-{} 00:00:00' and '{}-{}-{} 00:00:00'".format(year,month,day,year,month,int(day)+5)
        else: #daily
            query_date="core_event.start_datetime between '{0}-{1}-{2} 00:00:00' and '{0}-{1}-{2} 23:59:59'".format(year,month,day)

        query="select core_event.id, core_event.start_datetime, core_event.end_datetime, core_event.state_id, core_eventstate.label from core_event inner join core_eventstate on core_event.state_id=core_eventstate.id where core_event.branch_id={} and {}".format(branch_number,query_date)
        queryset=EventJoinEventState.objects.raw(query)
        return queryset

def available_hours(request):
    
    if request.method == 'GET':

        branch = request.GET.get("branch") or 1
        date = request.GET.get("date") or "2022-02-22"
        data = Event.objects.filter(branch__id= branch, start_datetime__range=[date+" 00:00:00",date+" 23:59:59"]).extra(order_by=["start_datetime"])
        eventos = list(data)
        o = len(list(data))
        c = 0

        availablesList = []
        for i in range(6,18):
            if(c<o):
                e = eventos[c]
                d = e.start_datetime
                h = int(d.hour)
                if(h == i):
                    c+=1
                else:
                    availableDic = {"start":i,"end":i+1}
                    availablesList.append(availableDic)
            else:
                availableDic = {"start":i,"end":i+1}
                availablesList.append(availableDic)

        return JsonResponse({"message":availablesList})