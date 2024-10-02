<script setup>
import { onBeforeMount, ref } from 'vue';

// Define props
const props = defineProps({
    getString: String,
    altString: String,
})

// establish build mode or not
const buildMode = ref(process.env.NODE_ENV === 'production');

// Define reactive variables to store the language strings
const fetchedString = ref('');

// Check if the environment is production and load core/str using RequireJS only in build
onBeforeMount(() => {
    if (buildMode.value) {
        // Only run in production (during build)
        require(['core/str'], function (str) {
            str.get_string(props.getString, 'local_moddesigner').done(function (result) {
                fetchedString.value = result;
            });
        });
    } else {
        // Optionally, provide a fallback string during development
        fetchedString.value = props.altString || 'Development mode: string not loaded';
    }
});



</script>

<template>
    <span v-if="fetchedString">{{ fetchedString }}</span>
    <span v-else>{{ altString }}</span>
</template>