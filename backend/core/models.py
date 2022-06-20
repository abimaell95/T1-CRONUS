from django.db import models

class MachineState(models.Model):
    id = models.BigAutoField(primary_key=True)
    label =  models.CharField(max_length=20)

    def __str__(self):
        return self.label

class BranchOffice(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=20)
    address = models.CharField(max_length=30)
    city = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Employee(models.Model):
    id = models.CharField(primary_key=True,max_length=10)
    name = models.CharField(max_length=15)
    surname = models.CharField(max_length=15)
    address = models.CharField(max_length=30)
    email = models.CharField(max_length=30)
    branch = models.ForeignKey("BranchOffice", on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name} {self.surname} : {self.employee_id}'

class MachineType(models.Model):
    id = models.BigAutoField(primary_key=True)
    label =  models.CharField(max_length=20)

    def __str__(self):
        return self.label

class Machine(models.Model):
    serial_number = models.CharField(primary_key=True,max_length=10)
    model = models.CharField(max_length=20)
    brand = models.CharField(max_length=20)
    purchase_date = models.DateField()
    type = models.ForeignKey('MachineType', on_delete=models.CASCADE)
    state = models.ForeignKey('MachineState', on_delete=models.CASCADE)
    branch = models.ForeignKey("BranchOffice", on_delete=models.CASCADE)
    employee = models.ForeignKey("Employee", on_delete=models.CASCADE)

    def __str__(self):
        return self.serial_number

