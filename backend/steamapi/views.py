from rest_framework import viewsets
from .models import tblSensorData
from .serializers import SensorDataSerializer

class SensorDataViewSet( viewsets.ReadOnlyModelViewSet):
    """
    Read only. Adding/Removing data is performed by scripts, not DRF.
    """
    queryset = tblSensorData.objects.all().order_by('-recorded_at')
    serializer_class = SensorDataSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        device_id = self.request.query_params.get('device_id')
        if device_id:
            queryset = queryset.filter( device_id=device_id )
        return queryset