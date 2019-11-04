<template>
    <data-list endpoint="dashboard/moderators"
               title="Moderator"
               :decorator="decorate"
               :before-check="preventOwnCheck"
               :create-form="createForm"
               :edit-form="editForm"
               :per-page="6"
               :query="query">

        <template #default="{data, methods}">
            <div class="el-card mb-1">
                <div class="el-card__body">
                    <strong>Total items: {{data.total}}</strong>
                </div>

            </div>

            <div class="wrapper">
                <div v-for="(user, index) in data.items" :key="index"
                     :class="['el-card item','is-always-shadow', {own: owner(user), checked: user.checked}]"
                     @click="methods.check(user)">

                    <el-checkbox v-show="user.checked" class="checkbox" size="medium"
                                 v-model="user.checked"></el-checkbox>

                    <el-popover v-if="!owner(user)" popper-class="popover" placement="left-start">
                        <el-button class="action-btn" slot="reference" icon="fas fa-ellipsis-v"
                                   @click.stop=""></el-button>

                        <div class="el-menu">
                            <div class="el-menu-item" @click="methods.edit(user)"><i class="fa fa-edit"></i> Edit</div>
                            <div class="el-menu-item" @click="methods.removeItem(user)"><i class="fa fa-trash"></i>
                                Disable
                            </div>
                        </div>
                    </el-popover>

                    <div class="el-card__header flex flex-wrap justify-center">
                        <img :src="user.photo?$fileUrl(user.photo):altPhoto" :alt="user.name">

                        <div class="w-100 text-center mt-1">{{user.name}}</div>
                    </div>

                    <div class="el-card__header">
                        <div class="mt-1">
                            <b>Mobile: </b> {{user.mobile}}
                        </div>

                        <div class="mt-1">
                            <b>Email: </b> {{user.email || 'n/a'}}
                        </div>

                        <div class="mt-1">
                            <b>Roles: </b> <span v-for="(role, index) in user.roles" :key="index" class="el-badge">
                                    <strong class="el-badge__content el-badge__content--primary">
                                        {{role.name}}
                                    </strong>
                                </span>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </data-list>
</template>

<script>
    import {elButton, elPopover, elCheckbox} from '@/el';
    import dataList from '@/components/data-list/lazy';
    import altPhoto from '@/assets/images/user.svg';

    import createMixin from './create-mixin';
    import editMixin from './edit-mixin';

    export default {
        mixins: [createMixin, editMixin],

        components: {
            elButton,
            elPopover,
            dataList,
            elCheckbox
        },

        data() {
            return {
                altPhoto,
                roles: [],
                query: {
                    show: 'enabled'
                }
            };
        },

        methods: {
            owner(user) {
                return this.$auth.user.id === user.id;
            },

            decorate(item) {
                item.checked = false;

                return item;
            },

            preventOwnCheck(item) {
                const notOwn = this.$auth.user.id !== item.id;

                if (!notOwn) {
                    this.$notify({
                        type: 'warning',
                        message: 'You can\'t modify your own account'
                    });
                }

                return notOwn;
            }
        },

        async created() {
            const response = await this.$fetch('dashboard/roles?all=true').response();

            this.roles = response.json().filter(item => item.name !== 'Admin');
        }
    };
</script>

<style lang="scss" scoped>
    @import '../../../../styles/var';


    .wrapper {
        display: grid;
        gap: 15px;
    }

    img {
        width: 110px;
        border-radius: 5px;
        background: #fff;
        display: block;
        margin: 0;
    }

    .item {
        padding: 0;
        word-break: break-all;
        position: relative;
        cursor: pointer;

        &.checked {
            border: 3px solid $--color-primary;
        }
    }

    .checkbox {
        position: absolute;
        left: 20px;
        top: 20px;
    }

    .own {
        border: 2px solid #fff000;
    }

    .action-btn {
        position: absolute;
        right: 10px;
        top: 10px;
    }

    @media all and (min-width: $--md) {
        .wrapper {
            grid-template-columns: repeat(3, minmax(200px, 1fr));
        }
    }
</style>
