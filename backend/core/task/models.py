from django.db import models

class EventType(models.Model):
    id = models.BigAutoField(primary_key=True)
    label =  models.CharField(max_length=20)

    def __str__(self):
        return self.label

class EventState(models.Model):
    id = models.BigAutoField(primary_key=True)
    label =  models.CharField(max_length=20)

    def __str__(self):
        return self.label

class Event(models.Model):
    id = models.BigAutoField(primary_key=True)
    description = models.CharField(max_length=300)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    employee = models.ForeignKey('Employee' ,on_delete=models.CASCADE)
    state = models.ForeignKey('EventState' ,on_delete=models.CASCADE)
    branch = models.ForeignKey("BranchOffice", on_delete=models.CASCADE)
    type = models.ForeignKey('EventType' ,on_delete=models.CASCADE)

    def __str__(self):
        return self.description

class OrderDetails(models.Model):
    id = models.BigAutoField(primary_key=True)
    client_name = models.CharField(max_length=60)
    invoice_num = models.CharField(max_length=30)
    file_url = models.CharField(max_length=300,null=True)
    num_pieces = models.PositiveSmallIntegerField()
    current_step = models.ForeignKey("MachineWorkflowStep", on_delete=models.CASCADE)
    event = models.ForeignKey("Event", on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id)

class MaintenancePeriod(models.Model):
    id = models.BigAutoField(primary_key=True)
    label =  models.CharField(max_length=20)

    def __str__(self):
        return self.label

class MaintenanceDetails(models.Model):
    id = models.BigAutoField(primary_key=True)
    repetitions = models.PositiveSmallIntegerField()
    frecuency = models.PositiveSmallIntegerField()
    period = models.ForeignKey("MaintenancePeriod", on_delete=models.CASCADE)
    event = models.ForeignKey("Event", on_delete=models.CASCADE)

    def __str__(self):
        return self.id

class Priority(models.Model):
    id = models.BigAutoField(primary_key=True)
    label =  models.CharField(max_length=10)

    def __str__(self):
        return self.label

class ReparationDetails(models.Model):
    id = models.BigAutoField(primary_key=True)
    reason = models.CharField(max_length=150)
    priority = models.ForeignKey("Priority", on_delete=models.CASCADE)
    event = models.ForeignKey("Event", on_delete=models.CASCADE)

    def __str__(self):
        return self.id

#JOIN TABLES MODELS
class EventJoinOrder(models.Model):
    id = models.IntegerField(primary_key=True)
    state = models.IntegerField()
    label = models.CharField(max_length=20)
    description = models.CharField(max_length=300, default="Descripcion")
    num_pieces = models.PositiveSmallIntegerField(default=10)
    name = models.CharField(max_length=15, default='name')
    surname = models.CharField(max_length=15, default='surname')
    end_datetime = models.DateTimeField()
    client_name = models.CharField(max_length=60, default="Cliente")
    invoice_num = models.CharField(max_length=30, default="0001")
    file_url = models.CharField(max_length=300, default="archivo")

class EventJoinOrders(models.Model):
    id = models.IntegerField(primary_key=True)
    invoice_num = models.CharField(max_length=30)
    client_name = models.CharField(max_length=60)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    state = models.IntegerField()
    state_label = models.CharField(max_length=20)
    name = models.CharField(max_length=15, default='name')
    surname = models.CharField(max_length=15, default='surname')
    type_label = models.CharField(max_length=20)

class EventJoinEventState(models.Model):
    id = models.IntegerField(primary_key=True)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    state_id = models.IntegerField()
    label =  models.CharField(max_length=20)
