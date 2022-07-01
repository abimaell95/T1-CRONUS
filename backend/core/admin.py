from django.contrib import admin
from .models import MachineState, BranchOffice,\
    Employee, MachineType, Machine
from .task.models import EventType, EventState,\
    Event, OrderDetails, MaintenancePeriod, MaintenanceDetails,\
    Priority, ReparationDetails, EventJoinOrder, EventJoinEventState
from .workflow.models import StepState, MachineWorkflowStep, Workflow,\
    WorkflowSteps, MachineWorkflowStepJoinMachine, WorkflowJoinWSteps


class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'surname', 'branch_id')


class EventAdmin(admin.ModelAdmin):
    list_display = ('id', 'description', 'start_datetime', 'end_datetime')


admin.site.register(MachineState)
admin.site.register(BranchOffice)
admin.site.register(Employee, EmployeeAdmin)
admin.site.register(MachineType)
admin.site.register(Machine)


admin.site.register(EventType)
admin.site.register(EventState)
admin.site.register(Event, EventAdmin)
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
