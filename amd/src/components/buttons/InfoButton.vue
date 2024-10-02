<script setup>
import { ref } from 'vue';
import { InformationCircleIcon } from '@heroicons/vue/24/solid'
import Button from 'primevue/button';
import Popover from 'primevue/popover';

const props = defineProps({
    helpTitle: String,
});

const helpText = props.helpTitle ? props.helpTitle : "See more information";


const infoModal = ref(null);

// Function to show the OverlayPanel
const showInfoModal = (event) => {
    infoModal.value.toggle(event);
};
</script>

<template>
    <Button size="small" text @click="showInfoModal" :title="'See more information about ' + helpTitle"
        aria-label="Information">
        <template #icon>
            <InformationCircleIcon id="info-icon" class="w-4 h-4" />
        </template>
    </Button>

    <Popover ref="infoModal">
        <div class="flex flex-col gap-2 max-w-xs bg-white text-sm">
            <slot></slot>
        </div>
    </Popover>
</template>