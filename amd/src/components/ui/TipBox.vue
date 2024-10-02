<script setup>
import { ref } from 'vue';
import { gsap } from "gsap";
import { LightBulbIcon, XMarkIcon } from '@heroicons/vue/24/solid';
import LightBulbOutlineIcon from '@heroicons/vue/24/outline/LightBulbIcon';
import Pbutton from '../buttons/Pbutton.vue';

let ctx;

const props = defineProps({
    title: String,
    rightCol: Boolean,
});

const show = ref(false);

const toggleShow = () => {
    show.value = !show.value
}

const enterDirection = () => {
    if (props.rightCol) {
        return 20;
    } else {
        return 20;
    }
}

function onBeforeEnter(el) {
    ctx = gsap.context(() => {
        const direction = enterDirection();
        gsap.from(el, { x: direction, opacity: 0, duration: 0.2, ease: "power4.out", });
    })
}

function onEnter(el, done) {
    // You can add any additional logic here if needed during the enter phase
}
function onLeave(el, done) {
    done()
}

function onAfterLeave(el) {
    ctx.revert();
}
const id = ref(Date.now());

</script>

<template>
    <div class="sticky top-0">
        <Pbutton v-if="!show" @click="toggleShow" solid :aria-label="'Open tip panel'"
            class="max-w-full group !from-slate-700 !to-slate-800 hover:!from-slate-600 hover:!to-slate-700 p-2 !rounded-3xl rotate-45 w-max before:content-none shadow"
            :class="[
                rightCol ? ' mr-auto !rounded-es' : '!rounded-se ml-auto before:-right-1 ',
            ]">
            <template #icon>
                <LightBulbIcon class=" w-5 h-5 text-yellow-300 group-hover:opacity-100"
                    :class="show ? '' : '-rotate-45'" />
            </template>
        </Pbutton>
        <Transition :css="false" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave"
            @after-leave="onAfterLeave">
            <div v-if="show" :id="'tip-box-' + id"
                class="p-3 rounded-lg max-w-44 bg-gradient-to-br from-slate-600 to-slate-800 text-white shadow-sm before:content-[''] before:h-3 before:w-3 before:rounded-sm   before:absolute  before:top-4 before:rotate-45  before:-z-10 z-10"
                :class="rightCol ? 'mr-auto before:-left-1 before:bg-slate-600' : 'ml-auto before:-right-1 before:bg-slate-700'">
                <div>
                    <div class="flex gap-1 mb-2 -mt-1 -mx-1 justify-between items-center">
                        <div class="flex gap-1">
                            <LightBulbIcon class="w-5 h-5 !text-yellow-300" />
                            <h4 v-if="(title)" class="font-semibold text-sm">{{ title }}</h4>
                        </div>
                        <Pbutton @click="toggleShow" :aria-label="'Close tip panel'">
                            <template #icon>
                                <XMarkIcon class="h-5 w-5 text-slate-50" />
                            </template>
                        </Pbutton>
                    </div>
                    <div class="text-sm text-white">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>