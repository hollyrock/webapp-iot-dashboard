from django.contrib import admin
from .models import tblSensorData

@admin.register(tblSensorData)

class SensorDataAdmin(admin.ModelAdmin):
    list_display = ('recorded_at', 'device_id', 'water_distance_mm', 'temperature_c', 'rssi', 'snr')
    list_filter = ('device_id', 'recorded_at',)
    search_fields = ('device_id',)
    ordering = ('-recorded_at',)