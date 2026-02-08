from django.db import models

class tblSensorData(models.Model):

    device_id = models.CharField( max_length=50, db_index=True, verbose_name="Device ID" )
    recorded_at = models.DateTimeField( db_index=True, verbose_name="Time Measured" )
    rssi = models.SmallIntegerField( null=True, blank=True, verbose_name="RSSI")
    snr = models.DecimalField(max_digits=4, decimal_places=1, null=True, blank=True, verbose_name="SNR")
    created_at = models.DateTimeField( auto_now_add=True, verbose_name="Time Created in DB" )

    latitude = models.DecimalField(max_digits=10, decimal_places=7, null=True, blank=True)
    longitude = models.DecimalField(max_digits=10, decimal_places=7, null=True, blank=True)
    altitude_m = models.SmallIntegerField(null=True, blank=True, verbose_name="Altitude")

    temperature_c = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, verbose_name="Temp(C)")
    humidity_pct = models.PositiveSmallIntegerField(null=True, blank=True, verbose_name="Humidity(%)")
    pressure_hpa = models.PositiveSmallIntegerField(null=True, blank=True, verbose_name="Pressure(hPa)")
    lux_lx = models.PositiveIntegerField(null=True, blank=True, verbose_name="Lux(lx)")
    water_distance_mm = models.PositiveIntegerField(null=True, blank=True, verbose_name="WaterLevel(mm)")

    raw_json = models.JSONField(null=True, blank=True, verbose_name="Raw data")

    class Meta:
        verbose_name = "Sensor Data"
        verbose_name_plural = "Sensor Data List"
        ordering = ['-recorded_at']

    def __str__(self):
        return f"{self.device_id} - {self.recorded_at}"

