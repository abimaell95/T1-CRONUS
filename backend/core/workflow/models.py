from django.db import models

class StepState(models.Model):
    id = models.BigAutoField(primary_key=True)
    label =  models.CharField(max_length=20)

    def __str__(self):
        return self.label

class MachineWorkflowStep(models.Model):
    id = models.BigAutoField(primary_key=True)
    step_order = models.SmallIntegerField()
    end_datetime = models.DateTimeField(null=True)
    state = models.ForeignKey('StepState' ,on_delete=models.CASCADE)
    machine = models.ForeignKey('Machine' ,on_delete=models.CASCADE)
    order = models.ForeignKey("OrderDetails", on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id)

class Workflow(models.Model):
    workflow_id = models.BigAutoField(primary_key=True)
    label =  models.CharField(max_length=20)

    def __str__(self):
        return self.label

class WorkflowSteps(models.Model):
    workflowsteps_id = models.BigAutoField(primary_key=True)
    step_order = models.SmallIntegerField()
    workflow = models.ForeignKey('Workflow' ,on_delete=models.CASCADE)
    machine = models.ForeignKey('Machine' ,on_delete=models.CASCADE)

    def __str__(self):
        return self.id

#JOIN TABLES MODELS
class WorkflowJoinWSteps(models.Model):
    workflow_id = models.IntegerField(primary_key=True)
    workflow_label = models.CharField(max_length=20)
    workflowstep_id = models.IntegerField()
    step_order = models.SmallIntegerField()
    machine = models.CharField(max_length=10)