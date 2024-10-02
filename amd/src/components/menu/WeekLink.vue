<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { PlayIcon } from '@heroicons/vue/16/solid';
import { useRoute } from 'vue-router';
import RemoveWeekButton from '@/components/buttons/RemoveWeekButton.vue';
import MoveWeekButton from '@/components/buttons/MoveWeekButton.vue'

const props = defineProps({
  week: Object,
  index: Number,
});

const route = useRoute();

const to = computed(() => `/schedule/${props.index}`);
const isActiveLink = computed(() => route.path === to.value);


</script>

<template>
  <li class="flex justify-between group items-center ml-8 hover:bg-slate-200 rounded group transition relative">
    <div
      class="w-1 h-full absolute bg-slate-300 transition-all -translate-x-5 bg-gradient-to-b from-slate-300 to-slate-300"
      :class="{ 'via-sky-600': isActiveLink }">
    </div>
    <RouterLink :to="to" :active-class="'aria-current:font-semibold'"
      :class="['transition peer-hover:bg-slate-300 flex gap-3 p-2 items-center grow peer', $attrs.class]"
      v-bind="$attrs">

      <div class="flex w-full">
        <div class="flex items-center">
          <div
            class="h-7 w-7 flex transition-all text-sm justify-center items-center text-slate-500 font-medium rounded-full absolute bg-white border-4 border-slate-300 -translate-x-10"
            :class="{ '!border-sky-600 !bg-sky-600 !text-sky-50 !font-medium scale-105 shadow': isActiveLink }">
            <div><span class="sr-only">Week Number</span>{{ index + 1 }}</div>
          </div>
        </div>
        <div class="flex flex-col grow">
          <div class="flex justify-between items-center">
            <div class="max-w-28 whitespace-nowrap text-ellipsis overflow-hidden">{{ week.name || 'Week ' + (index + 1)
              }}
            </div>
            <div class="text-xs text-slate-500 font-normal group-hover:hidden">{{ week.activities.length }}</div>
          </div>
          <div class="flex gap-2 justify-start text-xs font-normal items-center text-slate-500">
            <span class="">{{ week.formattedDate }}</span>
          </div>
        </div>
      </div>



    </RouterLink>

    <div
      class="absolute right-0 group-hover:opacity-100 opacity-0 transition flex items-center bg-slate-200 rounded mr-2">
      <MoveWeekButton :index="index" class="" />
      <RemoveWeekButton :index="index" class="" />
    </div>

  </li>
</template>