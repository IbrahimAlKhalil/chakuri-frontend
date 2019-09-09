<template>
    <div>
        <h4 class="editable" contenteditable @focus="disableCommands" @blur="resetCommands() && change('title', $event)"
            v-html="widget.title"></h4>
        <ul class="editable" contenteditable @blur="change('contents', $event)" v-html="widget.contents"></ul>
    </div>
</template>

<script>
    import mixin from './mixin'

    export default {
        mixins: [mixin]
    }
</script>
