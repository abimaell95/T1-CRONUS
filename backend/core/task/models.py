from datetime import date
from pyexpat import model
from django.db import models

#Create your models Here
class TaskState(models.Model):
    id = models.BigAutoField(primary_key=True)
    label =  models.CharField(max_length=20)

    def __str__(self):
        return self.label

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

class TaskType(models.Model):
    id = models.BigAutoField(primary_key=True)
    label =  models.CharField(max_length=20)

    def __str__(self):
        return self.label
