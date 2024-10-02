<script setup>
import { ref } from 'vue';
import Popover from 'primevue/popover';
import Pbutton from '../buttons/Pbutton.vue';
import { QuestionMarkCircleIcon } from '@heroicons/vue/16/solid';
const props = defineProps({
    title: String,
})

const helpPanel = ref();

const toggleHelpPanel = (event) => {
    helpPanel.value.toggle(event);
}
</script>

<template>


    <Pbutton ghost rounded severity="info" aria-label="Help" type="button" @click="toggleHelpPanel">
        <template #icon>
            <QuestionMarkCircleIcon class="w-5 h-5 text-sky-600" />
        </template>

    </Pbutton>

    <Popover ref="helpPanel">
        <div class="max-w-2xl">
            <h4 class="text-lg font-medium">{{ title }}</h4>
            <slot></slot>
        </div>
    </Popover>


</template>