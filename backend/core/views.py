from .serializers import MachineSerializer
from .models import Machine
from rest_framework import status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from core.serializers import UserSerializer



class MachineView(generics.ListAPIView):
    serializer_class = MachineSerializer
    def get_queryset(self):
        queryset = Machine.objects.all()
        branch_number = self.request.query_params.get('branch')
        if branch_number is not None:
            queryset = queryset.filter(branch=branch_number)
        return queryset

@api_view(['POST'])
def create_user(request):
    """
    Create New User
    """
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.create(request.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
