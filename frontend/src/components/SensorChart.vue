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

const props = defineProps<{
    title: string;
    metrics: {
        key: keyof SensorData;
        label: string;
        color: string;
        unit: string;
    }[];
    yAxisRight?: boolean;
}>();

const sensorStore = useSensorStore()

const chartOption = computed(() => {

    const data = sensorStore.sortedData
    const timeData = data.map(d => new Date(d.recorded_at).toLocaleTimeString())

    return{
        title: { text: props.title, left: 'center' },
        tooltip: { trigger: 'axis', },
        legend: { bottom: 0 },
        grid: { top: 60, left: '10%', right: '10%', bottom: 60 },

        xAxis: { type: 'category', data: timeData, boundaryGap: false, },
        yAxis: [
            { type: 'value', name: props.metrics[0].unit, inverse: false, }, // you may need to set inverse true depends on sensor configuration
            props.yAxisRight ? { type: 'value', name: props.metrics[1]?.unit, position: 'right' } : {}
        ],
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
        series: props.metrics.map(( m, index ) => ({
            name: m.label,
            type: 'line',
            yAxisIndex: index > 0 && props.yAxisRight ? 1 : 0,
            data: data.map( d=> d[m.key]),
            smooth: true,
            color: m.color,
            showSymbol: false,
        }))
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