from django.contrib import admin
from .models import *
from .task.models import *
from .workflow.models import *

admin.site.register(MachineState)
admin.site.register(BranchOffice)
admin.site.register(Employee)
admin.site.register(MachineType)
admin.site.register(Machine)

admin.site.register(EventType)
admin.site.register(EventState)
admin.site.register(Event)
admin.site.register(OrderDetails)
admin.site.register(MaintenancePeriod)
admin.site.register(MaintenanceDetails)
admin.site.register(Priority)
admin.site.register(ReparationDetails)
admin.site.register(EventJoinOrder)
admin.site.register(EventJoinEventState)

admin.site.register(StepState)
admin.site.register(MachineWorkflowStep)
admin.site.register(Workflow)
admin.site.register(WorkflowSteps)
admin.site.register(MachineWorkflowStepJoinMachine)
admin.site.register(WorkflowJoinWSteps)