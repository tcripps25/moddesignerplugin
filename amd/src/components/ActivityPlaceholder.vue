<script setup>
import { ref } from "vue";
import Pbutton from './buttons/Pbutton.vue';
import { PlusIcon } from '@heroicons/vue/24/solid';
import { useCourseStore } from '@/stores/course';
import { computed } from 'vue';
import Dialog from 'primevue/dialog';
import CreateActivity from "./CreateActivity.vue";
const course = useCourseStore()

const props = defineProps({
    activities: Object,
    weekIndex: Number
})

const week = course.getWeek(props.weekIndex)

// Create a ref to track which dialog is open, initialized as an empty object
const showActivity = ref({});

const route = (index) => computed(() => `/design/schedule/${props.weekIndex}/${index}`);

// Function to open the dialog for a specific activity
const openDialog = (index) => {
    showActivity.value[index] = true;
};

// Function to close the dialog for a specific activity
const closeDialog = (index) => {
    showActivity.value[index] = false;
};
</script>

<template>
    <div class="">
        <!-- Grid of activity links to provide an overview, shows limited information about each activity -->
        <div class="grid lg:grid-cols-2 transition-all xl:grid-cols-3 md:grid-cols-1 gap-5">
            <div @click="openDialog(index)" v-for="(activity, index) in activities">
                <Pbutton card :aria-label="activity.title"
                    class="flex flex-col p-5 h-44 w-full bg-gradient-to-br from-slate-100 to-purple-200 rounded-lg shadow hover:shadow-lg hover:scale-[102%] hover:ring-2 transition-all">
                    <template #icon>
                        <div class="flex flex-col text-start grow w-full">
                            <h4 class="text-sky-800 font-medium text-xl w-full h-full">{{ activity.title }}</h4>
                            <div class="mt-auto flex items-center">
                                <p class="text-sky-800 text-lg">{{ activity.duration }} <span
                                        class="text-base text-sky-800/80">mins</span></p>
                                <div v-if="activity.selectedTypes && activity.selectedTypes.length > 0"
                                    class="bg-white/80 h-7 p-1 rounded-s-full w-max ml-auto -mr-5 flex gap-2">
                                    <div v-for="(type) in activity.selectedTypes" class="rounded-full w-5 h-5 p-1"
                                        :style="'background-color:' + course.getColorByLabel(type) + ';'">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </Pbutton>
                <!-- Activity Dialog appended to shadow DOM #modal-target -->
                <Dialog :append-to="$shadowModalTarget" v-model:visible="showActivity[index]" modal
                    :header="'Editing: ' + activity.title" class="max-w-5xl" :key="index">
                    <!-- <SingleActivity :activity="activity" :activity-index="index" :week-index="weekIndex" />-->
                    <CreateActivity :activity="activity" :activity-index="index" :week-index="weekIndex" />
                </Dialog>
            </div>

            <!-- Add activity button: Add new activity and immediately open the edit dialog -->
            <Pbutton @click="course.addActivityToWeek(weekIndex), openDialog(activities.length - 1)" ghost
                label="Add Activity" class="p-5 h-44 !w-full text-2xl bg-gradient-to-br rounded-lg flex shadow">
                <template #icon>
                    <PlusIcon class="h-5 w-5" />
                </template>
            </Pbutton>
        </div>
    </div>
</template>
