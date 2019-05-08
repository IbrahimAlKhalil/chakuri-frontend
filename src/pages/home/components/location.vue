<template>
    <sidebar-card title="আপনার এলাকা">
        <el-menu class="divisions">
            <li v-for="(division, index) in divisions.items" class="el-menu-item" :index="index.toString()"
                @click="showDialog(division)">
                {{division.name}}<i class="el-icon-arrow-right"></i></li>
        </el-menu>

        <location-selector :show.sync="show" :division="division" v-model="value" @change="logger"/>
    </sidebar-card>
</template>

<script>
    import sidebarCard from "./sidebar-card";
    import locationSelector from '@components/location-selector';
    import {elMenu} from '@/el';

    export default {
        data() {
            return {
                show: false,
                value: null,
                division: null,
                divisions: this.$store.state.divisions
            }
        },

        methods: {
            showDialog(division) {
                this.show = true;
                this.division = division;
            },

            logger(e) {
                console.log(e);
            }
        },

        components: {sidebarCard, locationSelector, elMenu}
    }
</script>

<style lang="scss">
    @import "../../../styles/var";

    $line-height: 45px;

    .divisions {

        li {
            height: $line-height !important;
            line-height: $line-height !important;
        }

        i[class*="el-icon"] {
            float: right;
            line-height: $line-height;
        }
    }
</style>
