<script setup>
import { useCourseStore } from '@/stores/course.js'
import { EllipsisHorizontalIcon } from '@heroicons/vue/24/outline';
import Image from './helpers/Image.vue';
const course = useCourseStore();
</script>



<template>
    <div class="max-w-3xl">
        <p class="mb-5 text-sm">A simplified example of how this week will be structured in Moodle. You'll be able to
            edit the
            names and other details once the template has been transferred to Moodle.</p>
        <div class="text-blue-900 bg-slate-200 rounded-lg overflow-hidden p-5 ">
            <div class="bg-sky-600 -mx-5 -mt-5 mb-5 flex px-5 items-center justify-between">
                <EllipsisHorizontalIcon class="w-10 h-10 text-blue-100" />
                <Image file-name="moodle.png" alt="Moodle Logo" classes="w-8 h-8" />
            </div>
            <h2>{{ course.title }}</h2>
            <div v-for="(week, index) in course.weeks" class="">
                <h2 class="font-semibold text-lg mb-2">{{ week.name }}</h2>
                <div v-if="week.activities.length > 0">
                    <p v-if="week.description" class="text-sm"><span
                            class="font-bold line-clamp-2">Description:</span>{{
                                week.description }}</p>
                    <div class="flex flex-col gap-2">
                        <div v-for="(activity, index) in week.activities" class="text-blue-900 flex flex-col gap-2 ">
                            <Panel remove-head-underline :title="activity.title">
                                <div class="flex flex-col gap-2">
                                    <p v-if="activity.instructions" class="line-clamp-2 text-sm"><span
                                            class="font-bold">Instructions: </span>{{
                                                activity.instructions }}</p>
                                    <div v-if="activity.selectedMoodle.length > 0"
                                        v-for="(moodleAct, index) in activity.selectedMoodle"
                                        class="rounded  bg-slate-50 p-2 ml-2">
                                        <p class="text-blue-950 font-semibold text-sm rounded-sm">
                                            {{ moodleAct.name }}</p>
                                    </div>

                                    <p v-else class="italic">This activity doesn't have any associated Moodle tools.</p>

                                </div>
                            </Panel>
                        </div>
                    </div>
                </div>

                <p v-else class="italic">No Activities have been added to this week yet.</p>

            </div>
        </div>
    </div>
</template>