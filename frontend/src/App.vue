<script setup lang="ts">

import { onMounted } from 'vue'
import { useSensorStore } from './stores/sensor'

import SensorChart from './components/SensorChart.vue'
import DashboardTable from './components/DashboardTable.vue'
import FilterControl from './components/FilterControl.vue'

const sensorStore = useSensorStore()

onMounted(() => {
    sensorStore.fetchSensors()
})

</script>

<template>
    <v-app>
        <v-app-bar color="teal-darken-3">
            <v-app-bar-title>IoT Monitoring Dashboard</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn icon="mdi-refresh" @click="sensorStore.fetchSensors" :loading="sensorStore.loading"></v-btn>
        </v-app-bar>

        <v-main class="gb-grey-lighten-4">
            <v-container fluid>
                <v-row>
                    <v-col cols="12">
                        <FilterControl />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <SensorChart
                            title="Water Level"
                            :metrics="[{
                                key: 'water_distance_mm',
                                label: 'Water Level',
                                color: '#00968B',
                                unit: 'mm'
                            }]"
                        />
                    </v-col>
                    <v-col cols="12" md="6">
                        <SensorChart
                            title="Temp./Hum."
                            yAxisRight
                            :metrics="[
                                {
                                    key: 'temperature_c',
                                    label: 'Temperature',
                                    color: '#FF7043',
                                    unit: 'C'
                                },
                                {
                                    key: 'humidity_pct',
                                    label: 'Humidity',
                                    color: '#29B6F6',
                                    unit: '%'
                                },
                            ]"
                        />
                    </v-col>
                    <v-col cols="12" md="6">
                        <SensorChart
                            title="Pressure/Lux"
                            yAxisRight
                            :metrics="[
                                {
                                    key: 'pressure_hpa',
                                    label: 'Pressure',
                                    color: '#7E57C2',
                                    unit: 'hPa'
                                },
                                {
                                    key: 'lux_lx',
                                    label: 'Lux',
                                    color: '#FBC02D',
                                    unit: 'lx'
                                },
                            ]"
                        />
                    </v-col>
                    <v-col>
                        <DashboardTable />
                    </v-col>
                </v-row>
            </v-container>
        </v-main>

    </v-app>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
