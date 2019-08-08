<template>
    <div class="edit-profile">
        <el-tabs class="tabs">
            <el-tab-pane v-for="(tab, index) in tabs" :label="tab.label" class="tabs" :key="index" :lazy="true">
                <collapse v-if="tab.hasOwnProperty('collapse')" accordion v-model="tab.collapse">
                    <collapse-item v-for="(collapse, index) in tab.collapses" :title="collapse" :key="index"
                                   :name="index">
                        <keep-alive>
                            <component :is="tab.collapse"/>
                        </keep-alive>
                    </collapse-item>
                </collapse>

                <keep-alive v-else>
                    <component :is="tab.component"/>
                </keep-alive>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import collapse from '@components/collapse'
    import collapseItem from '@components/collapse-item'
    import factory from './modules/factory'
    import {elTabPane, elTabs} from '@/el'

    export default {
        data() {
            return {
                tabs: [
                    {
                        label: 'ব্যক্তিগত',
                        collapse: '',
                        collapses: {
                            personal: 'ব্যক্তিগত তথ্য',
                            colAddress: 'ঠিকানা'
                        },
                    },
                    {
                        label: 'শিক্ষা',
                        collapse: '',
                        collapses: {
                            education: 'একাডেমিক তথ্য',
                            training: 'প্রশিক্ষণ'
                        }
                    },
                    {
                        label: 'পেশা ও অভিজ্ঞতা',
                        component: 'experience'
                    },
                    {
                        label: 'ফটো',
                        component: 'photo'
                    }
                ]
            }
        },
        components: {
            elTabs,
            elTabPane,
            collapse,
            collapseItem,

            personal: factory(() => import('./collapses/personal')),
            colAddress: factory(() => import('./collapses/address')),
            education: factory(() => import('./collapses/education')),
            training: factory(() => import('./collapses/training')),
            experience: factory(() => import('./collapses/experience')),
            photo: factory(() => import('./collapses/photo'))
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
