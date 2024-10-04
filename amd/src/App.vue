<script setup>
import { onMounted, ref, getCurrentInstance } from "vue";
import { RouterView } from "vue-router";

import MainSidebar from "@/components/MainSidebar.vue"
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast';
import DynamicDialog from 'primevue/dynamicdialog';
import axios from "axios";
import { useCourseStore } from '@/stores/course.js';
const course = useCourseStore();

// Access global property
const siteRoot = getCurrentInstance().appContext.config.globalProperties.$siteRoot;
const buildMode = ref(process.env.NODE_ENV === 'production');

const buildClasses = buildMode.value ? '-mt-[60px] pt-[60px]' : '';



// Function to fetch modules for activity selector from Moodle
async function fetchModules() {
  try {
    const response = await axios.get(siteRoot + '/local/moddesigner/ajax.php?sesskey=' + M.cfg.sesskey);
    course.moodleActivities = response.data.modules; // Assign the fetched modules data to the reactive variable
    console.log(course.moodleActivities); // Debugging - log the modules to the console
  } catch (error) {
    console.error("Error fetching modules:", error);
  }
}


// onMounted lifecycle hook
onMounted(() => {
  console.log(siteRoot);
  if (buildMode.value) {
    require(['core/config'], function (config) {
      const baseURL = config.wwwroot;
      console.log(baseURL); // Moodle base URL
    });

    fetchModules(); // Fetch the modules when the component is mounted
  }
});

</script>

<template>
  <div class="flex grow h-screen overflow-hidden" :class="buildClasses">
    <MainSidebar />
    <main class="flex grow bg-white">
      <RouterView class="flex grow relative" />
    </main>
  </div>
  <ConfirmDialog class="!rounded">
  </ConfirmDialog>
  <Toast />
  <DynamicDialog />
</template>