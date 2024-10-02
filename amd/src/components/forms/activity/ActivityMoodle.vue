<script setup>
import { useCourseStore } from '@/stores/course.js';
import { ref, computed, onMounted } from 'vue';
import Draggable from 'vuedraggable';
import MultiSelect from 'primevue/multiselect';
import ActivityLabel from '../ActivityLabel.vue';
import MoodleActivity from '@/components/ui/MoodleActivity.vue';
import Fieldset from 'primevue/fieldset';
import axios from 'axios';

// Accessing course store
const course = useCourseStore();

// Defining props for the component
const props = defineProps({
    weekIndex: Number,
    activity: Object,
    activityIndex: Number,
});

// Function to get random activities
function getRandomActivities(array, maxNumberOfItems) {
    const newArray = [...array];
    const shuffledArray = newArray.sort(() => 0.5 - Math.random());
    const numberOfItems = Math.floor(Math.random() * Math.min(maxNumberOfItems, newArray.length)) + 1;
    return shuffledArray.slice(0, numberOfItems);
}

// Suggest 3 random Moodle activities
const suggestMoodleActivities = ref(getRandomActivities(course.moodleActivities, 3));

// Function to remove suggested activities from the list of all activities
function removeSuggestedActivities(array1, array2) {
    const set2 = new Set(array2);
    return array1.filter(item => !set2.has(item));
}

// Additional activities excluding the suggested ones
const additionalActivities = computed(() => removeSuggestedActivities(course.moodleActivities, suggestMoodleActivities.value));

// Function to select and add activity to selectedMoodle array
const selectActivity = (moodleActivity) => {
    // Clone the moodleActivity and add the current date as an id
    const activityWithId = {
        ...moodleActivity, // Spread the properties of the moodleActivity
        id: new Date().toISOString() // Add a unique ID using the current date
    };

    // Add the cloned activity with the new id to the selectedMoodle array
    props.activity.selectedMoodle.push(activityWithId);

};


// Function to deselect/remove an activity from selectedMoodle array
const deselectActivity = (moodleActivity) => {
    // Find the index of the activity and remove it
    const index = props.activity.selectedMoodle.indexOf(moodleActivity);
    if (index !== -1) {
        props.activity.selectedMoodle.splice(index, 1);
    }
};



</script>


<template>
    <Fieldset legend="Moodle Activities">

        <div class="flex h-full gap-5">
            <ActivityLabel unseparated class="min-w-[20rem] flex h-full" label="Selected Moodle activities"
                targetId="selected-moodle-activities"
                help="Reorder the activities to your liking, this order will be reflected in your Moodle site.">
                <!-- Draggable list for selected Moodle activities -->
                <div
                    class="grow bg-slate-50 dark:bg-transparent dark:border-zinc-700 rounded border-dashed border-2 h-64 overflow-y-auto">
                    <div class="p-2 flex flex-col gap-2 grow">
                        <Draggable v-model="activity.selectedMoodle" :animation="200" item-key="id">
                            <template #item="{ element }">
                                <MoodleActivity selected :activity="activity" :moodle-activity="element" class="my-1"
                                    @remove-clicked="deselectActivity(element)" />
                            </template>
                        </Draggable>
                    </div>
                </div>
            </ActivityLabel>
            <!-- List of available Moodle activities -->
            <div class="flex flex-col  shrink">
                <!-- Choose new Moodle activities -->
                <ActivityLabel label="Choose new Moodle activities" targetId="select-moodle-activities"
                    help="Find out more about these Moodle activities, and when each is appropriate to use via the EXPLORE tool.">
                    <ul class="flex gap-1 flex-wrap">
                        <li id="select-moodle-activities" v-for="(moodleactivity, index) in course.moodleActivities"
                            :key="index">
                            <MoodleActivity :activity="activity" :moodle-activity="moodleactivity"
                                @activity-clicked="selectActivity(moodleactivity)" />
                        </li>
                    </ul>
                </ActivityLabel>

                <!-- Re-use existing Moodle activities -->
                <ActivityLabel label="Re-use existing Moodle activities"
                    help="These activities are populated from your current Moodle module site."
                    targetId="select-moodle-activities">
                    <MultiSelect v-model="activity.selectedMoodle" :options="course.moduleData" optionLabel="name"
                        filter optionGroupLabel="name" optionGroupChildren="items" placeholder="Select activities"
                        :maxSelectedLabels="0">

                    </MultiSelect>

                </ActivityLabel>
            </div>
        </div>
    </Fieldset>
</template>
