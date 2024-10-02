<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import OpenAI from "openai";
import Activity from '@/classes/Activity';
import { useCourseStore } from '@/stores/course.js'
import Textarea from 'primevue/textarea';
import { SparklesIcon } from '@heroicons/vue/24/solid';
import EnableLogo from '@/assets/enable-sm.png'
import Pbutton from '@/components/buttons/Pbutton.vue';
const props = defineProps({
    weekIndex: Number
});
const visible = ref(false)
const course = useCourseStore();
const prompt = ref('');
const response = ref(null);
const openai = new OpenAI({ apiKey: course.key, dangerouslyAllowBrowser: true });
const loading = ref(false);

// Function to convert array of objects to comma-separated string of values
function convertToCommaSeparatedString(arr) {
    return arr.map(item => item.value).join(', ');
}
// Function to find objects by their values
function findMoodleActivityByValue(arr, values) {
    return arr.filter(item => values.includes(item.value));
}
const moodleList = convertToCommaSeparatedString(course.moodleActivities)

async function main() {
    response.value = ''; // Clear previous response
    loading.value = true; // Set loading to true
    const userPrompt = prompt.value;

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: ('You are a University Learning Designer in a UK higher education institution. You exist to help Academic staff to create activities as part of a Module design process, these activities follow pedagogic principles, and are aimed at University level students. You may get asked to create activities for Level 4 (first year undergraduates) Level 5 (Second year undergraduates) Level 6 (Third year undergraduates) or Post Graduate audiences, so you must tailor the complexity of the task to match the request. Tasks may have an associated Moodle activity, or they may be offline, you will have to decide what is appropriate. You must return the answer only and only in json format. The required structure for the JSON is as follows: title (no more than 5 words), instructions (These should take into account all other parameters, and include mention of the selected Moodle Activity and how it will be used. This should be written as instructions for the student.), duration (think realistically how long such a teaching activity would take, considering all the other parameters in this request. return this in mins), isGroup (Whether the activity is conducted by students in groups or not, true or false), mode (Async or Sync activity, does everyone have to participate at the same time?), type (one or more in an array) of the six learning types, and only the following types: Acquisition, Collaboration, Discussion, Investigation, Practice, Production), selectedMoodle (choose none, one or more appropriate Moodle activities from this list and only from this list: ' + moodleList + ' If you would like to assess students in an online exam, select Wiseflow as this is the Institutions selected assessment platform. If an activity is selected make sure the intended use by students is referenced in the instructions, specifying what the activity is to be used for. If a Moodle activity is not required then do not select one and ensure that the Mode is compatible with the selected Moodle activity type.)') },
                { role: "user", content: userPrompt }
            ],
            model: "gpt-3.5-turbo",
            response_format: { "type": "json_object" },
        });


        const responseObject = JSON.parse(completion.choices[0].message.content);


        if (responseObject.title) {
            const gptActivity = new Activity();
            gptActivity.title = responseObject.title;
            gptActivity.duration = responseObject.duration
            gptActivity.instructions = responseObject.instructions
            gptActivity.isGroup = responseObject.isGroup
            gptActivity.mode = responseObject.mode
            gptActivity.selectedTypes = responseObject.type
            gptActivity.selectedMoodle = findMoodleActivityByValue(course.moodleActivities, responseObject.selectedMoodle)
            console.log(responseObject.selectedMoodle);
            course.weeks[props.weekIndex].activities.push(gptActivity);
            visible.value = false
        } else {
            console.error('Response object does not contain title:', responseObject);
            response.value = 'An error occurred: Response does not contain title.';
        }

    } catch (error) {
        console.error('Error fetching data from OpenAI:', error);
        response.value = 'An error occurred while fetching the response.';
    } finally {
        loading.value = false; // Set loading to false
    }
}


</script>

<template>
    <Pbutton v-if="course.key" label="Activity Assistant" @click="visible = true">
        <template #icon>
            <SparklesIcon class="h-5 w-5" />
        </template>
    </Pbutton>

    <Dialog v-model:visible="visible" modal header="Activity Assistant" :style="{ width: '25rem' }">
        <template #header>
            <div class="flex items-center gap-2 ">
                <SparklesIcon class="h-5 w-5 text-teal-400" />
                <div class="flex gap-2 items-center">

                    <h1 class="font-medium text-lg text-teal-800">Activity Assistant</h1>
                </div>
            </div>
        </template>
        <div class="flex flex-col gap-2">
            <label for="activity-assistant-prompt" class="text-sm"> Enter a prompt to generate an activity</label>
            <Textarea id="activity-assistant-prompt" class="p-2" v-model="prompt"
                placeholder="Enter your Activity prompt"></Textarea>
            <Button :loading="loading" class="bg-sky-600 hover:bg-sky-500" @click="main" label="Generate Activity" />
            <div v-if="response">
                <h2>Response:</h2>
                <p>{{ response }}</p>
            </div>
        </div>
    </Dialog>

</template>
