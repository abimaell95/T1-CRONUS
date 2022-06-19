from rest_framework import generics
from .serializers import *
from .models import *

class MachineWorkflowStepView(generics.ListAPIView):
    serializer_class = MachineWorkflowStepSerializer
    def get_queryset(self, id=0):
        queryset=MachineWorkflowStep.objects.raw("select * from core_machineworkflowstep where core_machineworkflowstep.order_id = {}".format(id))
        return queryset


class WorkflowsView(generics.ListAPIView):
    serializer_class = WorkflowJoinWStepsSerializer
    def get_queryset(self):
        queryset = WorkflowJoinWSteps.objects.raw("select core_workflow.workflow_id, core_workflow.label, core_workflowsteps.workflowsteps_id, core_workflowsteps.step_order, core_workflowsteps.machine_id from core_workflow inner join core_workflowsteps on core_workflow.workflow_id = core_workflowsteps.workflow_id")
        return queryset

