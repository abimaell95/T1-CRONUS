from rest_framework import status
from django.test import TestCase
from core.models import Machine, MachineType,\
    MachineState, Employee, BranchOffice
from core.task.models import Event, OrderDetails, EventState, EventType
from core.workflow.models import MachineWorkflowStep, StepState


class WorkflowIdTest(TestCase):
    id = 1

    def setUp(self) -> None:
        StepState.objects.create(id=1, label="No Iniciado")
        EventState.objects.create(id=1, label="No Iniciado")
        EventType.objects.create(id=1, label="Orden")
        MachineType.objects.create(id=1, label="Corte")
        MachineState.objects.create(id=1, label="Libre")
        BranchOffice.objects.create(
            id=1,
            name="First Office",
            address="Av. Victor Emilio Estrada",
            city="Guayaquil"
        )
        Employee.objects.create(
            id="0927643825",
            name="Nicole",
            surname="Agila",
            address="Guayacanes",
            email="nicole@hotmail.com",
            branch_id=1
        )
        Machine.objects.create(
            serial_number="123456",
            model="A50",
            brand="Samsung",
            purchase_date="2010-01-01",
            branch_id=1,
            employee_id="0927643825",
            state_id=1,
            type_id=1
        )
        Event.objects.create(
            id=1,
            description="Pedido de prueba",
            start_datetime="2022-01-01 09:00:00",
            end_datetime="2022-01-01 10:00:00",
            branch_id=1,
            employee_id="0927643825",
            state_id=1,
            type_id=1
        )
        OrderDetails.objects.create(
            id=self.id,
            client_name="Carmen Pinto",
            invoice_num="10001-20",
            file_url="Archivo.jpg",
            num_pieces=100,
            current_step_id=1,
            event_id=1
        )
        MachineWorkflowStep.objects.create(
            id=1,
            step_order=1,
            end_datetime="2019-01-01 00:00:00",
            machine_id="123456",
            order_id=self.id,
            state_id=1
        )

    def test_ok(self):
        response = self.client.get("/api/workflow/?id={}".format(self.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["data"][0]["order_id"], self.id)

    def test_notok(self):
        incorrect_id = 2
        response = self.client.get("/api/workflow/?id={}".format(incorrect_id))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["data"], [])
