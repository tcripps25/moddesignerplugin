<script setup>
import { computed } from 'vue';
import Page from '@/components/Page.vue';
import PageHeader from '@/components/PageHeader.vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const designPage = computed(() => route.path === '/design');
</script>

<template>
    <Page v-if="designPage">
        <template v-slot:page-header>
            <PageHeader title="Start your Design" section-title="Design" />
        </template>

        <div class="">

            <p>Hi</p>

        </div>
    </Page>

    <RouterView v-else></RouterView>
</template>