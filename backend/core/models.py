from datetime import date
from django.db import models

class MachineState(models.Model):
    id = models.BigAutoField(primary_key=True)
    label =  models.CharField(max_length=20)

    def __str__(self):
        return self.label

class BranchOffice(models.Model):
    id_branch = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=20)
    address = models.CharField(max_length=30)
    city = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Machine(models.Model):
    serial_number = models.CharField(primary_key=True,max_length=10)
    model = models.CharField(max_length=20)
    brand = models.CharField(max_length=20)
    purchase_date = models.DateField()
    created_date = models.DateField(default=date.today)
    state = models.ForeignKey('MachineState', on_delete=models.CASCADE)
    branch = models.ForeignKey("BranchOffice", on_delete=models.CASCADE)

    def __str__(self):
        return self.serial_number

class Employee(models.Model):
    id_number = models.CharField(primary_key=True,max_length=10)
    name = models.CharField(max_length=15)
    lastname = models.CharField(max_length=15)
    address = models.CharField(max_length=30)
    email = models.CharField(max_length=30)
    branch = models.ForeignKey("BranchOffice", on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name} {self.lastname} : {self.id_number}'

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
    state = models.ForeignKey('TaskState', on_delete=models.CASCADE)
    id_machine = models.ForeignKey("Machine")

    def __str__(self):
        return self.description

class TaskType(models.Model):
    id = models.BigAutoField(primary_key=True)
    label =  models.CharField(max_length=20)

    def __str__(self):
        return self.label

class Customer(models.Model):
    id = models.CharField(primary_key=True,max_length=10)
    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=15)
    email = models.CharField(max_length=50)

    def __str__(self):
        return self.id

class TaskDetails(models.Model):
    id = models.BigAutoField(primary_key=True)
    invoice_num = models.CharField(max_length=30)
    espec_file_url = models.CharField(max_length=300)
    cuts = models.PositiveSmallIntegerField()
    type = models.ForeignKey('TaskType')
    id_task = models.ForeignKey("Task")
    id_client = models.ForeignKey("Customer")
    id_employee = models.ForeignKey("Employee")

    def __str__(self):
        return self.invoice_num

class MaintenancePeriod(models.Model):
    id = models.BigAutoField(primary_key=True)
    label =  models.CharField(max_length=20)

    def __str__(self):
        return self.label

class MaintenanceDetails(models.Model):
    id = models.BigAutoField(primary_key=True)
    repetitions = models.PositiveSmallIntegerField()
    frecuency = models.PositiveSmallIntegerField()
    period = models.ForeignKey("MaintenancePeriod")
    id_task = models.ForeignKey("Task")

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
    priority = models.ForeignKey("Priority")
    id_task = models.ForeignKey("Task")

    def __str__(self):
        return self.id

