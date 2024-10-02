<script setup>
import { onMounted, watch, onUnmounted } from 'vue';
import ApexCharts from 'apexcharts';
import { useCourseStore } from '@/stores/course.js'

const course = useCourseStore();

const props = defineProps({
  title: String,
  information: String,
  datax: Array, // Change Object to Array for x-axis data
  datay: Array, // Change Object to Array for y-axis data
});

let chart;

const createChart = () => {
  const options = {
    chart: {
      height: "100%",
      maxWidth: "100%",
      type: "line",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
      curve: 'smooth',
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 20,
        right: 2,
        top: -26,
      },
    },
    series: [
      {
        name: "Activities",
        data: props.datay,
        color: "#1A56DB",
      },
    ],
    legend: {
      show: false,
    },
    xaxis: {
      categories: props.datax,
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  const chartElement = document.getElementById("line-chart");
  if (chartElement && typeof ApexCharts !== 'undefined') {
    chart = new ApexCharts(chartElement, options);
    chart.render();
  }
};

const updateChart = () => {
  if (chart) {
    chart.updateOptions({
      series: [{
        data: props.datay,
      }],
      xaxis: {
        categories: props.datax,
      },
    });
  }
};

onMounted(() => {
  createChart();
});

watch(() => [props.datax, props.datay], updateChart, { deep: true });

onUnmounted(() => {
  if (chart) {
    chart.destroy();
  }
});
</script>


<template>
  <h3 v-if="title">{{ title }}</h3>
  <slot></slot>
  <div id="line-chart"></div>
</template>
