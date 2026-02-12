<script setup lang="ts">

import { useSensorStore } from '../stores/sensor'
import type { SensorData } from '../types/sensor';
import { computed } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
    GridComponent,
    TooltipComponent,
    TitleComponent,
    DataZoomComponent,
    VisualMapComponent,
} from 'echarts/components';

use([
    CanvasRenderer,
    LineChart,
    GridComponent,
    TooltipComponent,
    TitleComponent,
    DataZoomComponent,
]);

const sensorStore = useSensorStore()

const chartOption = computed(() => {

    const data = sensorStore.sortedData

    return{
        title: { text: 'Water Level(mm)', left: 'center' },
        tooltip: {
            trigger: 'axis',
            formatter: (params: any) => {
                const p = params[0];
                return `${p.name}<br/>Water Level: <strong>${p.value}</strong> mm`;
            }
        },
        xAxis: {
            type: 'category',
            data: data.map(d => new Date(d.recorded_at).toLocaleTimeString()),
            boundaryGap: false,
        },
        yAxis: {
            type: 'value',
            name: 'mm',
            inverse: false, // you may need to set true depends on sensor configuration
        },
        dataZoom: [
            { type: 'inside', start: 0, end: 100 },
            { type: 'slider', bottom: 10 }
        ],
        visualMap: {
            show: false,
            dimension: 1,
            pieces: [
                { gt: 500, color: '#00968B' },
                {lte: 500, color: '#FF5252'}
            ]
        },
        series: [
            {
                name: 'Water Level',
                type: 'line',
                data: data.map(d => d.water_distance_mm),
                smooth: true,
                areaStyle: { opacity: 0.1 },
                itemStyle: { color: '#009688' },
                lineStyle: { width:3 }
            },
        ],
    };
});
</script>

<template>
    <v-card border flat class="pa-4" height="450">
      <div v-if="sensorStore.loading" class="d-flex align-center justify-center fill-height">
        <v-progress-circular indeterminate></v-progress-circular>
      </div>
      <e-chart v-else-if="sensorStore.sensorData.length" :option="chartOption" autoresize />

      <v-alert v-else type="info" variant="tonal" class="ma-4">No Data</v-alert>
    </v-card>
  </template>