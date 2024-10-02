<script setup>
import { useCourseStore } from '@/stores/course.js'
import { TrashIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
  index: Number,
});

const course = useCourseStore();

const removeWeek = (weekIndex) => {
  course.weeks.splice(weekIndex, 1);
};
</script>

<template>
  <button @click="removeWeek(index)" :title="'Remove week ' + (index + 1)"
    class="w-6 h-6 p-1 rounded hover:bg-slate-50 hover:text-red-900 relative transition z-10">
    <TrashIcon class="w-4 h-4" />
  </button>

</template>