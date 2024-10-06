<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import InfoPanel from './InfoPanel.vue';
import Pbutton from '../buttons/Pbutton.vue';
import { ChevronRightIcon } from '@heroicons/vue/16/solid';
import { slugify } from '@/utils/utils';
const props = defineProps({
    title: String,
    borderless: Boolean,
    flush: Boolean,
    sidebar: Boolean,
    stickyHeader: Boolean,
    removeHeadUnderline: Boolean,
    headerBar: Boolean,
    card: Boolean,
    collapse: Boolean,
    link: String,
    restrictContent: Boolean,
});

const titleSlug = () => {
    if (props.title) {
        return slugify(props.title)
    }
}
const helpVisible = ref(true)

const toggleHelpVisible = () => {
    helpVisible.value = !helpVisible.value
}

const sectionVisible = ref(true);

const toggleSection = () => {
    sectionVisible.value = !sectionVisible.value
}
</script>



<template>
    <div class="flex gap-2">
        <div class="" v-if="$slots.outsidelhcontent">
            <slot name="outsidelhcontent" />
        </div>
        <div class="grow max-w-7xl w-full"
            :class="sidebar ? 'bg-transparent !w-auto -mx-10 px-10 pt-5 rounded-none' : 'mb-5 mx-auto', card ? 'p-5 rounded-lg shadow' : ''">
            <div :class="{ 'sticky top-0 bg-white': stickyHeader }, removeHeadUnderline ? 'border-none mb-0' : 'border-b-2 mb-5', headerBar ? 'bg-slate-100 mb-3 -m-5 px-5 py-3 ' : 'py-2'"
                class="flex justify-between items-center rounded-t" v-if="$slots.title || title || $slots.action">
                <div class="flex items-start">
                    <Pbutton v-if="collapse" :aria-label="sectionVisible ? 'Collapse ' + title : 'Collapse ' + title"
                        class="mr-1" :class="headerBar ? '-ml-3' : ''" @click="toggleSection()"
                        :aria-expanded="sectionVisible ? true : false" :aria-controls="titleSlug() + '-panel-content'">
                        <template #icon>
                            <ChevronRightIcon class="w-5 h-5 transition text-slate-500"
                                :class="sectionVisible ? 'rotate-90' : 'rotate-0'" />
                        </template>
                    </Pbutton>
                    <div class="flex gap-2">
                        <slot v-if="$slots.title || title" name="title">
                            <RouterLink v-if="title && link" class="hover:underline" :to="link">
                                <h2 class="text-lg font-semibold text-slate-600 ">{{ title }}</h2>
                            </RouterLink>
                            <h2 v-else class="text-lg font-semibold text-slate-600 ">{{ title }}</h2>
                        </slot>
                        <InfoPanel v-if="$slots.info">
                            <slot name="info"></slot>
                        </InfoPanel>
                    </div>
                </div>
                <!-- title usage without using props -->
                <div class="ml-auto flex gap-1 items-center" v-if="$slots.action">
                    <slot v-if="$slots.action" name="action" />
                </div>

            </div>
            <div :id="titleSlug() + '-panel-content'" v-show="sectionVisible">
                <div v-if="$slots.subtitle" class="mb-5">
                    <slot name="subtitle" />
                </div>

                <div class="flex grow gap-10 relative transition-all">
                    <Transition name="left" mode="out-in">
                        <div v-if="$slots.lhcontent" class="max-w-72 block">
                            <slot name="lhcontent" />
                        </div>
                    </Transition>
                    <div class="grow" :class="restrictContent ? 'max-w-2xl' : ''">
                        <slot></slot>
                    </div>
                    <Transition name="right" mode="out-in">
                        <div v-if="$slots.rhcontent" class="max-w-72 block">
                            <slot name="rhcontent" />
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
        <div v-if="$slots.outsiderhcontent">
            <slot name="outsiderhcontent" />
        </div>
    </div>
</template>

<style scoped>
.left-enter-active {
    transition: all 0.2s ease-out;
    transition-delay: 0.25s;
}

.left-leave-active {
    transition: all 0.2s ease-out;
}

.left-enter-from,
.left-leave-to {
    opacity: 0;
    transform: translateX(-10px);
}

.right-enter-active,
.right-leave-active {
    transition: opacity 0.2s ease-out;
}

.right-enter-from,
.right-leave-to {
    opacity: 0;
    transform: translateX(10px);
}
</style>