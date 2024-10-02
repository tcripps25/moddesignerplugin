<script setup>
import { useCourseStore } from '@/stores/course.js'
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
  index: Number,
});

const course = useCourseStore();

const moveWeekUp = (weekIndex) => {
  if (weekIndex > 0) {
    const temp = [...course.weeks]; // Create a copy of the array
    const movedWeek = temp.splice(weekIndex, 1)[0];
    temp.splice(weekIndex - 1, 0, movedWeek);
    course.updateWeeks(temp); // Use the store action to update the weeks
  }
};

const moveWeekDown = (weekIndex) => {
  if (weekIndex < course.weeks.length - 1) {
    const temp = [...course.weeks]; // Create a copy of the array
    const movedWeek = temp.splice(weekIndex, 1)[0];
    temp.splice(weekIndex + 1, 0, movedWeek);
    course.updateWeeks(temp); // Use the store action to update the weeks
  }
};

</script>

<template>
  <div class="flex items-center relative z-10">
    <button @click="moveWeekUp(index)" :title="'Move week ' + (index + 1) + ' up'"
      class="w-6 h-6 p-1 rounded peer-hover:bg-slate-200 hover:bg-slate-50 hover:text-blue-900 transition ">
      <ArrowUpIcon class="w-4 h-4" />
    </button>
    <button @click="moveWeekDown(index)" :title="'Move week ' + (index + 1) + ' down'"
      class="w-6 h-6 p-1 rounded peer-hover:bg-slate-200 hover:bg-slate-50 hover:text-red-900 transition">
      <ArrowDownIcon class="w-4 h-4" />
    </button>
  </div>
</template>
