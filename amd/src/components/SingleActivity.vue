<script setup>
import { ref, computed } from 'vue';
import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';
import FileUpload from '@/components/forms/FileUpload.vue'
import Panel from './ui/Panel.vue';
import ActivityLabel from '@/components/forms/ActivityLabel.vue'
import ToggleSwitch from 'primevue/toggleswitch';
import SelectButton from 'primevue/selectbutton';
import Divider from 'primevue/divider';
import { useCourseStore } from '@/stores/course.js'
import Fieldset from 'primevue/fieldset';
import ActivityPlaceholder from './ActivityPlaceholder.vue';
import ManageActivityButton from '@/components/buttons/ManageActivityButton.vue';
import MoodleActivity from './ui/MoodleActivity.vue';
import MultiSelect from 'primevue/multiselect';


const props = defineProps({
    weekIndex: Number,
    activity: Object,
    activityIndex: Number,
});

const course = useCourseStore();

const activityWeek = computed(() => course.getWeek(props.weekIndex));

const cardCount = computed(() => Math.min((activityWeek.value.activityCount - 1), 4));

const dynamicBgClass = (index) => {
    const baseColor = 100;
    const increment = 100;
    const colors = ['bg-slate-100', 'bg-slate-200', 'bg-slate-300', 'bg-slate-400', 'bg-slate-500']
    const colorValue = baseColor + (index * increment);
    const clampedColorValue = Math.min(colorValue, 900);
    return `bg-slate-${clampedColorValue}`;
};

const isAligned = (item) => computed({
    get: () => {
        if (!props.activity.alignments) {
            props.activity.alignments = [];
        }
        return props.activity.selectedAlignments.some(alignment => alignment.value === item.value);
    },
    set: (newValue) => {
        if (!props.activity.selectedAlignments) {
            props.activity.selectedAlignments = [];
        }

        if (newValue) {
            if (!props.activity.selectedAlignments.some(alignment => alignment.value === item.value)) {
                props.activity.selectedAlignments.push(item);
            }
        } else {
            const index = props.activity.selectedAlignments.findIndex(alignment => alignment.value === item.value);
            if (index > -1) {
                props.activity.selectedAlignments.splice(index, 1);
            }
        }
    }
});

function getRandomActivities(array, maxNumberOfItems) {
    const newArray = [...array];
    const shuffledArray = newArray.sort(() => 0.5 - Math.random());
    const numberOfItems = Math.floor(Math.random() * Math.min(maxNumberOfItems, newArray.length)) + 1;
    return shuffledArray.slice(0, numberOfItems);
}

const suggestMoodleActivities = getRandomActivities(course.moodleActivities, 3);

function removeSuggestedActivities(array1, array2) {
    const set2 = new Set(array2);
    return array1.filter(item => !set2.has(item));
}

const additionalActivities = ref(removeSuggestedActivities(course.moodleActivities, suggestMoodleActivities));

</script>

<template>
    <div v-if="activity" class="relative w-full max-w-7xl transition-all" :style="{ marginTop: `${cardCount * 10}px` }">
        <Panel>

            <div class="grid xs:grid-cols-1 2xl:grid-cols-2 gap-5">
                <div class="grow">
                    <Fieldset legend="Basic Information">
                        <ActivityLabel label="Title" targetId="activity-name"
                            help="Enter a descriptive title for this Activity.">
                            <InputText id="activity-name" v-model="activity.title" />
                        </ActivityLabel>
                        <ActivityLabel label="Instructions" targetId="activity-instructions"
                            help="Describe the steps involved in this Activity to your students.">
                            <Textarea autoResize rows="5" id="activity-instructions" v-model="activity.instructions" />
                        </ActivityLabel>
                    </Fieldset>
                    <Fieldset legend="Learning Approach">
                        <div class="flex flex-col gap-2">
                            <ActivityLabel horizontal label="Duration (mins)" targetId="activity-duration"
                                help="How long this Activity will take to complete.">
                                <InputText type="number" :min="0" buttonLayout="horizontal" :step="1"
                                    id="activity-duration" v-model="activity.duration" class="w-20" />
                            </ActivityLabel>
                            <ActivityLabel horizontal label="Group" targetId="activity-group-toggle"
                                help="Is this a group Activity?">
                                <ToggleSwitch v-model="activity.isGroup" inputId="activity-group-toggle" />
                            </ActivityLabel>
                            <ActivityLabel horizontal label="Learning Mode" id="activity-mode-select"
                                help="Indicate the learning mode of this Activity.">
                                <SelectButton id="activity-mode-select" :options="['Sync', 'Async']"
                                    aria-labelledby="activity-mode-select" v-model="activity.mode" />
                            </ActivityLabel>
                            <ActivityLabel label="Learning Type" targetId="select-learning-type"
                                help="Select one or more Learning Types for this Activity.">
                                <MultiSelect v-model="activity.selectedTypes" :options="course.activityTypesColors"
                                    optionLabel="type" optionValue="type" placeholder="Select Learning Types"
                                    :maxSelectedLabels="3" inputId="select-learning-type" />
                            </ActivityLabel>
                        </div>
                    </Fieldset>
                </div>
                <Fieldset legend="Alignments">
                    <div>
                        <p class="text-sm mb-4">Select which Learning Outcomes or Assessments this Activity is
                            aligned
                            with.</p>
                        <div v-for="(option, optionIndex) in course.alignmentOptions" :key="optionIndex">
                            <Divider v-if="optionIndex !== 0" />
                            <div class="flex justify-between items-center">
                                <label class="w-full" :for="'alignment-group-' + optionIndex">
                                    <h3 class="font-medium">{{ option.group }}</h3>
                                </label>
                            </div>
                            <Transition name="fade">
                                <ul class="flex flex-col">
                                    <li v-for="(item, itemIndex) in option.items" :key="itemIndex"
                                        class=" flex gap-3 hover:bg-slate-100 px-2 py-3 hover:rounded transition">
                                        <span
                                            class="min-w-6 max-h-6 text-sm font-medium flex items-center justify-center bg-cyan-700 text-white rounded-full">{{
                                                itemIndex + 1 }}</span>
                                        <label class="w-full mr-2"
                                            :for="'activity-' + activityIndex + item.value + '-switch-' + itemIndex">
                                            <span v-if="item.nickname">{{ item.nickname }}</span>
                                            <span v-else>{{ item.label }}</span>
                                        </label>
                                        <div class="w-max">
                                            <ToggleSwitch v-model="isAligned(item).value"
                                                :inputId="'activity-' + activityIndex + item.value + '-switch-' + itemIndex" />
                                        </div>
                                    </li>
                                </ul>
                            </Transition>
                        </div>
                    </div>
                </Fieldset>
                <Fieldset legend="Moodle Activities">
                    <ActivityLabel label="Moodle Activities" targetId="select-moodle-activities">
                        <MultiSelect v-model="activity.selectedMoodle" :options="course.moodleActivities"
                            optionLabel="name" filter placeholder="Select Moodle Activities" :maxSelectedLabels="3"
                            inputId="select-moodle-activities" />
                    </ActivityLabel>
                </Fieldset>
                <FileUpload />
            </div>
        </Panel>

    </div>
    <ActivityPlaceholder v-else :activities="course.weeks[weekIndex].activities" />

</template>

<style scoped>
.fade-move,
.fade-enter-active {
    transition: all 0.2s ease-out;
}

.fade-leave-active {
    transition: all 0.2s ease-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;

}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.tabs-move,
.tabs-enter-active,
.tabs-leave-active {
    transition: all 0.5s ease-out;
}

.tabs-enter-from,
.tabs-leave-to {

    margin-top: 10px;
}



.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease-out;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(10px);
}

.list-leave-active {
    position: absolute;
}
</style>
