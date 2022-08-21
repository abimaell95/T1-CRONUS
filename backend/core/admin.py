from atexit import register
from django.contrib import admin
from .models import MachineState, BranchOffice,\
    Employee, MachineType, Machine, MachineJoinType
from .task.models import EventType, EventState,\
    Event, OrderDetails, PiecesRange, MaintenancePeriod, \
    MaintenanceDetails, Priority, ReparationDetails, \
    EventJoinOrder, EventJoinOrders, EventJoinEventState
from .workflow.models import StepState, MachineWorkflowStep, \
    MachineWorkflowStepJoinMachine
from .reports.models import ProductivityReportModel, \
    OrdersResumeModel


class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'surname', 'branch_id')


class EventAdmin(admin.ModelAdmin):
    list_display = ('id', 'description', 'start_datetime', 'end_datetime')


admin.site.register(Machine)
admin.site.register(MachineState)
admin.site.register(BranchOffice)
admin.site.register(Employee, EmployeeAdmin)
admin.site.register(MachineType)
admin.site.register(MachineJoinType)

admin.site.register(EventType)
admin.site.register(EventState)
admin.site.register(Event, EventAdmin)
admin.site.register(OrderDetails)
admin.site.register(PiecesRange)
admin.site.register(MaintenancePeriod)
admin.site.register(MaintenanceDetails)
admin.site.register(Priority)
admin.site.register(ReparationDetails)
admin.site.register(EventJoinOrder)
admin.site.register(EventJoinOrders)
admin.site.register(EventJoinEventState)

admin.site.register(StepState)
admin.site.register(MachineWorkflowStep)
admin.site.register(MachineWorkflowStepJoinMachine)

admin.site.register(ProductivityReportModel)
admin.site.register(OrdersResumeModel)
