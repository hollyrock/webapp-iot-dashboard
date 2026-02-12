import { ref, computed } from 'vue'
import type { SensorData } from '../types/sensor'
import axios from 'axios'
import { defineStore } from 'pinia'

// todo:Rewrite as Setup Store (Composition API)
export const useSensorStore = defineStore('sensor', () => {
    const sensorData = ref<SensorData[]>([])
    const loading = ref(false)
    const filterRange = ref('all')
    const error = ref<string | null>(null)

    const filteredData = computed(() => {
        const now = new Date()

        const filtered = sensorData.value.filter(d => {
            const recordDate = new Date( d.recorded_at )
            if ( filterRange.value === 'today') {
                return recordDate.toDateString() === now.toDateString()
            } else if ( filterRange.value === 'last3h') {
                const threeHourAgo = new Date(now.getTime() - 3 * 60 * 60 *1000)
                return recordDate >= threeHourAgo
            }
            return true;
        })
        return filtered.sort((a, b) =>
            new Date(a.recorded_at).getTime() - new Date(b.recorded_at).getTime()
        )
    })

    const latestData = computed(() =>{
        return sensorData.value[0] || null
    })

    const fetchSensors = async () =>{
        loading.value = true
        error.value = null
        try {
            const response = await axios.get<SensorData[]>('http://localhost:8888/api/sensors/')
            sensorData.value = response.data
        } catch (err) {
            error.value = 'Failed to get data from database.'
            console.error(err)
        } finally {
            loading.value = false
        }
    }

    return {
        sensorData,
        loading,
        error,
        filterRange,
        filteredData,
        latestData,
        fetchSensors
    }
})