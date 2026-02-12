<script setup lang="ts">

import { onMounted } from 'vue'
import { useSensorStore } from './stores/sensor'

import SensorChart from './components/SensorChart.vue';
import DashboardTable from './components/DashboardTable.vue';

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
                        <SensorChart />
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
