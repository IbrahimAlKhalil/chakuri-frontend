<template>
    <data-list endpoint="applications"
               title=""
               :per-page="20"
               :crud="false">
        <template #default="{data, methods}">
            <jobs :jobs="data.items" :show-deadline="true" :keyword="data.highlight.keyword"/>
        </template>
    </data-list>
</template>

<script>
    import jobs from '@/components/jobs';
    import dataList from '@/components/data-list/paginated';

    export default {
        components: {jobs, dataList},
    };
</script>
