from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response
from .serializers import ProductivityReportSerializer, OrdersResumeSerializer
from .models import ProductivityReportModel, OrdersResumeModel
import datetime


# JOIN TABLES VIEWS
class ProductivityReport(generics.ListCreateAPIView):
    serializer_class = ProductivityReportSerializer

    def list(self, request, *args, **kwargs):
        start_date = request.GET.get(
                "start_date",
                datetime.datetime.now().date()
            )
        end_date = request.GET.get(
                "end_date",
                datetime.datetime.now().date()
            )
        branch_number = request.GET.get("branch", 1)

        query = (
            "select core_orderdetails.invoice_num, core_piecesrange.range,"
            " core_machinetype.id as type_id,"
            " core_machinetype.label as type_label,"
            " core_event.start_datetime as schedule_date,"
            " core_event.end_datetime, core_machineworkflowstep.start_datetime"
            ", as step_start, core_machineworkflowstep.end_datetime"
            " as step_end core_stepstate.label as state_label,"
            " core_machineworkflowstep.state_id,"
            " core_event.branch_id from core_event"
            " inner join core_orderdetails on"
            " core_event.id=core_orderdetails.event_id"
            " inner join core_piecesrange on core_orderdetails.num_pieces_id="
            " core_piecesrange.id"
            " inner join core_machineworkflowstep on core_orderdetails.id"
            " = core_machineworkflowstep.order_id"
            " inner join core_stepstate on"
            " core_stepstate.id=core_machineworkflowstep.state_id"
            " inner join core_machine on core_machine.serial_number"
            " = core_machineworkflowstep.machine_id"
            " inner join core_machinetype on core_machinetype.id"
            " = core_machine.type_id"
            " where core_event.state_id in (3,6) and"
            " core_event.branch_id in ({}) and core_event.start_datetime"
            " between '{} 00:00:00' and '{} 23:59:59'".format(
                branch_number, start_date, end_date
                )
        )

        queryset = ProductivityReportModel.objects.raw(query)
        serializer = self.get_serializer(queryset, many=True)

        if len(serializer.data):
            return Response({
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "data": [],
            "message": "No content."
        }, status=status.HTTP_204_NO_CONTENT)


class OrdersResume(generics.ListCreateAPIView):
    serializer_class = OrdersResumeSerializer

    def list(self, request, *args, **kwargs):
        start_date = request.GET.get(
                "start_date",
                datetime.datetime.now().date()
                )
        end_date = request.GET.get(
                "end_date",
                datetime.datetime.now().date()
            )
        branch_number = request.GET.get("branch", 1)
        query = (
            "select core_event.id, core_event.state_id, core_event.branch_id"
            " from core_event where core_event.branch_id in ({})"
            " and core_event.start_datetime between"
            " '{} 00:00:00' and '{} 23:59:59'".format(
                branch_number, start_date, end_date
                )
        )

        print(query)
        queryset = OrdersResumeModel.objects.raw(query)
        serializer = self.get_serializer(queryset, many=True)
        data = {}

        for r in serializer.data:
            if data.get(r["branch_id"], -1) == -1:
                data[r["branch_id"]] = {
                    'completed': 1 if r["state_id"] == 3 else 0,
                    'delayed': 1 if r["state_id"] == 6 else 0,
                    'no_completed': 1 if r["state_id"] == 1 or 2 else 0
                }
            else:
                if r["state_id"] == 3:
                    data[r["branch_id"]]["completed"] += 1
                elif r["state_id"] == 6:
                    data[r["branch_id"]]["delayed"] += 1
                elif r["state_id"] == 1 or 2:
                    data[r["branch_id"]]["no_completed"] += 1

        if len(serializer.data):
            return Response({
                'data': data
            }, status=status.HTTP_200_OK)
        return Response({
            "data": [],
            "message": "No content."
        }, status=status.HTTP_204_NO_CONTENT)
