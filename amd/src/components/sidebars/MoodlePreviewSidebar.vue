<script setup>
import Panel from '../ui/Panel.vue';
import { useCourseStore } from '@/stores/course.js'
import Image from '../helpers/Image.vue';
import { EllipsisHorizontalIcon } from '@heroicons/vue/16/solid';
const course = useCourseStore();

const props = defineProps({
    week: Object,
    weekIndex: Number,
})
</script>
<template>
    <Panel title="Moodle Structure" sidebar collapse>
        <p class="mb-5 text-sm">An example of how this week will be structured in Moodle. You'll be able to edit the
            names and other details once the template has been transferred to Moodle.</p>
        <div class="text-blue-900 bg-slate-200 rounded-s-lg overflow-hidden p-5 -mr-5">
            <div class="bg-sky-600  -mx-5 -mt-5 mb-5 flex px-2 items-center justify-between">
                <EllipsisHorizontalIcon class="w-7 h-7 text-blue-100" />
                <Image file-name="moodle.png" alt="Moodle Logo" classes="w-8 h-8" />
            </div>
            <h2 class="font-semibold text-lg mb-2">{{ week.name }}</h2>
            <div class="flex flex-col gap-5">
                <div v-for="(activity, index) in week.activities" class="text-blue-900 flex flex-col gap-2 ">
                    <Panel remove-head-underline :title="activity.title">
                        <div class="flex flex-col gap-2">
                            <p v-if="activity.instructions" class="line-clamp-2 text-sm"><span
                                    class="font-bold">Instructions: </span>{{
                                        activity.instructions }}</p>
                            <div v-for="(moodleAct, index) in activity.selectedMoodle"
                                class="rounded-s  bg-slate-50 -mr-5 p-2 ml-2">
                                <p class="text-blue-950 font-semibold text-sm rounded-sm">
                                    {{ moodleAct.name }}</p>
                            </div>
                        </div>
                    </Panel>
                </div>
            </div>

        </div>
    </Panel>
</template>