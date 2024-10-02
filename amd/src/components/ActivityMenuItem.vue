<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { computed, ref } from 'vue';
const props = defineProps({
    item: Object,
    index: Number,
    weekIndex: Number,
})

const route = useRoute();
const isActive = computed(() => route.path === props.item.route);

const listNumber = ref(props.index + 1)
</script>

<template>
    <RouterLink class="group" :to="item.route">
        <div class="rounded p-2 w-48"
            :class="isActive ? 'text-sky-50 bg-gradient-to-br from-sky-600 to-purple-600 shadow-sm' : ' group-hover:bg-slate-100 '">
            <div class="text-sm flex gap-2 items-center"><span v-if="listNumber">{{ listNumber }}.</span>
                <div v-if="$slots.icon" :class="isActive ? '!text-sky-50' : 'text-purple-600'">
                    <slot name="icon" />
                </div>
                <span class="text-sm block overflow-hidden whitespace-nowrap text-ellipsis">{{ item.label }}</span>
            </div>
        </div>
    </RouterLink>
</template>