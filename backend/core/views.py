import json
import numpy as np
from .task.serializers import PiecesRangeSerializer
from .task.models import PiecesRange

from .serializers import BranchOfficeSerializer, \
    MachineJoinTypeSerializer, MachineTypeSerializer
from .models import BranchOffice, MachineJoinType, MachineType

from rest_framework import status
from rest_framework import viewsets, generics
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt


class BranchOfficeViewSet(viewsets.ModelViewSet):
    queryset = BranchOffice.objects.all().order_by("id")
    serializer_class = BranchOfficeSerializer


class MachinesView(generics.ListAPIView):
    serializer_class = MachineJoinTypeSerializer

    def list(self, request, *args, **kwargs):
        branch_number = request.GET.get("branch", 1)

        query = (
            "select core_machine.serial_number, core_machine.model,"
            " core_machine.brand, core_machinetype.label,"
            " core_machine.step_order, core_machine.type_id,"
            " core_machine.branch_id"
            " from core_machine inner join core_machinetype"
            " on core_machine.type_id=core_machinetype.id"
            " where core_machine.branch_id = {}".format(
                branch_number
            )
        )
        queryset = MachineJoinType.objects.raw(query)
        serializer = self.get_serializer(queryset, many=True)

        data = np.array(serializer.data)
        orders = []
        for i in serializer.data:
            orders.append(int(i["step_order"]))
        orders = np.array(orders)
        data = data[np.argsort(orders)]

        if len(serializer.data):
            return Response({
                'data': list(data)
            }, status=status.HTTP_200_OK)
        return Response({
            "data": [],
            "message": "No content."
        }, status=status.HTTP_204_NO_CONTENT)


class MachineTypeView(viewsets.ModelViewSet):
    queryset = MachineType.objects.all().order_by("id")
    serializer_class = MachineTypeSerializer


class PiecesRangeView(viewsets.ModelViewSet):
    queryset = PiecesRange.objects.all().order_by("id")
    serializer_class = PiecesRangeSerializer


@csrf_exempt
def login_view(request):
    if request.method == "POST":
        body = json.loads(request.body.decode("utf-8"))
        user = authenticate(
            request, username=body["username"], password=body["password"]
        )
        if user is not None:
            login(request, user)
            return JsonResponse(
                {"error": False, "status": 200, "message": "Successful login"}
            )
        else:
            return JsonResponse(
                {
                    "error": True,
                    "status": 200,
                    "message": "Invalid username and/or password.",
                }
            )
    else:
        return JsonResponse({"error": True, "status": 200,
                             "message": "Invalid method"})


class LoginView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(LoginView, self).dispatch(request, *args, **kwargs)

    def post(self, request):
        data = json.loads(request.body.decode("utf-8"))
        user = authenticate(
            request, username=data["username"], password=data["password"]
        )
        if user is not None:
            login(request, user)
            return JsonResponse(
                {"error": False, "status": 200, "message": "Successful login"}
            )
        else:
            return JsonResponse(
                {
                    "error": True,
                    "status": 200,
                    "message": "Invalid username and/or password.",
                }
            )

    def get(self, request):
        return JsonResponse({"error": True, "status": 200,
                             "message": "Invalid method"})
