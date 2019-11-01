<template>
    <sidebar-card title="আপনার এলাকা">
        <el-menu class="divisions">
            <li v-for="(division, index) in divisions.items" class="el-menu-item nav-arrow-right"
                :index="index.toString()"
                @click="showDialog(division)">{{division.name}}
            </li>
        </el-menu>

        <location-selector :show.sync="show" :division="division" v-model="value" @input="redirect"/>
    </sidebar-card>
</template>

<script>
    import sidebarCard from './sidebar-card';
    import locationSelector from '@components/location-selector';
    import {elMenu} from '@/el';

    export default {
        components: {sidebarCard, locationSelector, elMenu},
        data() {
            return {
                show: false,
                value: null,
                division: null,
                divisions: this.$store.state.additional.divisions
            };
        },

        methods: {
            showDialog(division) {
                this.show = true;
                this.division = division;
            },

            redirect(data) {
                this.$router.push(`search?district=${data.district}&thana=${data.thana}`);
            }
        }
    };
</script>

<style lang="scss">
    @import "../../../styles/var";

    $line-height: 45px;

    .divisions {

        li {
            height: $line-height !important;
            line-height: $line-height !important;

            &:before {
                line-height: $line-height;
            }
        }
    }
</style>
