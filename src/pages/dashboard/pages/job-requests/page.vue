<template>
    <data-list endpoint="dashboard/job-requests"
               title="Moderator"
               :per-page="6"
               :crud="false">
        <template #default="{data, methods}">
            <div class="el-card mb-1">
                <div class="el-card__body">
                    <strong>Total items: {{data.total}}</strong>
                </div>

            </div>

            <jobs :jobs="data.items" :show-deadline="true">
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
        </template>
    </data-list>
</template>

<script>
    import {elButton} from '@/el';
    import jobs from '@/pages/home/components/jobs';
    import dataList from '@/components/data-list/lazy';
    import messageBox from 'element-ui/lib/message-box';

    export default {
        components: {jobs, dataList, elButton},

        data() {
            return {
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

    };
</script>

<style lang="scss" scoped>
    .footer {
        background: #eef5ff;
        padding: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }
</style>
