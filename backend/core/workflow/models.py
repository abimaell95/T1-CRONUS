from django.db import models


class StepState(models.Model):
    id = models.BigAutoField(primary_key=True)
    label = models.CharField(max_length=20)

    def __str__(self):
        return self.label


class MachineWorkflowStep(models.Model):
    id = models.BigAutoField(primary_key=True)
    start_datetime = models.DateTimeField(null=True)
    end_datetime = models.DateTimeField(null=True)
    state = models.ForeignKey('StepState', on_delete=models.CASCADE)
    machine = models.ForeignKey('Machine', on_delete=models.CASCADE)
    order = models.ForeignKey("OrderDetails", on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id)

## JOIN TABLES MODELS
class MachineWorkflowStepJoinMachine(models.Model):
    id = models.IntegerField(primary_key=True)
    order_id = models.IntegerField()
    step_order = models.IntegerField()
    end_datetime = models.DateTimeField()
    state_id = models.IntegerField()
    step_activity = models.CharField(max_length=20)

