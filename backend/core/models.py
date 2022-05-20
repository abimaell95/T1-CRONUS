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

class Customer(models.Model):
    id = models.CharField(primary_key=True,max_length=10)
    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=15)
    email = models.CharField(max_length=50)

    def __str__(self):
        return self.id
