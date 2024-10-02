<script setup>
import { computed, watch, ref } from 'vue';
import Week from './Week.vue';
import Panel from './ui/Panel.vue';
import PieChart from '@/components/charts/PieChart.vue';
import PanelNotice from '@/components/ui/PanelNotice.vue';
import { useCourseStore } from '@/stores/course.js'

import InputText from 'primevue/inputtext';
import Meter from '@/components/charts/Meter.vue';
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

import GptPanel from '@/ai/GptPanel.vue';
import ActivityLabel from './forms/ActivityLabel.vue';


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


const weekStats = computed(() => course.getActivityTypePercentagesForWeek(props.index));

watch(weekStats, (newStats) => {
  console.log('Week stats updated:', newStats);
});
</script>

<template>
  <Page class="grow relative" sidebar-title="Statistics">
    <template #page-header>
      <PageHeader sectionTitle="Design" title="Module Schedule" :subtitle="week.name" />
    </template>

    <template #sidebar>
      <Transition name="slide-fade">
        <div class="flex flex-col gap-10 divide-y">
          <Transition name="fade">
            <Panel borderless flush sidebar>
              <Meter title="Activity Duration" :values="course.getActivitiesForWeek(index)"
                :max="course.totalMinsInWeekActivities(index)">
                <p class="mb-3">Your total time for this week split by Activity.
                </p>
                <template #meter-badge>
                  <div class="flex gap-2 items-center justify-end rounded w-full">

                    <p class="text-lg font-medium text-teal-700">{{
                      course.totalMinsInWeekActivities(index) }} <span class="text-sm text-slate-600">Total
                        minutes</span>
                    </p>

                  </div>
                </template>
              </Meter>
            </Panel>
          </Transition>
          <Transition name="fade">
            <Panel borderless flush sidebar>
              <PieChart chartWidth="350" legendPosition="left" :dataseries="weekStats"
                :datalabels="course.activityTypes" :colors="course.activityColors" title="Learning Type Mix"
                :id="'week-' + (index + 1) + '-learning-types'">
                <p class="mb-3">An overview of the Learning Types you have used in this week of your course.
                </p>
              </PieChart>
              <PanelNotice sidebar enable>
                Breaking down the spread of Learning Types over the week can help you ensure you're providing the right
                mix for
                your students.
              </PanelNotice>
            </Panel>
          </Transition>
        </div>
      </Transition>
    </template>

    <Panel collapse title="General Information">

      <template #rhcontent>
        <TipBox right-col>
          Both Week Name and Week description will appear on your Moodle module for students to see.
        </TipBox>
      </template>
      <div class="flex flex-col gap-3 mb-10">
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
