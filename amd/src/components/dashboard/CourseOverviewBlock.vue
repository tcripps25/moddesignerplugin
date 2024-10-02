<script setup>
import { useCourseStore } from '@/stores/course.js'
import Panel from '../ui/Panel.vue';
import LineChart from '@/components/charts/LineChart.vue'
import MeterGroup from 'primevue/metergroup';
import Button from 'primevue/button';
import { onMounted } from 'vue';
import PieChart from '@/components/charts/PieChart.vue';
const course = useCourseStore()


</script>

<template>
    <div class="flex gap-5">
        <Panel :title="'Module Overview'">
            <template v-slot:subtitle>
                <p class="text-lg">{{ course.title }}</p>
            </template>

        </Panel>

    </div>

</template>