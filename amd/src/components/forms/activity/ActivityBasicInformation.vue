<script setup>

import Fieldset from 'primevue/fieldset';
import ActivityLabel from '../ActivityLabel.vue';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import { useFetchMoodleString } from '@/utils/fetchMoodleString';

const props = defineProps({
    weekIndex: Number,
    activity: Object,
    activityIndex: Number,
});


const fieldLegend = useFetchMoodleString('steppaneltitle1', 'Basic Information');
const formTitle1 = useFetchMoodleString('form_activity_titlelabel', 'Title');
const formHelp1 = useFetchMoodleString('form_activity_titlehelp', 'Enter a descriptive title for this Activity.');
const formTitle2 = useFetchMoodleString('form_activity_instructionslabel', 'Instructions');
const formHelp2 = useFetchMoodleString('form_activity_instructionshelp', 'Describe the steps involved in this Activity to your students.');
</script>

<template>
    <Fieldset :legend=fieldLegend>
        <ActivityLabel :label=formTitle1 targetId="activity-name" :help=formHelp1>
            <InputText id="activity-name" v-model="activity.title" />
        </ActivityLabel>
        <ActivityLabel :label=formTitle2 targetId="activity-instructions" :help=formHelp2>
            <Textarea autoResize rows="5" id="activity-instructions" v-model="activity.instructions" />
        </ActivityLabel>
    </Fieldset>
</template>