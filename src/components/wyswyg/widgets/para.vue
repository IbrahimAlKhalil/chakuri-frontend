<template>
    <div>
        <h4 class="editable" contenteditable @focus="disableCommands" @blur="resetCommands() && change('title', $event)"
            v-html="widget.title"></h4>
        <p class="editable" contenteditable @blur="change('contents', $event)" v-html="widget.contents"></p>
    </div>
</template>

<script>
    import mixin from './mixin'

    export default {
        mixins: [mixin]
    }
</script>
