from core.models import BranchOffice, Employee
from core.task.models import Event, EventState, EventType
from rest_framework.test import APITestCase
from rest_framework import status


class EventJoinStateTestSetUp(APITestCase):

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
            name= 'Sucursal 1',
            address= 'Alborada 3ra etapa',
            city= 'Daule'
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
            start_datetime= '2022-06-15 06:00:00',
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
            start_datetime= '2022-06-30 06:00:00',
            end_datetime='2022-06-30 18:00:00',
            branch_id=1,
            employee_id=1,
            state_id=1,
            type_id=1
        )
        response=self.client.get('/api/events/?year=2022&month=06&day=05&branch=1&period=0')
        responsedic=response.data
        valores=responsedic['data']
        for v in valores:
            for clave, valor in v.items():
                if clave == 'start_datetime':
                    print(clave + ": " + valor)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        return super().setUp()

    def test_run(self):
        pass