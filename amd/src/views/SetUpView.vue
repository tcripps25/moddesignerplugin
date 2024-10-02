<script setup>
import { ref } from 'vue';
import PageHeader from '@/components/PageHeader.vue'
import Page from '@/components/Page.vue';
import Panel from '@/components/ui/Panel.vue';
import PanelNotice from '@/components/ui/PanelNotice.vue'
import { useCourseStore } from '@/stores/course.js'
import DatePicker from 'primevue/datepicker';
import InputText from 'primevue/inputtext';
import { PencilIcon } from '@heroicons/vue/16/solid';
import FloatLabel from 'primevue/floatlabel';
import Fieldset from 'primevue/fieldset';

const course = useCourseStore()

const editTitle = ref(false);
const courseTitle = ref('');
const courseCode = ref('M20529');
const toggleTitleEdit = () => {
  editTitle.value = !editTitle.value;
};


const submitTitle = () => {
  if (courseTitle.value.trim() !== '') {
    course.title = courseTitle.value.trim();
    editTitle.value = false;
  }
};
</script>

<template>
  <div>

    <Page>
      <template v-slot:page-header>
        <PageHeader sectionTitle="Set Up" :title="'Basic Information'" />
      </template>

      <div class="max-w-4xl mx-auto flex flex-col gap-5">
        <Panel collapse :title="'Module Information'">
          <template v-slot:subtitle>
            <p>Basic information about your Module.</p>
          </template>
          <Fieldset legend="Enter Module Information">
            <div class="flex flex-col gap-9 mt-5">
              <div class="flex flex-col gap-2 w-full">
                <div class="flex gap-2 items-center">
                  <FloatLabel class="w-full">
                    <InputText type="text" id="module-title-input" v-model="course.title" @keyup.enter="submitTitle"
                      class="w-full" />
                    <label for="module-title-input">
                      Module title
                    </label>
                  </FloatLabel>
                </div>

              </div>

              <div class="flex items-center gap-2">
                <FloatLabel class="w-full">
                  <InputText id="module-code-input" v-model="courseCode" type="text" class="w-54" />
                  <label for="module-code-input">Module Code</label>
                </FloatLabel>
              </div>
              <div class="flex items-center gap-2">
                <FloatLabel class="w-full">
                  <DatePicker v-model="course.startDate" input-id="module-start-date-input" />
                  <label for="module-start-date-input" class="font-normal">Start Date</label>
                </FloatLabel>

              </div>
            </div>
          </Fieldset>
        </Panel>
        <Panel collapse :title="'Learning Outcomes'">
          <template v-slot:subtitle>
            <p>Learning outcomes information drawn from the SITS database.</p>
          </template>
          <PanelNotice info>
            Learning Outcomes are unable to be modified directly from Module Designer.
          </PanelNotice>
          <Fieldset disabled legend="Check Learning Outcomes">
            <div class="flex flex-col gap-9 pt-5">
              <div v-for="(outcome, index) in course.learningOutcomes">
                <FloatLabel class="w-full">
                  <InputText disabled :id="'learning-outcome' + index + '-input'" v-model="outcome.label" type="text"
                    class="w-full" />
                  <label :for="'learning-outcome' + index + '-input'">Learning Outcome {{ index + 1 }}</label>
                </FloatLabel>
              </div>
            </div>
          </Fieldset>
          <div class="flex justify-end mt-3 text-sm">
            <a title="Report an error in Learning Outcome
            Information" class="text-blue-600 underline underline-offset-4" href="#">Report an error in Learning
              Outcome
              Information</a>
          </div>
        </Panel>
        <Panel collapse :title="'Assessments'">
          <template v-slot:subtitle>
            Assessments shown below have been populated automatically.
          </template>
          <PanelNotice info>
            If you prefer to refer to your assessments with a more memorable name, you can choose to add
            an alternative title in the field(s) below.
          </PanelNotice>
          <Fieldset legend="Set Assessment Name">
            <div class="flex flex-col gap-9 pt-5">
              <div v-for="(assessment, index) in course.assessments">
                <FloatLabel class="w-full">
                  <InputText :id="'assessment- ' + index + '-nickname-input'" v-model="assessment.nickname" type="text"
                    class="w-full" />
                  <label :for="'assessment- ' + index + '-nickname-input'">Alternative title for {{
                    assessment.label }} </label>
                </FloatLabel>
              </div>
            </div>
          </Fieldset>
        </Panel>
      </div>
    </Page>
  </div>
</template>