from rest_framework.serializers import ModelSerializer
from .models import Machine
from rest_framework import routers, serializers, viewsets
from django.contrib.auth.models import User

class MachineSerializer(ModelSerializer):
    class Meta:
        model = Machine
        fields = (
            'serial_number', 'model', 'brand', 'purchase_date', 'created_date', 'state',
            'branch'
        )

# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff']

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        user.set_password(validated_data['password'])
        user.save()
