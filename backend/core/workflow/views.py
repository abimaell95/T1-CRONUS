from rest_framework import generics
from .serializers import *
from .models import *

class MachineWorkflowStepView(generics.ListAPIView):
    serializer_class = MachineWorkflowStepJoinMachineSerializer
    def get_queryset(self):
        id=self.request.GET.get('id','')
        queryset=MachineWorkflowStep.objects.raw("select core_machineworkflowstep.id, core_machineworkflowstep.order_id, core_machineworkflowstep.step_order, core_machineworkflowstep.end_datetime, core_machineworkflowstep.state_id, core_machinetype.label as step_activity from core_machineworkflowstep inner join core_machine on core_machineworkflowstep.machine_id=core_machine.serial_number inner join core_machinetype on core_machine.type_id=core_machinetype.id where core_machineworkflowstep.order_id = {}".format(id))
        return queryset

class WorkflowsView(generics.ListAPIView):
    serializer_class = WorkflowJoinWStepsSerializer
    def get_queryset(self):
        queryset = WorkflowJoinWSteps.objects.raw("select core_workflow.id, core_workflow.label, core_workflowsteps.id as step_id, core_workflowsteps.step_order, core_machinetype.label as type_label from core_workflow inner join core_workflowsteps on core_workflow.id = core_workflowsteps.workflow_id inner join core_machine on core_workflowsteps.machine_id=core_machine.serial_number inner join core_machinetype on core_machinetype.id = core_machine.type_id;")
        return queryset
