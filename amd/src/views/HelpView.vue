<script setup>
import Page from '@/components/Page.vue';
import PageHeader from '@/components/PageHeader.vue';
import { useFetchMoodleString } from '@/utils/fetchMoodleString';

const sectionTitle = useFetchMoodleString('section1', 'Getting Started')
const pageTitle = useFetchMoodleString('staticmenu2', 'About Module Designer')
</script>

<template>

    <Page>
        <template v-slot:page-header>
            <PageHeader :sectionTitle=sectionTitle :title=pageTitle />
        </template>
    </Page>
</template>