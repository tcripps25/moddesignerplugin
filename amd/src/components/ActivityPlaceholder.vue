<script setup>
import { ref } from "vue";
import Pbutton from './buttons/Pbutton.vue';
import { PlusIcon } from '@heroicons/vue/24/solid';
import { useCourseStore } from '@/stores/course';
import { computed } from 'vue';
import Dialog from 'primevue/dialog';
import CreateActivity from "./CreateActivity.vue";
import Menu from "primevue/menu";
import { ArrowRightIcon, EllipsisVerticalIcon } from "@heroicons/vue/16/solid";
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

const menu = ref();
const items = ref([
    {
        label: 'Options',
        items: [
            {
                label: 'Refresh',
                icon: 'pi pi-refresh'
            },
            {
                label: 'Export',
                icon: 'pi pi-upload'
            }
        ]
    }
]);

const toggle = (event) => {
    menu.value.toggle(event);
};
</script>

<template>
    <div class="">
        <!-- Grid of activity links to provide an overview, shows limited information about each activity -->
        <div class="grid lg:grid-cols-2 cursor-pointer transition-all xl:grid-cols-3 md:grid-cols-1 gap-5">
            <div @click="openDialog(index)" v-for="(activity, index) in activities">
                <div :aria-label="activity.title"
                    class="flex flex-col p-4 h-44 w-full !bg-slate-100 overflow-hidden border border-sky-300 rounded-lg shadow hover:shadow-lg hover:scale-[102%] hover:ring-4 transition-all">

                    <div class="flex flex-col text-start grow w-full">
                        <div class="flex justify-between">
                            <h4 class="text-sky-800 text-lg line-clamp-1 overflow-ellipsis font-semibold">
                                {{ activity.title }}
                            </h4>
                            <Pbutton @click="toggle" aria-haspopup="true" aria-controls="overlay_menu"
                                class="z-50 -mr-1 -mt-1" aria-label="Manage Activity">
                                <template #icon>
                                    <EllipsisVerticalIcon class="w-5 h-5" />
                                </template>
                            </Pbutton>
                            <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
                        </div>
                        <div class="flex flex-col">
                            <p class="text-sky-800 text-lg">{{ activity.duration }} <span
                                    class="text-base text-sky-800/80">mins</span></p>
                        </div>
                        <div class="flex justify-between mt-auto pt-5">
                            <div v-if="activity.selectedTypes && activity.selectedTypes.length > 0"
                                class=" rounded-full w-max  items-center flex gap-2">
                                <div v-for="(type) in activity.selectedTypes" class="rounded-full w-5 h-5 p-1"
                                    :style="'background-color:' + course.getColorByLabel(type) + ';'">

                                </div>
                            </div>
                            <Pbutton @click="openDialog(index)" solid aria-label="Open Activity" class="ml-auto">
                                <template #icon>
                                    <ArrowRightIcon class="w-3 h-3" />
                                </template>
                            </Pbutton>
                        </div>
                    </div>
                </div>
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
