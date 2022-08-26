from ..models import Machine, MachineState
from rest_framework import status
from rest_framework import viewsets, generics
from rest_framework.response import Response
from .serializers import EventTypeSerializer, MaintenancePeriodSerializer,\
    PrioritySerializer, EventJoinOrderSerializer,\
    EventJoinOrdersSerializer, EventJoinEventStateSerializer,\
    EventStateSerializer, MachineOrdersSerializer
from .models import EventType, MaintenancePeriod, Priority, EventJoinOrder,\
    Event, OrderDetails, EventJoinOrders, EventJoinEventState, EventState,\
    MachineOrdersModel
from django.db import transaction
from django.http import JsonResponse
import json
from ..workflow import models as workflowModels

from datetime import datetime
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings


class EventTypeViewSet(viewsets.ModelViewSet):
    queryset = EventType.objects.all().order_by("id")
    serializer_class = EventTypeSerializer


class EventStateViewSet(viewsets.ModelViewSet):
    queryset = EventState.objects.all().order_by("id")
    serializer_class = EventStateSerializer


class MaintenancePeriodViewSet(viewsets.ModelViewSet):
    queryset = MaintenancePeriod.objects.all().order_by("id")
    serializer_class = MaintenancePeriodSerializer


class PriorityViewSet(viewsets.ModelViewSet):
    queryset = Priority.objects.all().order_by("id")
    serializer_class = PrioritySerializer


# JOIN TABLES VIEWS
class OrderView(generics.ListCreateAPIView):
    serializer_class = EventJoinOrderSerializer

    def list(self, request, *args, **kwargs):
        id = request.GET.get("id", "")
        queryset = EventJoinOrder.objects.raw(
            "select core_orderdetails.id, core_event.state_id"
            " as state, core_eventstate.label, core_event.description,"
            " core_orderdetails.num_pieces_id as num_pieces,"
            " core_employee.name, core_employee.surname,"
            " core_event.end_datetime, core_orderdetails.client_name,"
            " core_orderdetails.invoice_num, core_orderdetails.file_url"
            " from core_event inner join core_orderdetails on"
            " core_event.id = core_orderdetails.event_id"
            " inner join core_eventstate on"
            " core_eventstate.id = core_event.state_id"
            " inner join core_employee on"
            " core_event.employee_id=core_employee.id"
            " where core_orderdetails.id = {}".format(id)
        )
        serializer = self.get_serializer(queryset, many=True)
        if len(serializer.data):
            return Response({
                'data': serializer.data,
            }, status=status.HTTP_200_OK)
        return Response({
            "data": [],
            "message": "Not found."
        }, status=status.HTTP_404_NOT_FOUND)

    @transaction.atomic
    def post(self, request):

        try:
            #Start Date and Time config
            start_date= request.POST.get('start_date')
            start_time= request.POST.get('start_time')
            if int(start_time) < 10:
                str_start = "0" + str(start_time) + ":00"
            else:
                str_start = str(start_time) + ":00"
            start_datetime = start_date + " " + str_start
            
            #End Date and Time config
            end_date = request.POST.get('end_date')
            end_time= request.POST.get('end_time')
            if int(end_time) < 10:
                str_end = "0" + str(end_time) + ":00"
            else:
                str_end = str(end_time) + ":00"
            end_datetime = end_date + " " + str_end

            #Other Data
            description = request.POST.get('description')
            type_id = request.POST.get('type')
            client_name= request.POST.get('client_name')
            invoice_num= request.POST.get('invoice_number')
            pieces_range_id= request.POST.get('pieces_range_id')
            services= request.POST.get('services')
            services = services.strip("[]")
            machine_list = services.split(",")

            #Constants
            firstStep = 1 #Paso 1
            firstState = 1 #No Iniciado
            
            #Session Data
            employee_id="0123968574"
            branch_id=2

            #File Data
            file= request.FILES.get('plan_file')
            plan_file_url = default_storage.save('tmp/especificaciones-'+str(invoice_num)+'.pdf', ContentFile(file.read()))
            
            try:
                e = Event.objects.create(
                    description=description,
                    start_datetime=start_datetime,
                    end_datetime=end_datetime,
                    employee_id=employee_id,
                    state_id=firstState,
                    branch_id=branch_id,
                    type_id=type_id,
                )
                e.save()
                eJson = {
                    'id': e.id,
                    'description': e.description,
                    'start_datetime': e.start_datetime,
                    'end_datetime': e.end_datetime,
                    'employee_id': e.employee_id,
                    'state_id': e.state_id,
                    'branch_id': e.branch_id,
                    'type_id': e.type_id
                }
            except Exception as ex:
                return Response({
                            "data": [],
                            "message": "Error while creating the event record."
                                    + str(ex)
                        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            try:
                o = OrderDetails.objects.create(
                    client_name=client_name,
                    invoice_num=invoice_num,
                    file_url=str(plan_file_url),
                    current_step=firstStep,
                    num_pieces_id=pieces_range_id,
                    event=e,
                )
                o.save()
                oJson = {
                    'id': o.id,
                    'invoice_num': o.invoice_num,
                    'file_url': o.file_url,
                    'current_step': o.current_step,
                    'num_pieces_id': o.num_pieces_id,
                    'event_id': e.id
                }
            except Exception as ex:
                return Response({
                            "data": [],
                            "message": "Error while creating the order record."
                                    + str(ex)
                        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            try:
                print(machine_list)
                print(type(machine_list))
                machines= Machine.objects.filter(serial_number__in=machine_list)
                print(machines)
                workflowList = []
                for machine in machines:
                    print(machine.serial_number)
                    w = workflowModels.MachineWorkflowStep.objects.create(
                        state_id = firstState,
                        machine_id = machine.serial_number,
                        order = o)
                    w.save()
                    wJson = {
                        'id': w.id,
                        'state_id': w.state_id,
                        'machine_id': w.machine_id,
                        'order_id': o.id
                    }
                    workflowList.append(wJson)
            except Exception as ex:
                return Response({
                            "data": [],
                            "message": "Error while creating the MWStep record."
                                    + str(ex)
                        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            return Response({
                            "data": {"event": eJson, "order": oJson,
                                    "WorflowMachineSteps": workflowList},
                            "message": "Ok"
                            }, status=status.HTTP_201_CREATED)

        except Exception as ex:
            return Response({
                        "data": [],
                        "message": "Error while creating the event record."
                                   + str(ex)
                    }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class OrdersView(generics.ListAPIView):
    serializer_class = EventJoinOrdersSerializer

    def list(self, request, *args, **kwargs):
        year = request.GET.get("year", datetime.datetime.now().year)
        month = request.GET.get("month", datetime.datetime.now().month)
        day = request.GET.get("day", datetime.datetime.now().day)
        branch_number = request.GET.get("branch", 1)

        if int(day) < 4:
            day_str = "0{}".format(int(day)+6)
        else:
            day_str = "{}".format(int(day)+6)

        query = (
            "select core_orderdetails.id, core_orderdetails.invoice_num,"
            " core_orderdetails.client_name, core_event.start_datetime,"
            " core_event.end_datetime, core_event.state_id"
            " as state, core_eventstate.label as state_label,"
            " core_employee.name, core_employee.surname,"
            " core_event.branch_id,"
            " core_machinetype.label as type_label from"
            " core_event inner join core_orderdetails"
            " on core_event.id=core_orderdetails.event_id"
            " and core_event.branch_id = {} and core_event.start_datetime"
            " between '{}-{}-{} 00:00:00' and '{}-{}-{} 00:00:00'"
            " inner join core_eventstate on"
            " core_event.state_id = core_eventstate.id"
            " inner join core_machineworkflowstep on"
            " core_orderdetails.current_step = core_machineworkflowstep.id"
            " inner join core_machine on core_machine.serial_number = "
            " core_machineworkflowstep.machine_id inner join"
            " core_machinetype on core_machinetype.id=core_machine.type_id"
            " inner join core_employee on "
            " core_event.employee_id=core_employee.id".format(
                branch_number, year, month, day, year, month, day_str
            )
        )
        queryset = EventJoinOrders.objects.raw(query)
        serializer = self.get_serializer(queryset, many=True)
        if len(serializer.data):
            return Response({
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "data": [],
            "message": "No content."
        }, status=status.HTTP_204_NO_CONTENT)


class EventsView(generics.ListAPIView):
    serializer_class = EventJoinEventStateSerializer

    def list(self, request, *args, **kwargs):
        year = request.GET.get("year", datetime.datetime.now().year)
        month = request.GET.get("month", datetime.datetime.now().month)
        day = request.GET.get("day", datetime.datetime.now().day)

        machine_type = request.GET.get("service", "")
        if machine_type == "":
            select_state = "core_event.state_id, core_eventstate.label, "
            join_state = "inner join core_eventstate on" \
                         " core_event.state_id=core_eventstate.id"
            query_filter = ""

        else:
            select_state = "core_machineworkflowstep.state_id," \
                           " core_stepstate.label, "
            join_state = " inner join core_machineworkflowstep" \
                         " on core_orderdetails.id = core_machine" \
                         "workflowstep.order_id inner join core_machine" \
                         " on core_machineworkflowstep.machine_id=core_" \
                         "machine.serial_number inner join core_machinetype" \
                         " on core_machine.type_id=core_machinetype.id" \
                         " inner join core_stepstate on" \
                         " core_machineworkflowstep.state_id=core_stepstate.id"
            query_filter = "and core_machinetype.id={}".format(machine_type)

        branch_number = request.GET.get("branch", 1)

        period = request.GET.get("period", "")
        if period == "0":
            # weekly
            query_date = "core_event.start_datetime between" \
                         " '{}-{}-{} 00:00:00' and" \
                         " '{}-{}-{} 23:59:59'".format(year, month,
                                                       day, year, month,
                                                       int(day) + 6)
        else:
            # daily
            query_date = "core_event.start_datetime between" \
                         " '{0}-{1}-{2} 00:00:00' and" \
                         " '{0}-{1}-{2} 23:59:59'".format(year, month, day)

        query = (
            "select core_event.id, core_event.start_datetime,"
            " core_event.end_datetime, {}core_orderdetails.invoice_num,"
            " core_orderdetails.client_name"
            " from core_event inner join core_orderdetails"
            " on core_event.id=core_orderdetails.event_id {}"
            " where core_event.branch_id={} and {} {}".format(
                select_state, join_state, branch_number,
                query_date, query_filter
            )
        )

        queryset = EventJoinEventState.objects.raw(query)

        serializer = self.get_serializer(queryset, many=True)
        print(query)
        print(serializer.data)
        if len(serializer.data):
            return Response({
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "data": [],
            "message": "No content."
        }, status=status.HTTP_204_NO_CONTENT)


def available_hours(request):

    if request.method == "GET":
        branch = request.GET.get("branch", 1)
        if branch is None:
            return JsonResponse({
                        "data": [],
                        "message": "No branch value. A"
                        " BranchOffice is needed for this transaction."},
                        status=status.HTTP_400_BAD_REQUEST)

        date = request.GET.get("date", '2022-02-22')
        if date is None:
            return JsonResponse({
                        "data": [],
                        "message": "No date value."
                        " A Date is needed for this transaction."},
                        status=status.HTTP_400_BAD_REQUEST)

        data = Event.objects.filter(
            branch__id=branch,
            start_datetime__range=[date + " 00:00:00", date + " 23:59:59"],
        ).extra(order_by=["start_datetime"])

        eventos = list(data)
        o = len(list(data))
        c = 0

        availablesList = []
        for i in range(6, 18):
            if c < o:
                e = eventos[c]
                d = e.start_datetime
                h = int(d.hour)
                if h == i:
                    c += 1
                else:
                    availableDic = {"start": i, "end": i + 1}
                    availablesList.append(availableDic)
            else:
                availableDic = {"start": i, "end": i + 1}
                availablesList.append(availableDic)

        return JsonResponse({
                    "data": availablesList},
                    status=status.HTTP_200_OK)


class MachineOrdersView(generics.ListAPIView):
    serializer_class = MachineOrdersSerializer

    def list(self, request, *args, **kwargs):
        start_date = request.GET.get(
                "start_date",
                datetime.datetime.now().date()
            )
        end_date = request.GET.get(
                "end_date",
                datetime.datetime.now().date()
            )
        machine_number = request.GET.get("machine", "")

        query = (
            "select"
            " core_orderdetails.id,"
            " core_orderdetails.invoice_num,"
            " core_orderdetails.client_name,"
            " core_machineworkflowstep.machine_id as serial_number,"
            " core_machineworkflowstep.state_id as step_state,"
            " core_event.start_datetime as schedule_date"
            " from core_orderdetails inner join core_event"
            " on core_orderdetails.event_id = core_event.id"
            " inner join core_machineworkflowstep"
            " on core_orderdetails.id=core_machineworkflowstep.order_id"
            " where core_event.start_datetime between '{} 00:00:00' and"
            " '{} 23:59:59' and core_machineworkflowstep.machine_id = {}"
            " and core_machineworkflowstep.state_id <> 4;".format(
                start_date, end_date, machine_number
            )
        )

        queryset = MachineOrdersModel.objects.raw(query)
        serializer = self.get_serializer(queryset, many=True)
        if len(serializer.data):
            return Response({
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "data": [],
            "message": "No content."
        }, status=status.HTTP_204_NO_CONTENT)
