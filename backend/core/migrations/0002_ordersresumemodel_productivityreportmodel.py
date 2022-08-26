# Generated by Django 3.2.13 on 2022-08-21 19:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrdersResumeModel',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('state_id', models.IntegerField()),
                ('branch_id', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='ProductivityReportModel',
            fields=[
                ('invoice_num', models.IntegerField(primary_key=True, serialize=False)),
                ('range', models.CharField(max_length=10)),
                ('type_id', models.IntegerField()),
                ('type_label', models.CharField(max_length=20)),
                ('schedule_date', models.DateTimeField()),
                ('end_datetime', models.DateTimeField()),
                ('step_start', models.DateTimeField()),
                ('step_end', models.DateTimeField()),
                ('step_label', models.CharField(max_length=20)),
                ('branch_id', models.IntegerField()),
            ],
        ),
    ]
