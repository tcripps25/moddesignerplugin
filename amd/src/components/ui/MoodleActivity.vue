<script setup>

import Pbutton from '../buttons/Pbutton.vue';
import { PlusCircleIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/vue/16/solid';

const props = defineProps({
  moodleActivity: Object,
  activity: Object,
  selected: Boolean,
});

</script>

<template>
  <div class="flex items-center gap-1">
    <div v-if="selected">
      <Pbutton aria-label="Move item up">
        <template #icon>
          <ArrowUpIcon class="h-4 w-4" />
        </template>
      </Pbutton>
      <Pbutton aria-label="Move item down">
        <template #icon>
          <ArrowDownIcon class="h-4 w-4" />
        </template>
      </Pbutton>
    </div>
    <Pbutton :disabled="selected" :class="selected ? '!w-full cursor-move hover:shadow-sm hover:ring-2' : ''" trailing
      ghost :label="moodleActivity.type ? moodleActivity.name + ' (' + moodleActivity.type + ')' : moodleActivity.name"
      @click="$emit('activityClicked')">
      <template v-if="!selected" #icon>
        <PlusCircleIcon class="w-4 h-4" />
      </template>
    </Pbutton>
    <Pbutton v-if="selected" aria-label="Remove activity" @click="$emit('removeClicked')">
      <template #icon>
        <TrashIcon class="w-4 h-4 text-red-600" />
      </template>
    </Pbutton>
  </div>
</template>
