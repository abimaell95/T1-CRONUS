from django.test import TestCase
from backend.core.models import Machine, MachineState, BranchOffice
import datetime


class MachineModelTest(TestCase):
    def setUp(self):
        s = MachineState.objects.create(label="Free")
        b = BranchOffice.objects.create(
            name="First Office", address="Av. Victor Emilio Estrada",
            city="Guayaquil"
        )
        Machine.objects.create(
            serial_number="0950562199",
            model="A50",
            brand="Samsung",
            purchase_date=datetime.datetime.now(),
            state=s,
            branch=b,
        )

    def test_machine_can_be_created(self):
        """Machine creation succeeds test"""
        m = Machine.objects.get(serial_number="0950562199")
        self.assertEqual(m.serial_number, "0950562199")
