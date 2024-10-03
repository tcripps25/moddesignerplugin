<script setup>
import Page from '@/components/Page.vue';
import Button from 'primevue/button';
import { DocumentArrowDownIcon, ArrowRightCircleIcon } from '@heroicons/vue/24/solid';
import Image from '@/components/helpers/Image.vue';
import Pbutton from '@/components/buttons/Pbutton.vue';
import { useCourseStore } from '@/stores/course.js';
import { slugify } from '@/utils/utils';
import PageHeader from '@/components/PageHeader.vue';

const course = useCourseStore();
const props = defineProps({
    name: String
});

const exportJSON = () => {
    const data = {
        title: course.title,
        startDate: course.startDate,
        weeks: course.weeks.map(week => ({
            title: week.title,
            date: week.date,
            description: week.description,
            activities: week.activities.map(activity => ({
                title: activity.title,
                instructions: activity.instructions,
                selectedTypes: activity.selectedTypes,
                selectedMoodle: activity.selectedMoodle,
                selectedAlignments: activity.selectedAlignments,
                mode: activity.mode,
                duration: activity.duration,
                group: activity.isGroup
            }))
        }))
    };

    const jsonData = JSON.stringify(data, null, 2);
    const filename = slugify(course.title);

    const blob = new Blob([jsonData], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${filename}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
};
</script>

<template>
    <Page class="h-full">
        <template #page-header>
            <PageHeader section-title="Publish" />
        </template>
        <div class="flex justify-center items-center h-full">
            <div class="flex gap-3">
                <div class="p-5 bg-white border w-56 rounded-lg flex flex-col gap-10 items-center justify-between">
                    <Image file-name="moodle.png" class="w-32" alt="University of Portsmouth Logo"/>
                    <Pbutton solid label="Publish to Moodle" />
                </div>
                <div class="p-5 bg-white border w-56 rounded-lg flex flex-col gap-10 items-center justify-between">
                    <DocumentArrowDownIcon class="w-32 h-32 p-6 text-teal-600" />
                    <Pbutton solid @click="exportJSON()" label="Save to file">

                    </Pbutton>
                </div>

            </div>
        </div>
    </Page>
</template>