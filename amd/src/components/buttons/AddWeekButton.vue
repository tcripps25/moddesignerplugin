<script setup>
import { ref, computed } from 'vue';
import { useCourseStore } from '@/stores/course.js';
import { PlusIcon } from '@heroicons/vue/24/solid';
import Button from "primevue/button";

const course = useCourseStore();
const currentWeeks = computed(() => course.numberOfWeeks);


</script>

<template>
  <Button text size="small" @click="handleAddWeek" title="Add Week" aria-label="Add Week" icon>
    <template #icon>
      <PlusIcon class="w-4 h-4" />
    </template>

  </Button>
</template>
