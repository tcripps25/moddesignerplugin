<script setup>
import { useRoute, useRouter } from 'vue-router';
import { TransitionGroup, computed, onMounted } from 'vue';
import TipBox from './ui/TipBox.vue';
import { useCourseStore } from '@/stores/course.js'
import Pbutton from './buttons/Pbutton.vue';
import { RouterView } from 'vue-router';
import { EllipsisHorizontalIcon, ChevronDoubleUpIcon, ChevronDoubleDownIcon, PlusIcon, Squares2X2Icon } from '@heroicons/vue/16/solid';
import ScrollPanel from 'primevue/scrollpanel';
import ActivityMenuItem from '@/components/ActivityMenuItem.vue';
import Panel from './ui/Panel.vue';
import GptPanel from '@/ai/GptPanel.vue';
const route = useRoute();
const course = useCourseStore()
const router = useRouter();
// Define props
const props = defineProps({
  week: Object,
  weekIndex: Number,
  showTitle: Boolean,
});

const removeWeek = (weekIndex) => {
  course.weeks.splice(weekIndex, 1);
};



const handleRemoveActivity = (weekIndex, activityIndex) => {
  course.weeks[weekIndex].activities.splice(activityIndex, 1);
};


const panelTitle = computed(() => {
  return props.showTitle ? props.week.name : '';
});

const items = computed(() =>
  props.week.activities.map((activity, index) => ({
    route: `/design/schedule/${props.weekIndex}/${index}`,
    label: activity.title
  }))
);

const allActivitiesItem = computed(() => ({
  route: `/design/schedule/${props.weekIndex}`,
  label: 'All Activities',
}));

const noActivitySelected = computed(() => route.path === '/design/schedule/' + props.weekIndex);

</script>

<template>
  <Panel collapse :title="'Activities ' + '(' + week.activities.length + ')'">
    <template #action>
      <GptPanel :weekIndex="weekIndex" />
    </template>

    <template v-if="!noActivitySelected" #lhcontent>
      <div class="flex flex-col gap-3 justify-center items-center sticky top-0">
        <Pbutton @click="router.push('/design/schedule/' + props.weekIndex)" aria-label="View all Activities">
          <template #icon>
            <Squares2X2Icon class="w-5 h-5" />
          </template>
        </Pbutton>

        <Pbutton aria-label="Next Activity">
          <template #icon>
            <ChevronDoubleUpIcon class="w-5 h-5" />
          </template>
        </Pbutton>

        <Pbutton ghost rounded @click="course.addActivityToWeek(weekIndex)" aria-label="Add Activity">
          <template #icon>
            <PlusIcon class="w-5 h-5" />
          </template>
        </Pbutton>

        <Pbutton aria-label="Previous Activity">
          <template #icon>
            <ChevronDoubleDownIcon class="w-5 h-5" />
          </template>
        </Pbutton>
      </div>
    </template>

    <!-- Activity shown here -->

    <router-view v-slot="{ Component }">
      <Transition mode="out-in" name="fade">
        <component :is="Component" />
      </Transition>
    </router-view>
  </Panel>




</template>

<style scoped>
.fade-move,
.fade-enter-active {
  transition: all 0.2s ease-out;
  transition-delay: 0.25s;
}

.fade-leave-active {
  transition: all 0.2s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(.5rem);

}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;

}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
