<script setup>
import FileUpload from 'primevue/fileupload';
import Fieldset from 'primevue/fieldset';

import { useToast } from "primevue/usetoast";
const toast = useToast();

const onAdvancedUpload = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};
</script>

<template>
    <Fieldset legend="Add Supporting Files"   pt:root="bg-transparent"
        pt:legend="bg-transparent">

        <FileUpload :multiple="true" @upload="onAdvancedUpload($event)" />
    </Fieldset>
</template>