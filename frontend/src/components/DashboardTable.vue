<script setup lang="ts">
import { useSensorStore } from '../stores/sensor';

const sensorStore = useSensorStore()

const headers = [
    { title: 'Time', key: 'recorded_at', sortable: true },
    { title: 'Device', key: 'device_id'},
    { title: 'Temp.(C)', key: 'temperature_c', align: 'end' as const },
    { title: 'Hum.(%)', key: 'humidity_pct', align: 'end' as const },
    { title: 'Press.(hPa)', key: 'pressure_hpa', align: 'end' as const },
    { title: 'Lux(lx)', key: 'lux_lx', align: 'end' as const },
    { title: 'Wtr Level(mm)', key: 'water_distance_mm', align: 'end' as const },
    { title: 'RSSI', key: 'rssi', align: 'center' as const },
]

const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('ja-JP')
}
</script>

<template>
    <v-card border flat>
        <v-data-table
            :headers="headers"
            :items="sensorStore.filteredData"
            :loading="sensorStore.loading"
            density="compact"
            no-data-text="No data."
            loading-text="Now loading data..."
            hover
        >
            <template #[`item.recorded_at`]="{item}"">
                {{ formatDate(item.recorded_at) }}
            </template>

            <template #[`item.water_distance_mm`]="{ item }">
                <v-chip
                    v-if="item.water_distance_mm !== null && item.water_distance_mm !== undefined"
                    :color="item.water_distance_mm < 500 ? 'red' : 'teal'"
                    size="small"
                    label
                >
                    {{ item.water_distance_mm }}
                </v-chip>
                <span v-else>-</span>
            </template>
        </v-data-table>
    </v-card>
</template>