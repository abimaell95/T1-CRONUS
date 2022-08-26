# Generated by Django 3.2.13 on 2022-08-26 16:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_machineordersmodel'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='productivityreportmodel',
            name='step_label',
        ),
        migrations.AddField(
            model_name='ordersresumemodel',
            name='name',
            field=models.CharField(default='default', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='productivityreportmodel',
            name='state_id',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='productivityreportmodel',
            name='state_label',
            field=models.CharField(default='default', max_length=20),
        ),
        migrations.AlterField(
            model_name='productivityreportmodel',
            name='invoice_num',
            field=models.CharField(max_length=20, primary_key=True, serialize=False),
        ),
    ]