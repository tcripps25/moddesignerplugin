<script setup>
import { ref, computed } from "vue";
import { useCourseStore } from '@/stores/course.js'
import { useRouter, RouterLink, useRoute } from 'vue-router';
import DesignMenu from '@/components/menu/DesignMenu.vue'
import MenuItem from "./MenuItem.vue";
const route = useRoute();
const course = useCourseStore()
import { InformationCircleIcon, QuestionMarkCircleIcon, PaintBrushIcon, DocumentTextIcon, ChartPieIcon, ArrowUpOnSquareStackIcon } from "@heroicons/vue/24/outline";
import {
  InformationCircleIcon as SolidInformationCircleIcon,
  QuestionMarkCircleIcon as SolidQuestionMarkCircleIcon,
  PaintBrushIcon as SolidPaintBrushIcon,
  DocumentTextIcon as SolidDocumentTextIcon,
  ChartPieIcon as SolidChartPieIcon,
  ArrowUpOnSquareStackIcon as SolidArrowUpOnSquareStackIcon
} from "@heroicons/vue/24/solid";
const isDesignActive = computed(() => route.path.startsWith('/design'));
import { useFetchMoodleString } from "@/utils/fetchMoodleString";

const section1title = useFetchMoodleString('section1', 'Section1 Title');
const menu1title = useFetchMoodleString('staticmenu1', 'Static Page 1');
const menu2title = useFetchMoodleString('staticmenu2', 'Static Page 2');

const mainmenu1title = useFetchMoodleString('mainmenu1', 'Main Title 1');
const mainmenu2title = useFetchMoodleString('mainmenu2', 'Main Title 2');
const mainmenu3title = useFetchMoodleString('mainmenu3', 'Main Title 3');
const mainmenu4title = useFetchMoodleString('mainmenu4', 'Main Title 4');

const menu = ref([
  {
    label: section1title,
    items: [
      {
        label: menu1title,
        icon: InformationCircleIcon,
        selectedIcon: SolidInformationCircleIcon,
        route: { name: 'about' }
      },
      {
        label: menu2title,
        icon: QuestionMarkCircleIcon,
        selectedIcon: SolidQuestionMarkCircleIcon,
        route: { name: 'help' }
      },
    ]
  },
  {
    items: [
      {
        label: mainmenu1title,
        icon: DocumentTextIcon,
        selectedIcon: SolidDocumentTextIcon,
        route: { name: 'setup' }
      },
      {
        label: mainmenu2title,
        icon: PaintBrushIcon,
        selectedIcon: SolidPaintBrushIcon,
        child: 'design-menu',
        route: { name: 'design' },
        active: isDesignActive
      },
      {
        label: mainmenu3title,
        icon: ChartPieIcon,
        selectedIcon: SolidChartPieIcon,
        route: { name: 'visualise' }
      },
      {
        label: mainmenu4title,
        icon: ArrowUpOnSquareStackIcon,
        selectedIcon: SolidArrowUpOnSquareStackIcon,
        route: { name: 'publish' }
      },
    ]
  },
]);

const weeksExist = computed(() => {
  // Check if course.weeks exists and has length
  if (!course.weeks || course.weeks.length === 0) {
    return false
  } else {
    return true
  }
})



</script>

<template>
  <nav aria-labelledby="mainmenulabel">
    <h2 id="mainmenulabel" class="sr-only">Main Menu</h2>
    <ul class="flex flex-col gap-2">
      <li v-for="(cat, catIndex) in menu">
        <span class="text-slate-500 font-semibold flex mb-1">{{ cat.label }}</span>
        <ul v-if="cat.items">
          <li v-for="(item, index) in cat.items">
            <MenuItem :item="item" />
            <!-- Only show the design menu if it's the second item in the second list (if this is changed this condition will need to altered) -->
            <DesignMenu id="design-menu" v-show="isDesignActive" v-if="catIndex == 1 && index == 1" />
          </li>
        </ul>
      </li>
    </ul>
  </nav>

</template>