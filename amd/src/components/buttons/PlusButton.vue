<script setup>
import Button from 'primevue/button';
import { PlusIcon } from '@heroicons/vue/16/solid';

const props = defineProps({
    title: String,
})

</script>

<template>
    <Button unstyled text :title="title" :aria-label="title"
        pt:root="p-1 text-sky-600 flex justify-center rounded hover:bg-slate-100" pt:label="hidden">
        <template #icon>
            <PlusIcon class="w-5 h-5" />
        </template>
    </Button>
</template>