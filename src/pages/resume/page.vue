<template>
    <div class="edit-profile">
        <el-tabs v-if="initialized" class="tabs">
            <el-tab-pane v-for="(tab, tabName) in tabs" :label="tab.label" class="tabs" :key="tabName">
                <collapse accordion v-model="tab.collapse" @change="loadCollapseData">
                    <collapse-item v-for="(collapse, index) in tab.collapses" :title="collapse.label" :key="index"
                                   :name="tabName+'-'+index">
                        <el-form :ref="tab.collapse" :model="models" :rules="collapse.rules"
                                 @submit.native.prevent="submit(tab.collapse)">
                            <el-button class="edit-btn" v-if="!collapse.edit" icon="el-icon-edit" size="small"
                                       @click="toggleEdit(collapse)" :disabled="!collapse.loaded">এডিট করুন
                            </el-button>

                            <template v-if="collapse.edit">
                                <div class="inputs">
                                    <template v-for="(field, index) in collapse.fields">
                                        <lazy-select v-if="field.type === 'lazy'" :field.sync="field" :key="index"
                                                     v-model="models[index]"
                                                     :models="models"
                                                     :value="models[index]"/>
                                        <form-item v-else-if="field.type !== 'group'" :index="index" :key="index"
                                                   :field="field"
                                                   v-model="models[index]"
                                                   :value="models[index]"/>
                                        <div v-else>
                                            <h3>{{field.label}}</h3>
                                            <template v-for="(item, index) in field.fields">
                                                <lazy-select v-if="item.type === 'lazy'" :field.sync="item"
                                                             :key="index"
                                                             v-model="models[index]"
                                                             :value="models[index]"
                                                             :models="models"/>
                                                <form-item v-else :index="index" :key="index" :field="item"
                                                           v-model="models[index]"
                                                           :value="models[index]"/>
                                            </template>
                                        </div>
                                    </template>
                                </div>
                            </template>


                            <el-button-group v-if="collapse.edit">
                                <el-button type="danger" icon="el-icon-close" @click="toggleEdit(collapse)">
                                    বাতিল
                                </el-button>
                                <el-button type="success" icon="el-icon-check" native-type="submit">
                                    সংরক্ষণ
                                </el-button>
                            </el-button-group>

                            <div v-else class="inputs" v-loading="!collapse.loaded">
                                <template v-for="(field, index) in collapse.fields">
                                    <preview v-if="field.type !== 'group'" :field="field" :key="index"/>

                                    <div v-else>
                                        <h3 class="text-center">{{field.label}}</h3>
                                        <preview v-for="(item, index) in field.fields" :field="item" :key="index"/>
                                    </div>
                                </template>
                            </div>
                        </el-form>
                    </collapse-item>
                </collapse>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import collapse from '@components/collapse'
    import collapseItem from '@components/collapse-item'
    import {
        elButton,
        elButtonGroup,
        elDivider,
        elForm,
        elFormItem,
        elInput,
        elOption,
        elSelect,
        elTabPane,
        elTabs
    } from '@/el'
    import formItem from './partials/form-item'
    import lazySelect from './partials/lazy-select'
    import {zeroPrefix} from '@/modules/zero-prefix'
    import Preview from '@/pages/resume/partials/preview'

    export default {
        data() {
            const addrRules = {}
            const addrFields = ['thana', 'district', 'village']

            addrFields.forEach(field => addrFields.push(`present_${field}`))

            addrFields.forEach(field => {
                addrRules[field] = [{
                    required: true,
                    message: 'অনুগ্রহ করে এই ঘরটি পূরণ করুন'
                }]
            })

            return {
                form: null,
                initialized: false,
                tabs: {
                    personal: {
                        label: 'ব্যক্তিগত',
                        collapse: '',
                        collapses: {
                            personal: {
                                label: 'ব্যক্তিগত তথ্য',
                                fields: {
                                    name: {
                                        type: 'text',
                                        label: 'নাম',
                                    },
                                    father: {
                                        type: 'text',
                                        label: 'পিতার নাম',
                                    },
                                    mother: {
                                        type: 'text',
                                        label: 'মাতার নাম',
                                    },
                                    dob: {
                                        type: 'date',
                                        label: 'জন্ম তারিখ',
                                    },
                                    mobile: {
                                        type: 'text',
                                        label: 'মোবাইল নম্বর',
                                    },
                                    email: {
                                        type: 'email',
                                        label: 'ইমেইল',
                                    },
                                    gender: {
                                        type: 'select',
                                        label: 'লিঙ্গ',
                                        model: 'পুরুষ',
                                        opt: ['পুরুষ', 'মহিলা']
                                    },
                                    marital_status: {
                                        type: 'select',
                                        label: 'বৈবাহিক অবস্থা',
                                        model: 'বিবাহিত',
                                        opt: ['বিবাহিত', 'অবিবাহিত']
                                    },
                                    nationality: {
                                        type: 'text',
                                        label: 'জাতীয়তা',
                                    }
                                },
                                rules: {
                                    email: [{
                                        type: 'email',
                                        message: 'দুঃখিত, ইমেইল ঠিকানাটি সঠিক নয়।'
                                    }]
                                }
                            },
                            address: {
                                label: 'ঠিকানা',
                                fields: {
                                    pAddr: {
                                        type: 'group',
                                        label: 'বর্তমান ঠিকানা',
                                        fields: {
                                            present_district: {
                                                label: 'জেলা',
                                                top: true,
                                                type: 'lazy',
                                                route: 'districts',
                                                action: 'thanas/by-district',
                                                loading: true,
                                                child: {
                                                    present_thana: {
                                                        label: 'থানা',
                                                        type: 'lazy',
                                                        loading: false,
                                                    }
                                                }
                                            },
                                            present_village: {
                                                type: 'text',
                                                label: 'এলাকা/গ্রাম/রোড নম্বর'
                                            }
                                        }
                                    },
                                    addr: {
                                        type: 'group',
                                        label: 'স্থায়ী ঠিকানা',
                                        fields: {
                                            district: {
                                                label: 'জেলা ',
                                                type: 'lazy',
                                                top: true,
                                                route: 'districts',
                                                action: 'thanas/by-district',
                                                loading: true,
                                                child: {
                                                    thana: {
                                                        label: 'থানা ',
                                                        type: 'lazy',
                                                        loading: false,
                                                    }
                                                }
                                            },
                                            village: {
                                                type: 'text',
                                                label: 'এলাকা/গ্রাম/রোড নম্বর'
                                            }
                                        }
                                    }
                                },
                                rules: addrRules
                            }
                        }
                    },
                    education: {
                        label: 'শিক্ষা',
                        collapse: 'education',
                        collapses: {
                            academic: {
                                label: 'একাডেমিক তথ্য',
                                fields: {
                                    madrasa: {
                                        type: 'repeater',
                                        label: 'মাদ্রাসা 1',
                                        fields: {}
                                    }
                                }
                            },
                            training: {
                                label: 'প্রশিক্ষণ',
                                repeater: true,
                                fields: {}
                            }
                        }
                    },
                    career: {
                        label: 'চাকুরী জীবন ',
                        collapse: 'career',
                        collapses: {}
                    },
                    photo: {
                        label: 'ফটো ',
                        collapse: 'photo',
                        collapses: {}
                    }
                },
                models: {}
            }
        },
        created() {
            const tabs = this.flatFields

            // Iterate over all the tabs and collapses inside each tabs

            for (let tab in tabs) {
                for (let colName in tabs[tab]) {
                    const collapse = this.tabs[tab].collapses[colName]
                    const fields = tabs[tab][colName]

                    // Set collapse properties
                    this.$set(collapse, 'edit', false)
                    this.$set(collapse, 'loaded', false)

                    // Set model and value property to all fields

                    for (let fName in fields) {
                        const field = fields[fName]

                        this.$set(field, 'value', '')
                        this.$set(this.models, fName, '')
                    }
                }
            }

            this.initialized = true
        },
        computed: {
            flatFields() {
                const data = {}

                const {tabs} = this

                for (let tabName in this.tabs) {
                    const {collapses} = tabs[tabName]
                    const tab = {}

                    for (let collapseName in collapses) {
                        const {fields} = collapses[collapseName]
                        const collapse = {}

                        for (let fieldName in fields) {
                            const field = fields[fieldName]

                            if (field.type === 'group') {
                                this.flatGroupField(collapse, field)
                                continue
                            }

                            if (field.type === 'lazy') {
                                this.flatLazySelect(data, field, fieldName)
                                continue
                            }

                            collapse[fieldName] = field
                        }

                        tab[collapseName] = collapse
                    }

                    data[tabName] = tab
                }


                return data
            }
        },
        methods: {
            toggleEdit(collapse) {
                collapse.edit = !collapse.edit
            },

            // TODO:: Optimization needed

            async loadLazySelect(field, url) {
                const response = await this.$fetch(url).response()
                const data = response.json()

                this.$set(field, 'opt', data.map(item => ({id: item.id, name: item.name})))

                if (field.child) {
                    const child = field.child[Object.keys(field.child)[0]]
                    this.loadLazySelect(child, `${field.action}/${field.value}`)
                }
            },

            async loadCollapseData(value) {

                // Load data after collapsed
                if (!value) {
                    return
                }

                const names = value.split('-')
                const collapse = this.tabs[names[0]].collapses[names[1]]
                const fields = this.flatFields[names[0]][names[1]]

                // Don't load the data twice
                if (collapse.loaded) {
                    return
                }

                const response = await this.$fetch(`resume/${names[1]}`).response()

                const data = response.json()

                // Iterate over all the fields and set preview data
                for (let key in fields) {
                    if (!data[key]) {
                        continue
                    }

                    const field = fields[key]


                    if (field.type === 'date') {
                        const date = new Date(data[key])

                        this.models[key] = field.value = `${date.getFullYear()}-${zeroPrefix(date.getMonth() + 1)}-${zeroPrefix(date.getDate())}`
                        continue
                    }

                    this.models[key] = field.value = data[key]

                    // TODO:: Optimization needed
                    if (field.type === 'lazy' && field.top) {
                        this.loadLazySelect(field, field.route)
                    }
                }

                collapse.loaded = true
            },

            flatGroupField(collapse, group) {
                const {fields} = group

                if (!fields) {
                    return
                }

                for (let key in fields) {
                    const field = fields[key]

                    if (field.type === 'lazy') {
                        this.flatLazySelect(collapse, field, key)
                        continue
                    }

                    collapse[key] = field
                }
            },

            flatLazySelect(collapse, field, key) {
                collapse[key] = field

                if (field.child) {

                    const childKey = Object.keys(field.child)[0]
                    this.flatLazySelect(collapse, field.child[childKey], childKey)
                }
            },

            async submit(tab) {
                const names = tab.split('-')

                try {
                    await this.$refs[tab][0].validate()
                } catch (e) {
                    return
                }

                const collapse = this.tabs[names[0]].collapses[names[1]]

                collapse.edit = false
                collapse.loaded = false

                const fields = this.flatFields[names[0]][names[1]]
                const {models} = this
                const data = {}

                for (let key in fields) {
                    const field = fields[key]
                    const model = models[key]

                    if (field.value === model) {
                        continue
                    }

                    data[key] = model
                }

                const response = await this.$fetch(`resume/${names[1]}`, {
                    method: 'POST',
                    body: data
                }).response()

                if (response.status === 200) {
                    this.$notify({
                        title: 'Success',
                        message: 'Your resume has been successfully updated!',
                        type: 'success'
                    })
                }

                for (let key in data) {
                    fields[key].value = data[key]
                }

                collapse.loaded = true
            }
        },
        components: {
            Preview,
            elForm,
            elFormItem,
            elInput,
            elDivider,
            elTabs,
            elTabPane,
            collapse,
            collapseItem,
            elButton,
            elButtonGroup,
            elSelect,
            elOption,
            formItem,
            lazySelect
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/var";

    .tabs {
        background: #fff;
        padding: 20px 10px;
    }

    .inputs {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }

    .groups {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-gap: 50px;
    }

    .el-button-group {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .edit-btn {
        display: block !important;
        margin-left: auto;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    @media screen and (min-width: $--md) {
        .tabs {
            padding: 20px;
        }

        .inputs {
            grid-column-gap: 20px;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        }
    }
</style>
