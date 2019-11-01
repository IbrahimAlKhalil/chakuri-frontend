<template>
    <div>
        <toolbar title="Moderator" delete-title="Disable" @create="newDialog = true" @delete="removeMultiple">
        </toolbar>

        <lazy-loading v-if="loaded" endpoint="dashboard/moderators" v-model="items"
                      :total="total" :decorator="decorate">
            <div class="wrapper">
                <div v-for="(user, index) in items" :key="index"
                     :class="['el-card item','is-always-shadow', {own: owner(user), checked: user.checked}]"
                     @click="checkUser(user)">

                    <el-checkbox v-show="user.checked" class="checkbox" size="medium"
                                 v-model="user.checked"></el-checkbox>

                    <el-popover v-if="!owner(user)" popper-class="popover" placement="left-start">
                        <el-button class="action-btn" slot="reference" icon="fas fa-ellipsis-v"
                                   @click.stop=""></el-button>

                        <div class="el-menu">
                            <div class="el-menu-item" @click="edit(user)"><i class="fa fa-edit"></i> Edit</div>
                            <div class="el-menu-item" @click="removeOne(user)"><i class="fa fa-trash"></i> Disable
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
        </lazy-loading>

        <el-dialog :visible.sync="editDialog" :fullscreen="$store.state.isMobile" title="Create Moderator"
                   append-to-body>
            <edit-moderator :roles="roles" :user="editUser"/>
        </el-dialog>

        <el-dialog :visible.sync="newDialog" :fullscreen="$store.state.isMobile" title="Create Moderator"
                   append-to-body>
            <new-moderator :roles="roles" @created="created"/>
        </el-dialog>
    </div>
</template>

<script>
    import {elButton, elPopover, elTooltip, elDialog, elInput, elCheckbox} from '@/el';
    import lazyLoading from '@/components/lazy-loading';
    import newModerator from './new';
    import editModerator from './edit';
    import dataList from '@/mixins/data-list';
    import actionDataList from '@/mixins/action-data-list';
    import altPhoto from '@/assets/images/user.svg';
    import toolbar from '@/components/toolbar';

    export default {
        mixins: [dataList, actionDataList],

        components: {
            editModerator,
            newModerator,
            elButton,
            elPopover,
            lazyLoading,
            elTooltip,
            elDialog,
            elInput,
            toolbar,
            elCheckbox
        },

        data() {
            return {
                items: [],
                endpoint: 'dashboard/moderators',

                altPhoto,
                filter: {
                    model: {
                        keyword: '',
                        role: '',
                        permissions: []
                    },

                    data: {
                        roles: [],
                        permissions: [],
                    }
                },
                newDialog: false,
                editDialog: false,
                editUser: null,
                roles: [],
            };
        },

        methods: {
            created(user) {
                this.newDialog = false;

                user.checked = false;

                this.items.push(user);

                this.total = this.total + 1;
            },

            checkUser(user) {
                if (!this.owner(user)) {
                    return this.check(user);
                }

                this.$notify({
                    type: 'error',
                    message: 'You can\'t modify your own account'
                });
            },

            owner(user) {
                return this.$auth.user.id === user.id;
            },

            edit(user) {
                this.editDialog = true;
                this.editUser = user;
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
        word-break: break-word;
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
