export interface SensorData {
    id: number;
    device_id: string;
    recorded_at: string;
    rssi: number | null;
    snr: number | null;
    latisude: string | null;
    longitude: string | null;
    altitude_m: string | null;

    temperature_c: string | null;
    humidity_pct: number | null;
    pressure_hpa: number | null;
    lux_lx: number | null;
    water_distance_mm: number | null;
    raw_json: string | null;
}
