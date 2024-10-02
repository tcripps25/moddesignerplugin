<script setup>
import { ArrowPathIcon } from '@heroicons/vue/24/solid';
import { useCourseStore } from '@/stores/course.js'
const course = useCourseStore()

const props = defineProps({
  name: String
});

const resetCourse = () => {
  course.title = '';
  course.weeks = []; // Reset weeks to an empty array
};
</script>

<template>
  <button :title="name" @click="resetCourse" class="rounded-full text-slate-700 hover:bg-slate-300 px-2 py-2 h-max flex items-center gap-1 transition"><span class="sr-only">{{ name }} </span><ArrowPathIcon class="w-5 h-5"/></button>
</template>