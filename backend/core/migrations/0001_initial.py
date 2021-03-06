# Generated by Django 4.0.5 on 2022-07-02 21:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BranchOffice',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=20)),
                ('address', models.CharField(max_length=30)),
                ('city', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=15)),
                ('surname', models.CharField(max_length=15)),
                ('address', models.CharField(max_length=30)),
                ('email', models.CharField(max_length=30)),
                ('branch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.branchoffice')),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('description', models.CharField(max_length=300)),
                ('start_datetime', models.DateTimeField()),
                ('end_datetime', models.DateTimeField()),
                ('branch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.branchoffice')),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.employee')),
            ],
        ),
        migrations.CreateModel(
            name='EventJoinEventState',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('start_datetime', models.DateTimeField()),
                ('end_datetime', models.DateTimeField()),
                ('state_id', models.IntegerField()),
                ('label', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='EventJoinOrder',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('state', models.IntegerField()),
                ('label', models.CharField(max_length=20)),
                ('description', models.CharField(default='Descripcion', max_length=300)),
                ('num_pieces', models.PositiveSmallIntegerField(default=10)),
                ('name', models.CharField(default='name', max_length=15)),
                ('surname', models.CharField(default='surname', max_length=15)),
                ('end_datetime', models.DateTimeField()),
                ('client_name', models.CharField(default='Cliente', max_length=60)),
                ('invoice_num', models.CharField(default='0001', max_length=30)),
                ('file_url', models.CharField(default='archivo', max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='EventJoinOrders',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('invoice_num', models.CharField(max_length=30)),
                ('client_name', models.CharField(max_length=60)),
                ('start_datetime', models.DateTimeField()),
                ('end_datetime', models.DateTimeField()),
                ('state', models.IntegerField()),
                ('state_label', models.CharField(max_length=20)),
                ('name', models.CharField(default='name', max_length=15)),
                ('surname', models.CharField(default='surname', max_length=15)),
                ('branch_id', models.IntegerField()),
                ('type_label', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='EventState',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('label', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='EventType',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('label', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Machine',
            fields=[
                ('serial_number', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('model', models.CharField(max_length=20)),
                ('brand', models.CharField(max_length=20)),
                ('purchase_date', models.DateField()),
                ('branch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.branchoffice')),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.employee')),
            ],
        ),
        migrations.CreateModel(
            name='MachineState',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('label', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='MachineType',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('label', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='MachineWorkflowStep',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('step_order', models.SmallIntegerField()),
                ('end_datetime', models.DateTimeField(null=True)),
                ('machine', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.machine')),
            ],
        ),
        migrations.CreateModel(
            name='MachineWorkflowStepJoinMachine',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('order_id', models.IntegerField()),
                ('step_order', models.IntegerField()),
                ('end_datetime', models.DateTimeField()),
                ('state_id', models.IntegerField()),
                ('step_activity', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='MaintenancePeriod',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('label', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Priority',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('label', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='StepState',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('label', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Workflow',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('label', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='WorkflowJoinWSteps',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('label', models.CharField(max_length=20)),
                ('step_id', models.IntegerField()),
                ('step_order', models.SmallIntegerField()),
                ('type_label', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='WorkflowSteps',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('step_order', models.SmallIntegerField()),
                ('machine', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.machine')),
                ('workflow', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.workflow')),
            ],
        ),
        migrations.CreateModel(
            name='ReparationDetails',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('reason', models.CharField(max_length=150)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.event')),
                ('priority', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.priority')),
            ],
        ),
        migrations.CreateModel(
            name='OrderDetails',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('client_name', models.CharField(max_length=60)),
                ('invoice_num', models.CharField(max_length=30)),
                ('file_url', models.CharField(max_length=300, null=True)),
                ('num_pieces', models.PositiveSmallIntegerField()),
                ('current_step', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.machineworkflowstep')),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.event')),
            ],
        ),
        migrations.CreateModel(
            name='MaintenanceDetails',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('repetitions', models.PositiveSmallIntegerField()),
                ('frecuency', models.PositiveSmallIntegerField()),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.event')),
                ('period', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.maintenanceperiod')),
            ],
        ),
        migrations.AddField(
            model_name='machineworkflowstep',
            name='order',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.orderdetails'),
        ),
        migrations.AddField(
            model_name='machineworkflowstep',
            name='state',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.stepstate'),
        ),
        migrations.AddField(
            model_name='machine',
            name='state',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.machinestate'),
        ),
        migrations.AddField(
            model_name='machine',
            name='type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.machinetype'),
        ),
        migrations.AddField(
            model_name='event',
            name='state',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.eventstate'),
        ),
        migrations.AddField(
            model_name='event',
            name='type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.eventtype'),
        ),
    ]
