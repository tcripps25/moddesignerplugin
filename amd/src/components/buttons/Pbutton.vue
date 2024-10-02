<script setup>
import { computed } from 'vue';
import Button from 'primevue/button';
import SplitButton from 'primevue/splitbutton';

const props = defineProps({
    label: String,
    ariaLabel: String,
    title: String,
    solid: Boolean,
    disabled: Boolean,
    trailing: Boolean,
    menuLink: Boolean,
    ghost: Boolean,
    outline: Boolean,
    reverse: Boolean,
    icon: String,
    severity: String,
    rounded: Boolean,
    badge: String,
    items: Object,
    card: Boolean,
})

const computedRootClasses = computed(() => {
    return [
        'items-center',
        'p-1',
        'transition',
        'flex',
        'gap-1',
        'text-sm',
        props.label ? 'px-3 py-2 font-medium' : '',
        props.solid ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-sky-50 hover:from-blue-500 hover:to-purple-500' : 'text-sky-800 hover:bg-sky-700/10',
        props.solid && (props.severity == "info") ? 'bg-teal-400 text-teal-900 hover:bg-teal-300' : '',
        props.trailing ? 'flex-row-reverse' : 'flex-row',
        props.menuLink ? 'pl-1 gap-2 !w-48 justify-start' : 'justify-center',
        props.ghost ? 'bg-sky-700/10 dark:bg-white/10 dark:hover:bg-white/50 text-sky-700 dark:text-sky-200 hover:bg-sky-700/20 dark:hover:bg-sky-300/20' : '',
        props.outline ? 'border-2 border-sky-700 hover:bg-sky-700 hover:text-sky-50' : '',
        props.reverse ? 'text-sky-50' : '',
        props.rounded ? 'rounded-full' : 'rounded',
        props.card ? 'w-full' : 'w-max',
        props.disabled ? 'disabled:bg-sky-700/10 disabled:dark:bg-white/10' : '',
    ].join(' ');
});

</script>

<template>
    <SplitButton v-if="items" :disabled="disabled" :pt:pcButton:root="computedRootClasses"
        :pt:pcDropdown:root="computedRootClasses" :model="items" :label="label"
        :aria-label="ariaLabel ? ariaLabel : label">

    </SplitButton>
    <Button v-else :severity="severity" :badge="badge" :icon="icon" :disabled="disabled" :label="label"
        :title="ariaLabel ? ariaLabel : label" :pt:root="computedRootClasses"
        :pt:pcBadge="solid ? '!bg-purple-500 text-purple-50' : '!bg-slate-300 text-slate-900'"
        :pt:label="label ? '' : 'hidden'">

        <template #icon>
            <slot name="icon">
            </slot>
        </template>
    </Button>


</template>