import type { SensorData } from '../types/sensor'
import axios from 'axios'
import { defineStore } from 'pinia'

export const useSensorStore = defineStore('sensor', {
    state: () => ({
        sensorData: [] as SensorData[],
        loading: false,
        error: null as string | null,
    }),

    getters: {
        sortedData: (state) => {
            return [...state.sensorData].sort((a, b) =>
                new Date(a.recorded_at).getTime() - new Date(b.recorded_at).getTime()
            )
        },
        latestData: (state) => state.sensorData[0] || null
    },

    actions: {
        async fetchSensors() {
            this.loading = true
            this.error = null
            try {
                const response = await axios.get<SensorData[]>('http://localhost:8888/api/sensors/')
                this.sensorData = response.data
            } catch (err) {
                this.error = 'Failed to get data from database.'
                console.error(err)
            } finally {
                this.loading = false
            }
        }
    }
})