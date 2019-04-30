<template>
    <main id="app" class="flex direction-column w-100">
        <partial-header/>
        <section>
            <slot/>
        </section>
        <partial-footer/>
    </main>
</template>

<script>
    import partialHeader from './partials/header'
    import partialFooter from './partials/footer'

    export default {
        components: {partialHeader, partialFooter}
    }
</script>
