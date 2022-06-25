import json
from .serializers import *
from .models import *
from rest_framework import viewsets
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

class BranchOfficeViewSet(viewsets.ModelViewSet):
    queryset = BranchOffice.objects.all().order_by('id')
    serializer_class = BranchOfficeSerializer

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
