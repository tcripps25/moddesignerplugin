<script setup>
import { useCourseStore } from '@/stores/course.js'
import SelectButton from 'primevue/selectbutton';
import ToggleSwitch from 'primevue/toggleswitch';
import MultiSelect from 'primevue/multiselect';
import Fieldset from 'primevue/fieldset';
import ActivityLabel from '../ActivityLabel.vue';
import InputText from 'primevue/inputtext';
import { useFetchMoodleString } from '@/utils/fetchMoodleString';

const course = useCourseStore();
const props = defineProps({
    weekIndex: Number,
    activity: Object,
    activityIndex: Number,
});


const fieldLegend = useFetchMoodleString('steppaneltitle2', 'Learning Approach');
const durationLabel = useFetchMoodleString('form_activity_duration_label', 'Duration (mins)');
const durationHelp = useFetchMoodleString('form_activity_duration_help', 'How long this Activity will take to complete.');
const groupLabel = useFetchMoodleString('form_activity_group_label', 'Group');
const groupHelp = useFetchMoodleString('form_activity_group_help', 'Is this a group Activity?');
const modeLabel = useFetchMoodleString('form_activity_mode_label', 'Learning Mode');
const modeHelp = useFetchMoodleString('form_activity_mode_help', 'Indicate the learning mode of this Activity.');
const typeLabel = useFetchMoodleString('form_activity_type_label', 'Learning Type');
const typeHelp = useFetchMoodleString('form_activity_type_help', 'Select one or more Learning Types for this Activity.');

</script>

<template>
    <Fieldset :legend=fieldLegend>
        <div class="flex flex-col gap-2">
            <ActivityLabel horizontal :label=durationLabel targetId="activity-duration" :help=durationHelp>
                <InputText type="number" :min="0" buttonLayout="horizontal" :step="1" id="activity-duration"
                    v-model="activity.duration" class="w-20" />
            </ActivityLabel>
            <ActivityLabel horizontal :label=groupLabel targetId="activity-group-toggle" :help=groupHelp>
                <ToggleSwitch v-model="activity.isGroup" inputId="activity-group-toggle" />
            </ActivityLabel>
            <ActivityLabel horizontal :label=modeLabel id="activity-mode-select" :help=modeHelp>
                <SelectButton id="activity-mode-select" :options="['Sync', 'Async']"
                    aria-labelledby="activity-mode-select" v-model="activity.mode" />
            </ActivityLabel>
            <ActivityLabel :label=typeLabel targetId="select-learning-type" :help=typeHelp>
                <MultiSelect v-model="activity.selectedTypes" :options="course.activityTypesColors" optionLabel="type"
                    optionValue="type" placeholder="Select Learning Types" :maxSelectedLabels="3"
                    inputId="select-learning-type" />
            </ActivityLabel>
        </div>
    </Fieldset>

</template>