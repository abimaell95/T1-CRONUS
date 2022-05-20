from rest_framework import generics
from .serializers import MachineSerializer
from .models import Machine

class MachineView(generics.ListAPIView):
    serializer_class = MachineSerializer
    def get_queryset(self):
        queryset = Machine.objects.all()
        branch_number = self.request.query_params.get('branch')
        if branch_number is not None:
            queryset = queryset.filter(branch=branch_number)
        return queryset