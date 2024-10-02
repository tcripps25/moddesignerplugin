<script setup>
import { ref } from 'vue';
// Define props
const props = defineProps({
  sectionTitle: String,
  title: String,
  subtitle: String,
  message: String
})

const menu = ref(['Set Up', 'Schedule'])
</script>
<template>

  <div
    class="z-10 dark:bg-zinc-800 border-slate-200 dark:border-zinc-800 flex justify-between mb-3 flex-col bg-slate-100 -m-5 px-5 border-b py-3">

    <div v-if="sectionTitle" class="flex justify-between">
      <h1 class="font-semibold">
        {{ sectionTitle }}
      </h1>
    </div>

    <div class=" px-5 mt-2 -mx-5 relative">
      <div class="flex justify-between items-center">
        <div class="flex gap-1 items-center text-xl font-semibold">
          <h1 class=" mb-0  flex gap-2 items-center " :class="subtitle ? 'text-slate-500' : 'text-slate-900'">{{ title
            }}</h1>
          <p v-if="subtitle" class="  text-slate-400">/</p>
          <h2 v-if="subtitle" class=" ">{{ subtitle }}</h2>
        </div>
        <div class="flex flex-col items-center">
          <p class="text-sm">{{ message }}</p>
        </div>

        <div class="flex gap-2">
          <slot></slot>
        </div>
      </div>
      <div v-if="$slots.toolbar" class="">
        <slot name="toolbar"></slot>
      </div>
    </div>
  </div>
</template>