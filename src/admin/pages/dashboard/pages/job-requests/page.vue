<template>
    <data-list endpoint="dashboard/job-requests"
               title="বিজ্ঞাপনের আবেদন"
               :per-page="6"
               socket-event="nj"
               :crud="false"
               @socketja="assigned"
               :external-events="['ja']"
               v-model="exposed">
        <template #default="{data, methods}">
            <items-count :data="data"/>

            <jobs :jobs="exposed.items" :show-deadline="true" :keyword="exposed.highlight.keyword">
                <template #default="{item}">
                    <div class="flex justify-between align-center footer mt-1">
                        <div>
                            <div v-if="item.special" class="mb-1 el-badge">
                                <strong class="el-badge__content el-badge__content--warning">জরুরি</strong>
                            </div>

                            <div class="date">
                                {{item.created_at | bnDate}}
                            </div>
                        </div>

                        <div>
                            <template v-if="item.assignee === $store.state.auth.user.id">
                                <el-button :icon="item.approving?'el-icon-loading':''" type="success"
                                           @click="doAction({type: 'approve', item})" :disabled="item.loading">অনুমোদন
                                    করুন
                                </el-button>
                                <el-button :icon="item.rejecting?'el-icon-loading':''" type="danger"
                                           @click="doAction({type: 'reject', item})" :disabled="item.loading">
                                    প্রত্যাখ্যান
                                    করুন
                                </el-button>

                            </template>
                            <el-button v-else :class="!!item.assignee?'el-icon-lock':'el-icon-unlock'" type="primary"
                                       @click="assign(item)"
                                       :disabled="!!item.assignee"></el-button>
                        </div>
                    </div>
                </template>
            </jobs>
        </template>
    </data-list>
</template>

<script>
    import {elButton} from '@/el';
    import jobs from '@/components/jobs';
    import dataList from '@/components/data-list/lazy';
    import messageBox from 'element-ui/lib/message-box';
    import ItemsCount from '@/components/items-count';

    export default {
        components: {ItemsCount, jobs, dataList, elButton},

        data() {
            return {
                dateOptions: {
                    hour: 'numeric',
                    hour12: true,
                    minute: 'numeric',
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric'
                },

                exposed: null
            };
        },

        methods: {
            async assign(job) {
                const response = await this.$fetch(`dashboard/job-requests/assign/${job.id}`, {
                    method: 'POST',
                }).response();

                if (response.status === 200 || response.status === 204) {
                    this.$set(job, 'assignee', this.$store.state.auth.user.id);
                } else if (response.status === 422) {
                    this.$notify({
                        type: 'error',
                        message: 'দুঃখিত, এই অনুরোধটি অন্য কাউকে দেওয়া হয়েছে।'
                    });
                } else {
                    this.$someWentWrong();
                }
            },

            assigned(jobId) {
                let job;

                this.exposed.items.some(item => {
                    const ok = item.id === parseInt(jobId, 10);

                    if (ok) {
                        job = item;
                    }

                    return ok;
                });

                if (job) {
                    job.assignee = jobId;
                }
            },

            async doAction(payload) {
                const {type, item} = payload;

                const body = {type, id: item.id};

                // Confirm about rejection
                if (type !== 'approve') {

                    try {
                        // Get moderator's message
                        const val = await messageBox.prompt('ব্যবহারকারীকে এই প্রত্যাখ্যান সম্পর্কে কিছু বলুন', 'আপনি কি নিশ্চিত যে আপনি এই আবেদনটি প্রত্যাখ্যান করতে চান?', {
                            confirmButtonText: 'হ্যাঁ',
                            cancelButtonText: 'না',
                            inputType: 'textarea'
                        });

                        body.cause = val.value;
                    } catch (e) {
                        return;
                    }
                } else {
                    // Confirm approve
                    try {
                        // Get moderator's message
                        await messageBox.confirm('আপনি কি এই আবেদনটি অনুমোদনের বিষয়ে নিশ্চিত?', {
                            confirmButtonText: 'হ্যাঁ',
                            cancelButtonText: 'না'
                        });
                    } catch (e) {
                        return;
                    }
                }

                // Disable action buttons
                this.$set(item, 'loading', true);
                // Show spinner
                this.$set(item, type === 'approve' ? 'approving' : 'rejecting', true);


                const response = await this.$fetch('dashboard/job-requests', {
                    method: 'POST',
                    body
                }).response();

                const {items, total} = this.exposed;

                if (response.status === 200 || response.status === 204) {
                    items.splice(items.indexOf(item), 1);
                    this.exposed.total = total - 1;

                    return this.$notify({
                        title: type === 'approve' ? 'অনুমোদন করা হয়েছে' : 'প্রত্যাখ্যান করা হয়েছে',
                        type: 'success'
                    });
                }

                item.loading = false;
                item[type === 'approve' ? 'approving' : 'rejecting'] = false;

                this.$someWentWrong();
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

    .date {
        color: #000000;
    }
</style>
