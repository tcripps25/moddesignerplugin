<script setup>
import InfoButton from '@/components/buttons/InfoButton.vue'

const props = defineProps({
    for: String,
    title: String,
    infoText: String,
    infoTitle: String,
})
</script>

<template>
    <div class="flex gap-1 items-center">
        <label :for="for" class="w-max">{{ title }}</label>
        <InfoButton v-if="infoText" :help-title="infoTitle">
            {{ infoText }}
        </InfoButton>
    </div>
</template>