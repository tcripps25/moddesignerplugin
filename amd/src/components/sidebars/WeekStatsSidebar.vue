<script setup>
import { computed, watch } from 'vue';
import Panel from '../ui/Panel.vue';
import PieChart from '@/components/charts/PieChart.vue';
import PanelNotice from '@/components/ui/PanelNotice.vue';
import Meter from '../charts/Meter.vue';
import { useCourseStore } from '@/stores/course.js'

const props = defineProps({
    weekIndex: Number
})

const course = useCourseStore();


const weekStats = computed(() => course.getActivityTypePercentagesForWeek(props.weekIndex));

watch(weekStats, (newStats) => {
    console.log('Week stats updated:', newStats);
});
</script>
<template>
    <Transition name="slide-fade">
        <div class="flex flex-col gap-10 divide-y">
            <Transition name="fade">
                <Panel collapse title="Learning Type Mix" sidebar>
                    <PieChart chartWidth="350" legendPosition="left" :dataseries="weekStats"
                        :datalabels="course.activityTypes" :colors="course.activityColors"
                        :id="'week-' + (weekIndex + 1) + '-learning-types'">
                        <p class="mb-3">An overview of the Learning Types you have used in this week of your course.
                        </p>
                    </PieChart>
                    <PanelNotice sidebar enable>
                        Breaking down the spread of Learning Types over the week can help you ensure you're providing
                        the right
                        mix for
                        your students.
                    </PanelNotice>
                </Panel>
            </Transition>
        </div>
    </Transition>
</template>