<script setup>
import { ref, computed } from 'vue';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { EllipsisHorizontalIcon } from '@heroicons/vue/16/solid';
import Pbutton from '@/components/buttons/Pbutton.vue';
import Menu from 'primevue/menu';
import { useCourseStore } from '@/stores/course.js'
import { useRouter } from 'vue-router';
const course = useCourseStore()
const confirm = useConfirm();
const toast = useToast();
const router = useRouter();
const props = defineProps({
    activityIndex: Number,
    weekIndex: Number,
    activity: Object,
})

const lastActivityIndex = computed(() => {
    const week = course.weeks[props.weekIndex];
    return week && week.activities ? props.activityIndex - 1 : 0;
});


const handleRemoveActivity = (weekIndex, activityIndex) => {
    course.weeks[weekIndex].activities.splice(activityIndex, 1);

    // If activities are left, calculate a valid index; otherwise, navigate to a safe route
    if (course.weeks[weekIndex].activities.length > 0) {
        // Navigate to the next available activity or the last one
        const newIndex = Math.min(activityIndex, course.weeks[weekIndex].activities.length - 1);
        router.replace({ path: `/design/${props.weekIndex}/${newIndex}` });
    } else {
        // If no activities are left, navigate to the week's overview or another default route
        router.replace({ path: `/design/${props.weekIndex}` });
    }
};

const handleDuplicateActivity = (weekIndex, activityIndex) => {
    const activities = course.weeks[weekIndex].activities;

    // Retrieve the activity to duplicate
    const originalActivity = activities[activityIndex];

    // Deep clone the original activity using JSON methods (safe fallback)
    let newActivity;
    try {
        newActivity = JSON.parse(JSON.stringify(originalActivity));
    } catch (error) {
        console.error("Error cloning activity:", error);
        return;
    }

    // Modify the duplicated activity (e.g., assign a new ID, alter the title)
    newActivity.title += " (Copy)";

    // Insert the duplicated activity into the activities array
    activities.splice(activityIndex + 1, 0, newActivity);

    // Navigate to the newly created duplicate
    router.replace({ path: `/design/${weekIndex}/${activityIndex + 1}` });
};



const deleteConfirm = () => {
    confirm.require({
        message: 'Do you really want to delete this Activity?',
        header: 'Delete "' + props.activity.title + '"',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Delete',
            severity: 'danger'
        },
        accept: () => {
            handleRemoveActivity(props.weekIndex, props.activityIndex)
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Activity deleted', life: 3000 });
        },
        reject: () => {

        }
    });
};

const manageMenu = ref();
const manageItems = ref([
    {
        label: 'Manage Week',
        items: [
            {
                label: 'Duplicate',
                icon: 'pi pi-copy',
                command: () => {
                    handleDuplicateActivity(props.weekIndex, props.activityIndex)
                }
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => {
                    deleteConfirm()
                }
            }
        ]
    }
]);
const toggleManageMenu = (event) => {
    manageMenu.value.toggle(event);
};

</script>
<template>


    <Pbutton aria-title="Manage Week" type="button" @click="toggleManageMenu" aria-haspopup="true"
        aria-controls="overlay_menu">
        <template #icon>
            <EllipsisHorizontalIcon class="w-5 h-5" />
        </template>
    </Pbutton>
    <Menu class="text-sm" ref="manageMenu" id="overlay_menu" :model="manageItems" :popup="true" />

</template>