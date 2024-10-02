<script setup>
import { computed, watch, ref } from 'vue';
import { ChevronRightIcon, ChevronLeftIcon, CloudArrowDownIcon } from '@heroicons/vue/16/solid';
import Pbutton from '../buttons/Pbutton.vue';


const props = defineProps({
    title: String,
});


const show = ref(true)

const ToggleShow = () => {
    show.value = !show.value
}


</script>

<template>


    <div class="bg-white border-l p-5 flex-none overflow-y-auto overflow-x-hidden max-w-[26rem] min-w-[26rem] flex flex-col gap-4 transition-all duration-300 shrink-0"
        :class="{ '!max-w-[4.5rem] min-w-[4.5rem]': !show }">

        <div id="sidebar-header">
            <div class="flex justify-between items-start">
                <div class="flex gap-1 mb-5">
                    <!-- Button for the stats bar  -->
                    <Pbutton @click="ToggleShow" aria-label="Toggle Insights">
                        <template #icon>
                            <Transition name="fade">
                                <ChevronRightIcon v-if="show" class="h-5 w-5" />
                                <ChevronLeftIcon v-else class="h-5 w-5" />
                            </Transition>
                        </template>
                    </Pbutton>
                </div>
                <div v-if="show" class="flex gap-1 items-center">
                    <h3 class="text-xl font-semibold">{{ title }}</h3>
                </div>
                <!-- Download Insights Button  -->
                <Pbutton v-if="show" aria-label="Download Insights" title="Download Insights">
                    <template #icon>
                        <CloudArrowDownIcon class="h-5 w-5" />
                    </template>
                </Pbutton>
            </div>
        </div>
        <div v-if="show" id="sidebar-internal-container">
            <slot></slot>
        </div>
    </div>


</template>

<style scoped>
.fade-leave-active,
.fade-enter-active {
    transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    position: absolute;
}

.slide-fade-leave-active,
.slide-fade-enter-active {
    transition: all 0.2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    margin-right: -26rem;
    opacity: 0;
    position: absolute;
}
</style>