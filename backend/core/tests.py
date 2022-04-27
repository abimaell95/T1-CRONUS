from django.test import TestCase
from backend.core.models import Employee, Task, TaskState, TaskType, Machine, MachineState, BranchOffice
import datetime

# Create your tests here.
class MachineModelTest(TestCase):
    def setUp(self):
        s = MachineState.objects.create(label="Free")
        b = BranchOffice.objects.create(name="First Office",address="Av. Victor Emilio Estrada",city="Guayaquil")
        Machine.objects.create(serial_number="0950562199",model="A50",brand="Samsung",purchase_date=datetime.datetime.now(),state=s,branch=b)
    
    def test_machine_can_be_created(self):
        """Machine creation succeeds test"""
        m = Machine.objects.get(serial_number="0950562199")
        self.assertEqual(m.serial_number,"0950562199")

class TaskModelTest(TestCase):
    def setUp(self):
        b = BranchOffice.objects.create(name="First Office",address="Av. Victor Emilio Estrada",city="Guayaquil")
        e = Employee.objects.create(id_number="0952796159",name="Sebastian",lastname="Benalcazar",address="Av. Victor Emilio Estrada",email="sbenalca@espol.edu.ec",branch=b)
        ms = MachineState.objects.create(label="Free")
        m = Machine.objects.create(serial_number="0950562199",model="A50",brand="Samsung",purchase_date=datetime.datetime.now(),state=ms,branch=b)
        ts = TaskState.objects.create(label="estado")
        tt = TaskType.objects.create(label="Corte")
        t = Task.objects.create(description="Esto es un corte", start_datetime=datetime.datetime.now(), end_datetime = datetime.datetime.now(), duration = 60, state=ts, id_machine=m)
