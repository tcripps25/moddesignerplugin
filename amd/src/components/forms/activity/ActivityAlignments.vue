<script setup>
import { useCourseStore } from '@/stores/course.js'
import ToggleSwitch from 'primevue/toggleswitch';
import Fieldset from 'primevue/fieldset';
import Divider from 'primevue/divider';
import { computed } from 'vue';
import ActivityLabel from '../ActivityLabel.vue';
const course = useCourseStore();

const props = defineProps({
    weekIndex: Number,
    activity: Object,
    activityIndex: Number,
});


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
</script>

<template>
    <Fieldset :legend="option.group" v-for="(option, optionIndex) in course.alignmentOptions" :key="optionIndex">
        <div>
            <p class="text-sm mb-4 max-w-2xl">Select which {{option.group}} this Activity is
                aligned
                with. </p>
            <div>
               
                <Transition name="fade">
                    <div class="flex flex-col">
                            <ActivityLabel v-for="(item, itemIndex) in option.items" :key="itemIndex" class="py-3" :index="itemIndex + 1"  horizontal :label="item.nickname ? item.nickname : item.label" :targetId="'activity-' + activityIndex + item.value + '-switch-' + itemIndex" :sublabel="item.nickname ? item.label : ''">
                                <ToggleSwitch v-model="isAligned(item).value"
                                :inputId="'activity-' + activityIndex + item.value + '-switch-' + itemIndex" />
                            </ActivityLabel>
                        </div>
                </Transition>
            </div>
        </div>
    </Fieldset>
</template>