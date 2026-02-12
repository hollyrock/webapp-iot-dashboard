<script setup lang="ts">
import { useSensorStore } from '../stores/sensor'
const sensorStore = useSensorStore()

const options = [
    { label: 'ALL', value: 'all' },
    { label: 'TODAY', value: 'today' },
    { label: 'LAST 3h', value: 'last3h' },
]
</script>

<template>
    <v-card border flat class="pa-2 mb-4 d-flex align-center">
        <span class="text-subtitle-2 mr-4">Period:</span>
        <v-btn-toggle
            v-model="sensorStore.filterRange"
            color="teal-darken-3"
            density="compact"
            mandatory
        >
        <v-btn v-for="opt in options" :key="opt.value" :value="opt.value">
            {{ opt.label }}
        </v-btn>
        </v-btn-toggle>

        <v-spacer></v-spacer>

        <span class="text-caption text-grey">
            Records: {{ sensorStore.filteredData.length }} count
        </span>
    </v-card>
</template>