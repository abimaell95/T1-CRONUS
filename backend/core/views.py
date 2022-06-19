from .serializers import *
from .models import *
from rest_framework import status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User



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
        
