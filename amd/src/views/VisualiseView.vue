<script setup>

import PageHeader from '@/components/PageHeader.vue';
import { useCourseStore } from '@/stores/course.js'

import Page from '@/components/Page.vue'
import LineChart from '@/components/charts/LineChart.vue';
import Panel from '@/components/ui/Panel.vue';
import PieChart from '@/components/charts/PieChart.vue';
import TabPanel from 'primevue/tabpanel';
import TabView from 'primevue/tabview';
import ModulePreview from '@/components/ModulePreview.vue';
const course = useCourseStore()
</script>

<template>
  <div>

    <Page>
      <template v-slot:page-header>
        <PageHeader title="Module Overview" section-title="Visualise" />
      </template>
      <!-- <ModulePreview /> -->

      <div class="grid sm:grid-cols-1 2xl:grid-cols-3 gap-6">
        <Panel :title="'Activities per week'" class="col-span-2">
          <LineChart :datax="course.weekNames" :datay="course.activitiesPerWeek">
            <p class="mb-3">The number of Activities you have allocated to each week.</p>
            <div class="flex py-1 mb-2">
              <p class="grow flex flex-col">
                Total Activities:
                <span class="text-2xl font-semibold">{{ course.totalActivities }}</span>
              </p>
              <p class="text-small grow flex flex-col">
                Weeks:
                <span class="text-2xl font-semibold">{{ course.numberOfWeeks }}</span>
              </p>
            </div>
          </LineChart>
        </Panel>

        <Panel :title="'Module Learning Type Mix'">
          <TabView>
            <TabPanel header="Pie Chart">
              <PieChart :dataseries="course.activityTypeCount" :datalabels="course.activityTypes"
                :colors="course.activityColors" title="Learning Types Module Overview" id="learning-types-overview">
                <p class="mb-3">This chart shows an overview of the Learning Types you have used across all weeks of
                  your
                  Course.</p>
              </PieChart>
            </TabPanel>
            <TabPanel header="Values">

              <div v-for="(val, index) of course.activityTypeColorAndCount" :key="index">
                <Panel class="overflow-hidden">
                  <div class="flex flex-col gap-1 bg-white/70 backdrop-blur-sm rounded p-2">
                    <span class="text-md font-semibold">{{ val.type }}</span>
                    <div class="font-semibold text-xl items-baseline gap-1 flex">
                      {{
                        val.percentage
                      }}<span class="font-normal text-sm ">%</span></div>
                  </div>

                  <div class="h-12 -my-5 -mx-5 p-3 flex items-center justify-center "
                    :style="{ backgroundColor: `${val.color}` }">
                  </div>

                </Panel>
              </div>
            </TabPanel>
            <TabPanel header="Header III">
              <p class="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
                provident, similique sunt in culpa qui
                officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et
                expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus.
              </p>
            </TabPanel>
          </TabView>


        </Panel>

      </div>
    </Page>
  </div>
</template>
