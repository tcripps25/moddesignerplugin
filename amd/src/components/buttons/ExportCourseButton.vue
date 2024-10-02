<script setup>
import { ArrowUpOnSquareIcon } from '@heroicons/vue/24/solid';
import { useCourseStore } from '@/stores/course.js';
import { slugify } from '@/utils/utils';

const course = useCourseStore();
const props = defineProps({
  name: String
});

const exportJSON = () => {
  const data = {
    title: course.title,
    startDate: course.startDate,
    weeks: course.weeks.map(week => ({
      title: week.title,
      date: week.date,
      description: week.description,
      activities: week.activities.map(activity => ({
        title: activity.title,
        instructions: activity.instructions,
        selectedTypes: activity.selectedTypes,
        selectedMoodle: activity.selectedMoodle,
        selectedAlignments: activity.selectedAlignments,
        mode: activity.mode,
        duration: activity.duration,
        group: activity.isGroup
      }))
    }))
  };

  const jsonData = JSON.stringify(data, null, 2);
  const filename = slugify(course.title);

  const blob = new Blob([jsonData], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${filename}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
};
</script>

<template>
  <button :title="name" @click="exportJSON"
    class="rounded-full text-slate-700 hover:bg-slate-300 px-2 py-2 h-max flex items-center gap-1 transition">
    <span class="sr-only">{{ name }}</span>
    <ArrowUpOnSquareIcon class="w-5 h-5" />
  </button>
</template>