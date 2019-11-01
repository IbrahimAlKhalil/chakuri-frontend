<template>
    <lazy-loading v-if="loaded" endpoint="dashboard/job-requests" v-model="items"
                  :total="total" @init="joinRooms" @totalChanged="total = $event">
        <jobs :jobs="items" :show-deadline="true">
            <template #default="{item}">
                <div class="flex justify-between align-center footer">
                    <div>
                        <div v-if="item.special" class="mb-1 el-badge">
                            <strong class="el-badge__content el-badge__content--warning">Special</strong>
                        </div>

                        <div>
                            {{formatDate(item.created_at)}}
                        </div>
                    </div>

                    <div>
                        <el-button :icon="item.approving?'el-icon-loading':''" type="success"
                                   @click="doAction({type: 'approve', item})" :disabled="item.loading">Approve
                        </el-button>
                        <el-button :icon="item.rejecting?'el-icon-loading':''" type="danger"
                                   @click="doAction({type: 'reject', item})" :disabled="item.loading">Reject
                        </el-button>
                    </div>
                </div>
            </template>
        </jobs>
    </lazy-loading>
</template>

<script>
    import jobs from '@/pages/home/components/jobs';
    import lazyLoading from '@/components/lazy-loading';
    import {elButton} from '@/el';
    import messageBox from 'element-ui/lib/message-box';
    import dataList from '@/mixins/data-list';

    export default {
        components: {jobs, lazyLoading, elButton},
        mixins: [dataList],

        data() {
            return {
                items: [],
                totalEndpoint: 'dashboard/job-requests/count',
                dateOptions: {
                    hour: 'numeric',
                    hour12: true,
                    minute: 'numeric',
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric'
                }
            };
        },

        methods: {
            joinRooms() {
                this.$socket().on('nj', item => {
                    this.items.unshift(item);
                    this.total = this.total + 1;
                });
            },

            formatDate(dateTime) {
                const date = new Date(dateTime);

                return `${date.toLocaleString('en-US', this.dateOptions)}`;
            },

            async doAction(payload) {
                const {type, item} = payload;

                const body = {type, id: item.id};

                // Confirm about rejection
                if (type !== 'approve') {

                    try {
                        // Get moderator's message
                        const val = await messageBox.prompt('Tell the user something helpful about this rejection', 'Are you sure you want to reject this Job?', {
                            confirmButtonText: 'OK',
                            cancelButtonText: 'Cancel',
                            inputType: 'textarea'
                        });

                        body.cause = val.value;
                    } catch (e) {
                    }
                }

                // Disable action buttons
                this.$set(item, 'loading', true);
                // Show spinner
                this.$set(item, type === 'approve' ? 'approving' : 'rejecting', true);


                await this.$fetch('dashboard/job-requests', {
                    method: 'POST',
                    body
                }).response();

                const {items, total} = this;

                items.splice(items.indexOf(item), 1);
                this.total = total - 1;

                this.$notify({
                    title: type === 'approve' ? 'Approved' : 'Rejected',
                    type: 'success'
                });
            }
        },

        beforeDestroy() {
            this.$socket().removeAllListeners('nj');
        },

        created() {

        }
    };
</script>

<style lang="scss" scoped>
    .footer {
        background: #eef5ff;
        padding: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }
</style>
