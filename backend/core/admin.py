from django.contrib import admin
from .models import Machine
from .task.models import Task, TaskType, MaintenancePeriod

admin.site.register(Machine)
admin.site.register(Task)
admin.site.register(TaskType)
admin.site.register(MaintenancePeriod)