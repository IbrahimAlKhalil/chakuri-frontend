export default {
    props: ['widget'],

    data() {
        return {
            disabled: ['bold']
        }
    },

    methods: {
        disableCommands() {
            this.$emit('disableCommands', this.disabled)
        },

        resetCommands() {
            this.$emit('resetCommands')
            return true
        },

        change(name, evt) {
            this.$emit('lastCursor', this.getSelection(evt.target))

            this.$props.widget[name] = evt.target.innerHTML

            this.$emit('change')
        },

        getSelection(target) {
            const getIndex = node => Array.prototype.indexOf.call(node.parentNode.childNodes, node)
            const getPath = node => {
                const path = []

                while (!node.isSameNode(target)) {
                    path.unshift(getIndex(node))
                    node = node.parentNode
                }

                return path
            }

            const range = getSelection().getRangeAt(0)

            return {
                target: {
                    parent: target.parentElement,
                    path: Array.prototype.indexOf.call(target.parentElement.children, target)
                },
                start: {
                    path: getPath(range.startContainer),
                    offset: range.startOffset
                },

                end: {
                    path: getPath(range.endContainer),
                    offset: range.endOffset
                }
            }
        }
    }
}
