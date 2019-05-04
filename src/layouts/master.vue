<template>
    <main id="app" class="flex direction-column w-100">
        <small-header/>
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
    import smallHeader from './partials/small-header'

    export default {
        components: {partialHeader, partialFooter, smallHeader}
    }
</script>
