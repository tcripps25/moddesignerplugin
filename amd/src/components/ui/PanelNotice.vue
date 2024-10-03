<script setup>
import { InformationCircleIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/solid';
import Image from '../helpers/Image.vue';
const props = defineProps({
    info: Boolean,
    warning: Boolean,
    enable: Boolean,
    sidebar: Boolean,
});
</script>

<template>
    <div class="flex flex-col gap-2 p-3 bg-gradient-to-t mt-7 to-white px-5" :class="{
        'from-blue-50 border-blue-100 text-blue-900': info || !info,
        'from-red-50 border-red-100 text-red-900': warning,
        'from-teal-50 border-teal-100 text-teal-900': enable,
    }, sidebar ? '-mx-5 border-t' : 'border rounded'">
        <Image file-name="enable-sm.png" v-if="enable" alt="Enable Logo"
            class="w-24 h-max -mt-6 p-1 mb-2 bg-white rounded shadow" />
        <ExclamationTriangleIcon v-else-if="warning" class="w-7 h-7 -mt-7 text-red-400" />
        <InformationCircleIcon v-else class="w-7 h-7 -mt-7 text-blue-400" />
        <p class="pb-5 text-sm">
            <slot />
        </p>
    </div>
</template>