import json
from rest_framework import status
from django.test import TestCase
import datetime
from core.models import Machine, MachineType,\
    MachineState, Employee, BranchOffice
from core.task.models import Event, OrderDetails, EventState, EventType
from core.workflow.models import MachineWorkflowStep, StepState


class EventJoinStateTestSetUp(TestCase):
    fechainicio = '2022-06-01T06:00:00Z'

    def setUp(self):
        self.employee = Employee.objects.create(
            id=1,
            name='Developer',
            surname='developer',
            address='Ciudad Celeste',
            email='developer@gmail.com',
            branch_id=1
        )
        self.event_state = EventState.objects.create(
            id=1,
            label='No iniciado'
        )
        self.branch_office = BranchOffice.objects.create(
            id=1,
            name='Sucursal 1',
            address='Alborada 3ra etapa',
            city='Daule'
        )
        self.event_type = EventType.objects.create(
            id=1,
            label='Corte'
        )
        self.event = Event.objects.create(
            id=1,
            description='tarea1',
            start_datetime='2022-06-01 06:00:00',
            end_datetime='2022-06-01 18:00:00',
            branch_id=1,
            employee_id=1,
            state_id=1,
            type_id=1
        )
        self.event = Event.objects.create(
            id=2,
            description='tarea2',
            start_datetime='2022-06-05 06:00:00',
            end_datetime='2022-06-05 18:00:00',
            branch_id=1,
            employee_id=1,
            state_id=1,
            type_id=1
        )
        self.event = Event.objects.create(
            id=3,
            description='tarea3',
            start_datetime='2022-06-10 06:00:00',
            end_datetime='2022-06-10 18:00:00',
            branch_id=1,
            employee_id=1,
            state_id=1,
            type_id=1
        )
        self.event = Event.objects.create(
            id=4,
            description='tarea4',
            start_datetime='2022-06-15 06:00:00',
            end_datetime='2022-06-15 18:00:00',
            branch_id=1,
            employee_id=1,
            state_id=1,
            type_id=1
        )
        self.event = Event.objects.create(
            id=5,
            description='tarea5',
            start_datetime='2022-06-20 06:00:00',
            end_datetime='2022-06-20 18:00:00',
            branch_id=1,
            employee_id=1,
            state_id=1,
            type_id=1
        )
        self.event = Event.objects.create(
            id=6,
            description='tarea5',
            start_datetime='2022-06-25 06:00:00',
            end_datetime='2022-06-25 18:00:00',
            branch_id=1,
            employee_id=1,
            state_id=1,
            type_id=1
        )
        self.event = Event.objects.create(
            id=7,
            description='tarea6',
            start_datetime='2022-06-30 06:00:00',
            end_datetime='2022-06-30 18:00:00',
            branch_id=1,
            employee_id=1,
            state_id=1,
            type_id=1
        )

    def test_ok(self):
        get_str = '/api/events/?year=2022&month=06&day=01&branch=01&period=0'
        response = self.client.get(get_str)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["data"][0]["start_datetime"], self.fechainicio)

    def test_not_ok(self):
        get_str = '/api/events/?year=2022&month=06&day=11&branch=01&period=1'
        response = self.client.get(get_str)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data["data"], [])


class OrderIdTest(TestCase):
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
            end_datetime="2022-01-01 09:00:00",
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
        response = self.client.get("/api/order/?id={}".format(self.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["data"][0]["id"], self.id)

    def test_notok(self):
        incorrect_id = 10
        response = self.client.get("/api/order/?id={}".format(incorrect_id))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["data"], [])


class AllOrderTest(TestCase):
    day = "01"
    month = "06"
    year = "2022"
    branch2 = 2
    branch1 = 1
    date = "{}-{}-{}".format(year, month, day)

    def setUp(self) -> None:
        StepState.objects.create(id=1, label="No Iniciado")
        MachineType.objects.create(id=1, label="Corte")
        MachineState.objects.create(id=1, label="Libre")
        EventState.objects.create(
            id=1,
            label='No iniciado'
        )
        EventType.objects.create(
            id=1,
            label='Orden'
        )
        BranchOffice.objects.create(
            id=1,
            name='Sucursal 1',
            address='Alborada 3ra etapa',
            city='Daule'
        )
        Employee.objects.create(
            id="0927643825",
            name='Developer',
            surname='developer',
            address='Ciudad Celeste',
            email='developer@gmail.com',
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
            description='tarea1',
            start_datetime='{}-{}-{} 06:00:00'.format(
                self.year, self.month, self.day),
            end_datetime='2022-06-01 18:00:00',
            branch_id=1,
            employee_id="0927643825",
            state_id=1,
            type_id=1
        )
        OrderDetails.objects.create(
            id=1,
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
            order_id=1,
            state_id=1
        )
        Event.objects.create(
            id=2,
            description='tarea2',
            start_datetime='{}-{}-05 06:00:00'.format(self.year, self.month),
            end_datetime='2022-06-05 18:00:00',
            branch_id=1,
            employee_id="0927643825",
            state_id=1,
            type_id=1
        )
        OrderDetails.objects.create(
            id=2,
            client_name="Carmen Pinto",
            invoice_num="10001-20",
            file_url="Archivo.jpg",
            num_pieces=100,
            current_step_id=1,
            event_id=2
        )
        MachineWorkflowStep.objects.create(
            id=2,
            step_order=1,
            end_datetime="2019-01-01 00:00:00",
            machine_id="123456",
            order_id=2,
            state_id=1
        )
        BranchOffice.objects.create(
            id=2,
            name='Sucursal 2',
            address='Alborada 3ra etapa',
            city='Daule'
        )
        Employee.objects.create(
            id="0927643835",
            name='Developer',
            surname='developer',
            address='Ciudad Celeste',
            email='developer@gmail.com',
            branch_id=self.branch2
        )
        Machine.objects.create(
            serial_number="123478",
            model="A50",
            brand="Samsung",
            purchase_date="2010-01-01",
            branch_id=self.branch2,
            employee_id="0927643835",
            state_id=1,
            type_id=1
        )
        Event.objects.create(
            id=4,
            description='tarea1',
            start_datetime='{}-{}-{} 06:00:00'.format(
                self.year, self.month, self.day),
            end_datetime='2022-06-01 18:00:00',
            branch_id=self.branch2,
            employee_id="0927643835",
            state_id=1,
            type_id=1
        )
        OrderDetails.objects.create(
            id=4,
            client_name="Carmen Pinto",
            invoice_num="10001-20",
            file_url="Archivo.jpg",
            num_pieces=100,
            current_step_id=1,
            event_id=4
        )
        MachineWorkflowStep.objects.create(
            id=4,
            step_order=1,
            end_datetime="2019-01-01 00:00:00",
            machine_id="123478",
            order_id=4,
            state_id=1
        )

    def test_branchok(self):
        get_str = '/api/orders/?year={}&month={}&day={}&branch={}'.format(
            self.year, self.month, self.day, self.branch2)
        response = self.client.get(get_str)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        branch = response.data["data"][0]["branch_id"]
        self.assertEqual(branch, self.branch2)

    def test_branch_notok(self):
        not_existing_branch = 5
        get_str = '/api/orders/?year={}&month={}&day={}&branch={}'.format(
            self.year, self.month, self.day, not_existing_branch)
        response = self.client.get(get_str)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data["data"], [])

    def test_weekly_ok(self):
        get_str = '/api/orders/?year={}&month={}&day={}'.format(
            self.year, self.month, self.day)
        response = self.client.get(get_str)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        low_date = datetime.datetime.strptime(
            '{}-{}-{} 00:00:00'.format(
                self.year, self.month, self.day
            ),
            '%Y-%m-%d %H:%M:%S'
        )
        up_date = datetime.datetime.strptime(
            '{}-{}-{} 23:59:59'.format(
                self.year, self.month, int(self.day) + 6
            ),
            '%Y-%m-%d %H:%M:%S'
        )
        d1 = response.data["data"][0]["start_datetime"]
        date_str = d1.replace("T", " ").replace("Z", "")
        order_date = datetime.datetime.strptime(
            date_str, '%Y-%m-%d %H:%M:%S'
        )
        condition = order_date > low_date and order_date < up_date
        self.assertEqual(condition, True)
        d2 = response.data["data"][1]["start_datetime"]
        date_str = d2.replace("T", " ").replace("Z", "")
        order_date = datetime.datetime.strptime(
            date_str, '%Y-%m-%d %H:%M:%S'
        )
        condition = order_date > low_date and order_date < up_date
        self.assertEqual(condition, True)

    def test_weekly_notok(self):
        incorrect_month = 12
        get_str = '/api/orders/?year={}&month={}&day={}'.format(
            self.year, incorrect_month, self.day)
        response = self.client.get(get_str)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data["data"], [])

    def test_orderPost(self):
        data = {'description': 'ewew',
                'start_date': '2022-06-17',
                'end_date': '2022-06-17',
                'start_time': 7,
                'end_time': 8,
                'type': 1,
                'client_name': 'h',
                'invoice_num': 'fg',
                'pieces_number': 0,
                'plan_file': 'null',
                'workflow': 1}
        response = self.client.post('/api/order/',
                                    json.dumps(data),
                                    content_type="application/json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        data = response.data.get('data')
        event = data.get('event')
        order = data.get('order')

        c_event = Event.objects.get(id=event.get('id'))
        self.assertEqual(str(c_event), event.get('description'))
        c_order = OrderDetails.objects.get(id=order.get('id'))
        self.assertEqual(str(c_order), str(order.get('id')))

    def test_availableHours(self):
        get_str = '/api/available_hours/?branch={}&date={}'.format(
            self.branch1, self.date)
        response = self.client.get(get_str)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
