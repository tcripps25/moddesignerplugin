<script setup>
import { ref } from 'vue';
import Week from './Week.vue';
import Panel from './ui/Panel.vue';
import { useCourseStore } from '@/stores/course.js'
import MoodlePreviewSidebar from './sidebars/MoodlePreviewSidebar.vue';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import TipBox from '@/components/ui/TipBox.vue'
import Pbutton from './buttons/Pbutton.vue';
import { EllipsisHorizontalIcon } from '@heroicons/vue/16/solid'
import { CheckCircleIcon, ChevronDownIcon, PlusCircleIcon } from '@heroicons/vue/24/solid';
import DetailSidebar from '@/components/ui/DetailSidebar.vue'
import Page from './Page.vue';
import PageHeader from './PageHeader.vue';
import ActivityClass from '@/classes/Activity';
import { PencilIcon, PlusIcon } from '@heroicons/vue/16/solid';
import ActivityLabel from './forms/ActivityLabel.vue';
import WeekStatsSidebar from './sidebars/WeekStatsSidebar.vue';


const props = defineProps({
  week: Object,
  index: Number
});


const course = useCourseStore();




const addDescActive = ref(false);

const toggleAddDescActive = () => {
  addDescActive.value = !addDescActive.value
}

const editTitle = ref(false)

const toggleEditTitle = () => {
  editTitle.value = !editTitle.value
}


</script>

<template>
  <Page class="grow relative" sidebar-title="Week Breakdown">
    <template #page-header>
      <PageHeader sectionTitle="Design" title="Module Schedule" :subtitle="week.name" />
    </template>

    <template #sidebar>
      <WeekStatsSidebar :week-index="index" />
      <MoodlePreviewSidebar :week="week" :week-index="index" />
    </template>

    <Panel restrict-content collapse title="General Information">
      <template #rhcontent>
        <TipBox right-col>
          Both Week Name and Week description will appear on your Moodle module for students to see.
        </TipBox>
      </template>
      <div class="flex flex-col gap-3 mb-10 ">
        <ActivityLabel label="Week name" targetId="week-name" help="Enter a name for this week.">
          <InputText v-model="week.name" id="week-name" />
        </ActivityLabel>
        <ActivityLabel label="Week description" targetId="week-description"
          help="Describe the aims of this week to your students.">
          <Textarea autoResize rows="5" v-model="week.description" id="week-description" />
        </ActivityLabel>
      </div>
    </Panel>
    <Week v-if="week" :week="week" :week-index="index" />
    <div v-else class="">
      <Panel title="Not found">
        <p>Selected Week can't be found, navigate to 'Set Up' and then refresh the page.</p>
      </Panel>
    </div>

  </Page>


</template>
