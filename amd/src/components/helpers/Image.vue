<script setup>
import { getCurrentInstance, ref } from 'vue';

const props = defineProps({
    fileName: String,
    alt: String,
    classes: String,
});

// Access global property
const siteRoot = getCurrentInstance().appContext.config.globalProperties.$siteRoot;

// Check if in development mode
const isDev = import.meta.env.MODE === 'development';

// Set different URLs based on the environment
const image = ref(
    isDev
        ? `./src/assets/${props.fileName}` // Dev URL
        : `${siteRoot}/local/moddesigner/amd/src/assets/${props.fileName}` // Prod URL
);
</script>

<template>
    <img :src="image" :class="classes" :alt="alt" />
</template>