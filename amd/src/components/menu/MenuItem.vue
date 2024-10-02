<script setup>
import { ChevronDownIcon } from '@heroicons/vue/16/solid';
import { RouterLink } from 'vue-router';
const props = defineProps({
  item: Object,
});
</script>

<template>
  <RouterLink v-if="item.route" v-slot="{ href, navigate }" :to="item.route" :title="item.label"
    :aria-expanded="item.active" :aria-controls="item.child"
    exact-active-class="text-sky-800 bg-slate-200 font-semibold shadow-sm " active-class="font-semibold "
    class="group hover:bg-slate-200 gap-2 flex p-2 rounded items-center "
    :class="item.week ? 'ml-5 before:content-[\'\'] before:w-[.35rem] before:h-[.35rem] before:absolute before:bg-slate-400 before:rounded-full before:left-[.62rem] before:z-10' : '', { 'before:!bg-sky-800': $route.path === item.route && item.week }">
    <div class="flex justify-between items-center truncate w-full">
      <div>
        <span v-if="item.icon" class="mr-2" :class="item.icon, { 'text-sky-800': $route.path === item.route }"></span>
        <span class="truncate">{{ item.label }}</span>
      </div>
      <ChevronDownIcon v-if="item.child" class="h-5 w-5  transition" :class="item.active ? 'rotate-18' : ''" />
    </div>
  </RouterLink>
</template>