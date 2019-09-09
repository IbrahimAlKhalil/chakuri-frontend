<template>
    <div class="wyswyg">
        <div class="toolbar flex justify-between align-center">
            <div>
                <el-button-group>
                    <el-button
                            v-for="(command, index) in commands" :icon="command.icon"
                            :key="index"
                            :disabled="disabledCommands.includes(command.name)"
                            @click="runCommand(command.name)">
                    </el-button>
                </el-button-group>
            </div>

            <widget-menu position="left" v-if="widgets.length" :widgets="widgetTypes" @add="addWidget">&nbsp;&nbsp;আরও
                তথ্য
                যুক্ত
                করুন
            </widget-menu>
        </div>

        <div class="editor">
            <div>
                <transition-group name="el-fade-in">
                    <div v-for="(widget, index) in widgets" class="widget" :key="`t-${index}`">
                        <el-button-group class="buttons">
                            <el-button type="primary"
                                       icon="fas fa-arrow-up"
                                       size="small"
                                       plain @click="move(index, 'up')">
                            </el-button>
                            <el-button type="primary"
                                       icon="fas fa-arrow-down"
                                       size="small"
                                       plain @click="move(index+1, 'down')">
                            </el-button>
                            <el-button type="danger" icon="fas fa-trash-alt" size="small" plain
                                       @click="removeWidget(index)"></el-button>
                        </el-button-group>
                        <component :is="widget.name" :widget="widget"
                                   @disableCommands="disableCommands"
                                   @resetCommands="resetCommands" @change="change"
                                   @lastCursor="setLastCursor">
                        </component>
                    </div>
                </transition-group>
            </div>

            <widget-menu v-if="!widgets.length" :widgets="widgetTypes" @add="addWidget"></widget-menu>
        </div>
    </div>
</template>

<script>
    import {elButton, elButtonGroup} from '@/el'
    import widgetMenu from './widget-menu'
    import para from './widgets/para'
    import list from './widgets/list'

    export default {
        components: {elButton, widgetMenu, para, list, elButtonGroup},
        props: {
            value: {
                type: Array,
                default: []
            }
        },
        data() {
            const {value} = this.$props

            return {
                commands: [
                    {
                        name: 'bold',
                        icon: 'fas fa-bold'
                    },
                    {
                        name: 'italic',
                        icon: 'fas fa-italic'
                    },
                    {
                        name: 'underline',
                        icon: 'fas fa-underline'
                    },
                    {
                        name: 'justifyLeft',
                        icon: 'fas fa-align-left'
                    },
                    {
                        name: 'justifyRight',
                        icon: 'fas fa-align-right'
                    },
                    {
                        name: 'justifyCenter',
                        icon: 'fas fa-align-center'
                    },
                    {
                        name: 'justifyFull',
                        icon: 'fas fa-align-justify'
                    }
                ],
                disabledCommands: [],
                widgetTypes: [
                    {
                        name: 'para',
                        title: 'অনুচ্ছেদ',
                        icon: 'fas fa-paragraph'
                    },
                    {
                        name: 'list',
                        title: 'লিস্ট',
                        icon: 'fas fa-list-ul'
                    }
                ],
                widgets: value,
                lastCursor: null
            }
        },

        methods: {
            runCommand(name) {
                if (this.lastCursor) {
                    const {target, start, end} = this.lastCursor
                    const elem = target.parent.children[target.path]

                    const selection = getSelection()

                    const range = document.createRange()

                    range.setStart(this.resolveNode(elem, start.path), start.offset)
                    range.setEnd(this.resolveNode(elem, end.path), end.offset)

                    selection.removeAllRanges()
                    selection.addRange(range)
                }

                document.execCommand(name, false)
            },

            addWidget(name) {
                // Push widget
                this.widgets.push({
                    name,
                    title: 'Title',
                    contents: name === 'para' ? 'Contents' : '<li>Item</li>'
                })
            },

            removeWidget(index) {
                this.widgets.splice(index, 1)
            },

            move(index, type) {
                if (type === 'up' && index === 0) {
                    return
                }

                if (type === 'down' && index === this.widgets.length) {
                    return
                }


                const item1 = this.widgets[index]
                const item2 = this.widgets[index - 1]

                this.widgets.splice(index - 1, 2)

                this.$nextTick(() => {
                    this.widgets.splice(index - 1, 0, item1, item2)
                })
            },

            disableCommands(disabled) {
                this.disabledCommands = disabled
            },

            resetCommands() {
                this.disabledCommands = []
            },

            change() {
                this.$emit('input', this.widgets)
            },

            setLastCursor(evt) {
                this.lastCursor = evt
            },

            resolveNode(node, path) {
                for (const index of path) {
                    node = node.childNodes[index]
                }

                return node
            }
        }
    }
</script>

<style lang="scss" scoped>
    .wyswyg {
        resize: vertical;
        border: 1px solid #dcdfe6;
        border-radius: 5px;
    }

    .editor {
        padding: 10px;
        outline: none;
    }

    .toolbar {
        border-bottom: 1px solid #eeeeee;
        padding: 3px;
    }

    .widget {
        transition: all 100ms linear;
        padding: 15px 10px;
        border-radius: 5px;
        border: 2px solid transparent;
        position: relative;
    }

    .buttons {
        position: absolute;
        opacity: 0;
        top: 0;
        right: 0;
    }

    .widget:hover {
        border: 2px dashed #dcdfe6;

        .buttons {
            opacity: 1;
        }
    }

    .cursor-move {
        cursor: move;
    }
</style>

<style lang="scss">
    .editable {
        &:focus {
            border: 1px dashed #a0a0a0;
        }

        outline: none;
        min-height: calc(1rem + 5px);
    }
</style>
