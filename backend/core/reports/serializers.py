from rest_framework.serializers import ModelSerializer
from .models import OrdersResumeModel, ProductivityReportModel


# JOIN TABLES SERIALIZER
class ProductivityReportSerializer(ModelSerializer):
    class Meta:
        model = ProductivityReportModel
        fields = "__all__"

class OrdersResumeSerializer(ModelSerializer):
    class Meta:
        model = OrdersResumeModel
        fields = "__all__"
