from rest_framework import serializers
from .models import tblSensorData

class SensorDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = tblSensorData
        fields = '__all__'