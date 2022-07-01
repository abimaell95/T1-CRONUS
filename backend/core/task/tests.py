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
        response=self.client.get('/api/events/?year=2022&month=06&day=01&branch=1&period=0')
        responsedic = response.data
        for v in responsedic:
            for clave, valor in v.items():
                if clave == 'start_datetime':
                    print(clave + ": " + valor)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        return super().setUp()

    def test_weekly(self):
        get_str = '/api/orders/?year={}&month={}&day={}'.format(
            self.year, self.month, self.day)
        response = self.client.get(get_str)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for i in response.data["data"]:
            for k, v in i.items():
                if k == 'start_datetime':
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
                    date_str = v.replace("T", " ").replace("Z", "")
                    order_date = datetime.datetime.strptime(
                        date_str, '%Y-%m-%d %H:%M:%S'
                    )
                    condition = order_date > low_date and order_date < up_date
                    self.assertEqual(condition, True)

                    
    def test_orderPost(self):
        data = {"description": "ewew",
                "start_date": "2022-06-17",
                "end_date": "2022-06-17",
                "start_time": 7,
                "end_time": 8,
                "type": 1,
                "client_name": "h",
                "invoice_num": "fg",
                "pieces_number": 0,
                "plan_file": "null",
                "workflow":1}
        response = self.client.post('/api/order/',data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_availableHours(self):
        get_str = '/api/orders/?branch={}&date={}'.format(
            self.branch, self.date)
        response = self.client.get(get_str)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
