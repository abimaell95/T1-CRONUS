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
    event_id = models.BigAutoField(primary_key=True)
    description = models.CharField(max_length=300)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    duration = models.PositiveSmallIntegerField()
    state = models.ForeignKey('EventState' ,on_delete=models.CASCADE)
    branch = models.ForeignKey("BranchOffice", on_delete=models.CASCADE)
    type = models.ForeignKey("EventType", on_delete=models.CASCADE)

    def __str__(self):
        return self.description

class OrderDetails(models.Model):
    order_id = models.BigAutoField(primary_key=True)
    client_name = models.CharField(max_length=60)
    invoice_num = models.CharField(max_length=30)
    espec_file_url = models.CharField(max_length=300)
    num_pieces = models.PositiveSmallIntegerField()
    event = models.ForeignKey("Event", on_delete=models.CASCADE)

    def __str__(self):
        return self.order_id

class MaintenancePeriod(models.Model):
    id = models.BigAutoField(primary_key=True)
    label =  models.CharField(max_length=20)

    def __str__(self):
        return self.label

class MaintenanceDetails(models.Model):
    maintenance_id = models.BigAutoField(primary_key=True)
    repetitions = models.PositiveSmallIntegerField()
    frecuency = models.PositiveSmallIntegerField()
    period = models.ForeignKey("MaintenancePeriod", on_delete=models.CASCADE)
    event = models.ForeignKey("Event", on_delete=models.CASCADE)

    def __str__(self):
        return self.maintenance_id

class Priority(models.Model):
    id = models.BigAutoField(primary_key=True)
    label =  models.CharField(max_length=10)

    def __str__(self):
        return self.label

class ReparationDetails(models.Model):
    reparation_id = models.BigAutoField(primary_key=True)
    reason = models.CharField(max_length=150)
    priority = models.ForeignKey("Priority", on_delete=models.CASCADE)
    event = models.ForeignKey("Event", on_delete=models.CASCADE)

    def __str__(self):
        return self.reparation_id

#JOIN TABLES MODELS
class EventJoinOrder(models.Model):
    event_id = models.IntegerField(primary_key=True)
    order_id = models.IntegerField()
    description = models.CharField(max_length=300)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    duration = models.PositiveSmallIntegerField()
    state = models.IntegerField()
    branch = models.IntegerField()
    type = models.IntegerField()
    client_name = models.CharField(max_length=60)
    invoice_num = models.CharField(max_length=30)
    espec_file_url = models.CharField(max_length=300)
    num_pieces = models.PositiveSmallIntegerField()

class EventJoinReparation(models.Model):
    event_id = models.IntegerField(primary_key=True)
    reparation_id = models.IntegerField()
    description = models.CharField(max_length=300)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    duration = models.PositiveSmallIntegerField()
    state = models.IntegerField()
    branch = models.IntegerField()
    type = models.IntegerField()
    reason = models.CharField(max_length=150)
    priority = models.IntegerField()

class EventJoinMaintenance(models.Model):
    event_id = models.IntegerField(primary_key=True)
    maintenance_id = models.IntegerField()
    description = models.CharField(max_length=300)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    duration = models.PositiveSmallIntegerField()
    state = models.IntegerField()
    branch = models.IntegerField()
    type = models.IntegerField()
    repetitions = models.PositiveSmallIntegerField()
    frecuency = models.PositiveSmallIntegerField()
    period = models.IntegerField()