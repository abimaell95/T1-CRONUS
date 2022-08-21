from django.db import models


# JOIN TABLES MODELS
class ProductivityReportModel(models.Model):
    invoice_num = models.IntegerField(primary_key=True)
    range = models.CharField(max_length=10)
    type_id = models.IntegerField()
    type_label = models.CharField(max_length=20)
    schedule_date = models.DateTimeField()
    end_datetime = models.DateTimeField()
    step_start = models.DateTimeField()
    step_end = models.DateTimeField()
    step_label = models.CharField(max_length=20)
    branch_id = models.IntegerField()


class OrdersResumeModel(models.Model):
    id = models.IntegerField(primary_key=True)
    state_id = models.IntegerField()
    branch_id = models.IntegerField()
