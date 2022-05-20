from django.db import models

class StrategyInterface:
    def details(self, data):
        pass

class Task(models.Model):
    id = models.BigAutoField(primary_key=True)
    description = models.CharField(max_length=300)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    duration = models.PositiveSmallIntegerField()
    state = models.ForeignKey('TaskState', related_name="state" ,on_delete=models.CASCADE)
    id_machine = models.ForeignKey("Machine", related_name="machine", on_delete=models.CASCADE)
    id_kind = models.ForeignKey("TaskKind", related_name="kind" , on_delete=models.CASCADE)

    def __str__(self):
        return self.description

class TaskKind(models.Model):
    id = models.BigAutoField(primary_key=True)
    label =  models.CharField(max_length=20)

    def __str__(self):
        return self.label

class TaskState(models.Model):
    id = models.BigAutoField(primary_key=True)
    label =  models.CharField(max_length=20)

    def __str__(self):
        return self.label

class TaskDetails(models.Model, StrategyInterface):
    id = models.BigAutoField(primary_key=True)
    invoice_num = models.CharField(max_length=30)
    espec_file_url = models.CharField(max_length=300)
    cuts = models.PositiveSmallIntegerField()
    type = models.ForeignKey('TaskType', on_delete=models.CASCADE)
    id_task = models.ForeignKey("Task", on_delete=models.CASCADE)
    id_client = models.ForeignKey("Customer", on_delete=models.CASCADE)
    id_employee = models.ForeignKey("Employee", on_delete=models.CASCADE)

    def __str__(self):
        return self.invoice_num

    def details(self, data, event_id):
        queryset = TaskDetails.objects.all()
        if event_id is not None:
            queryset = queryset.filter(id_task=event_id)
        return queryset + data

class TaskType(models.Model):
    id = models.BigAutoField(primary_key=True)
    label =  models.CharField(max_length=20)

    def __str__(self):
        return self.label

class MaintenancePeriod(models.Model):
    id = models.BigAutoField(primary_key=True)
    label =  models.CharField(max_length=20)

    def __str__(self):
        return self.label

class MaintenanceDetails(models.Model, StrategyInterface):
    id = models.BigAutoField(primary_key=True)
    repetitions = models.PositiveSmallIntegerField()
    frecuency = models.PositiveSmallIntegerField()
    period = models.ForeignKey("MaintenancePeriod", on_delete=models.CASCADE)
    id_task = models.ForeignKey("Task", on_delete=models.CASCADE)

    def __str__(self):
        return self.id

    def details(self, data, event_id):
        queryset = MaintenanceDetails.objects.all()
        if event_id is not None:
            queryset = queryset.filter(id_task=event_id)
        return queryset + data

class ReparationDetails(models.Model, StrategyInterface):
    id = models.BigAutoField(primary_key=True)
    reason = models.CharField(max_length=150)
    priority = models.ForeignKey("Priority", on_delete=models.CASCADE)
    id_task = models.ForeignKey("Task", on_delete=models.CASCADE)

    def __str__(self):
        return self.id
    
    def details(self, data, event_id):
        queryset = ReparationDetails.objects.all()
        if event_id is not None:
            queryset = queryset.filter(id_task=event_id)
        return queryset + data

class Priority(models.Model):
    id = models.BigAutoField(primary_key=True)
    label =  models.CharField(max_length=10)

    def __str__(self):
        return self.label

