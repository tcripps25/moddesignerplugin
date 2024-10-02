<script setup>

import { useCourseStore } from '@/stores/course.js'
import Panel from './ui/Panel.vue';
import Pbutton from './buttons/Pbutton.vue';
import { ArrowRightCircleIcon } from '@heroicons/vue/16/solid';
import { useRouter } from 'vue-router';
import { useFetchMoodleString } from '@/utils/fetchMoodleString';

const gotoweeklabel = useFetchMoodleString('gotoweekbtn', 'Go to week')

const course = useCourseStore()
const router = useRouter()
// Define props
const props = defineProps({
    week: Object,
    weekIndex: Number,
});

const removeWeek = (weekIndex) => {
    course.weeks.splice(weekIndex, 1);
};
</script>

<template>
    <Panel v-if="week" card :title="week.name" header-bar :link="'./schedule/' + weekIndex">
        <div class="flex">
            <div class="text-sm">Teaching Week {{ weekIndex + 1 }} Commencing: {{ week.formattedDate }}</div>
        </div>
        <div class="flex justify-end">
            <Pbutton @click="router.push('./schedule/' + weekIndex)" ghost trailing :label=gotoweeklabel>
                <template #icon>
                    <ArrowRightCircleIcon class="w-5 h-5" />
                </template>
            </Pbutton>
        </div>
    </Panel>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.list-leave-active {
    position: absolute;
}
</style>
