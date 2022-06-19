import json
from .serializers import *
from .models import *
from rest_framework import status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt


# esto desactiva los cors @csrf_exempt
@csrf_exempt
def login_view(request):
    if request.method == "POST":
        body = json.loads(request.body.decode('utf-8'))
        user = authenticate(request, username=body["username"], password=body["password"])
        if user is not None:
            login(request, user)
            return JsonResponse({"error": False, "status": 200, "message": "Successful login"})
        else:
            return JsonResponse({"error": True, "status": 200, "message": "Invalid username and/or password."})
    else:
        return JsonResponse({"error": True, "status": 200, "message": "Invalid method"})


class LoginView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(LoginView, self).dispatch(request, *args, **kwargs)

    def post(self, request):
        data = json.loads(request.body.decode('utf-8'))
        user = authenticate(request, username=data["username"], password=data["password"])
        if user is not None:
            login(request, user)
            return JsonResponse({"error": False, "status": 200, "message": "Successful login"})
        else:
            return JsonResponse({"error": True, "status": 200, "message": "Invalid username and/or password."})

    def get(self, request):
        return JsonResponse({"error": True, "status": 200, "message": "Invalid method"})

class MachineView(generics.ListAPIView):
    serializer_class = MachineSerializer
    def get_queryset(self):
        queryset = Machine.objects.all()
        branch_number = self.request.query_params.get('branch')
        if branch_number is not None:
            queryset = queryset.filter(branch=branch_number)
        return queryset

class BranchOfficeView(generics.ListAPIView):
    serializer_class = BranchOfficeSerializer
    def get_queryset(self):
        queryset = BranchOffice.objects.all()
        return queryset
    
    def post(self,request):
        queryset = BranchOffice.objects.all()
        return queryset
        
