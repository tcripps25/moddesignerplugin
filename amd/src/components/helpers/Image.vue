<script setup>
import { getCurrentInstance, ref } from 'vue';

const props = defineProps({
    fileName: String,
    alt: String,
    classes: String,
})

// Access global property
const siteRoot = getCurrentInstance().appContext.config.globalProperties.$siteRoot;

// Dynamic import for image
const image = ref(`${siteRoot}/local/moddesigner/amd/src/assets/${props.fileName}`);
</script>

<template>
 <img :src=image :class="classes" :alt="alt" />
</template>