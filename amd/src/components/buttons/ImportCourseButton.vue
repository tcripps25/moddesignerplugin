<script setup>
import { ArrowDownOnSquareIcon } from '@heroicons/vue/24/solid';
import { useCourseStore } from '@/stores/course.js'
const course = useCourseStore()

const props = defineProps({
  name: String
});

// Function to handle importing JSON data
const importJSON = (jsonData) => {
  try {
    // Parse the JSON data
    const importedData = JSON.parse(jsonData);

    // Validate the structure of the imported data
    if (typeof importedData !== 'object' || importedData === null || !('title' in importedData) || !('weeks' in importedData)) {
      throw new Error('Invalid JSON data: Expected an object with "title" and "weeks" properties');
    }

    // Set the imported data to the course store
    course.title = importedData.title;
    course.startDate = importedData.startDate
    course.weeks = importedData.weeks;
  } catch (error) {
    console.error('Error importing JSON:', error.message);
    // Optionally, display an error message to the user
  }
};


// Function to trigger import when the file input changes
const importFromFile = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';

  input.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const jsonData = event.target.result;
      importJSON(jsonData);
    };

    reader.readAsText(file);
  };

  input.click();
};

</script>

<template>
  <button :title="name" @click="importFromFile"
    class="rounded-full  text-slate-700 hover:bg-slate-300 px-2 py-2 h-max flex items-center gap-1 transition"><span
      class="sr-only">{{ name }} </span>
    <ArrowDownOnSquareIcon class="w-5 h-5" />
  </button>
</template>