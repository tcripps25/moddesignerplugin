<script setup>
import { ref, onMounted } from 'vue';
import MeterGroup from 'primevue/metergroup';

const props = defineProps({
    title: String,
    max: Number,
    values: Object,
});

const value = [
    { label: 'typeMix', value: 10, color: '#' },
    { label: 'teachingTime', value: 2, color: '#' },
    { label: 'moodleMix', value: 9, color: '#' },
    // Add more items as needed
];



</script>
<template>
    <MeterGroup :value="values" :max="max">
        <template #start>
            <div class="flex flex-col gap-2">
                <h4 class="font-semibold text-slate-600" v-if="title">{{ title }}</h4>
                <slot></slot>
                <div class="mt-3">
                    <slot name="meter-badge"></slot>
                </div>
            </div>
        </template>

    </MeterGroup>

</template>