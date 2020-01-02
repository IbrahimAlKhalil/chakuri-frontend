<template>
    <div class="el-card">
        <el-form class="el-card__body" :model="models" :rules="rules" @submit.native.prevent="submit">
            <section>
                <!--                <h3 class="mt-2">কাজ</h3>-->


                <el-form-item prop="position_id">
                    <label class="d-block" for="position">পদ</label>

                    <el-select v-model="models.position_id"
                               id="position"
                               class="d-block-important" placeholder="পদ নির্ধারণ করুন"
                               @focus="loadOptions('positions', position)">
                        <div slot="empty"></div>
                        <el-option v-for="(option, index) in position.options" :value="option.value"
                                   :label="option.label" :key="index"/>
                    </el-select>
                </el-form-item>

                <el-form-item prop="vacancy">
                    <label class="d-block" for="vacancy">কর্মখালি (ঐচ্ছিক)</label>

                    <el-input type="number" id="vacancy" v-model="models.vacancy" min="1">
                    </el-input>
                </el-form-item>


                <el-form-item prop="nature">
                    <label class="d-block" for="nature">চাকরীর ধরন (ঐচ্ছিক)</label>

                    <el-select
                            id="nature"
                            v-model="models.nature"
                            class="d-block-important" placeholder="চাকরীর ধরন নির্ধারণ করুন">
                        <div slot="empty"></div>
                        <el-option :value="1" label="ফুলটাইম"/>
                        <el-option :value="2" label="পার্টটাইম"/>
                    </el-select>
                </el-form-item>

                <range-input name="salary" append="টাকা (মাসিক)" :models="models"
                             label="বেতন (ঐচ্ছিক)" :negotiable="true" @typeChange="rangeTypeChange"/>

                <el-form-item prop="negotiable">
                    <el-checkbox v-model="models.negotiable" :disabled="negotiableDisabled">বেতন আলোচনা সাপেক্ষে
                    </el-checkbox>
                    <br/>
                </el-form-item>

                <el-form-item prop="responsibilities">
                    <label class="d-block" for="responsibilities">দায়িত্ব (ঐচ্ছিক)</label>
                    <el-input type="textarea" id="responsibilities" :maxlength="5000" rows="5" show-word-limit
                              v-model="models.responsibilities">
                    </el-input>
                </el-form-item>

                <el-form-item prop="deadline">
                    <label class="d-block" for="deadline">আবেদনের শেষ তারিখ / বিজ্ঞাপনের মেয়াদোত্তীর্ণের তারিখ</label>

                    <el-input type="date" id="deadline" v-model="models.deadline">
                    </el-input>
                </el-form-item>
            </section>

            <section>
                <!--                <h3 class="mt-2">ঠিকানা</h3>-->

                <div class="group">
                    <el-form-item prop="district_id">
                        <label class="d-block" for="district">জেলা</label>

                        <el-select v-model="models.district_id"
                                   id="district"
                                   class="d-block-important" placeholder="জেলা নির্ধারণ করুন"
                                   @focus="loadDistricts"
                                   @change="unselectThana">
                            <div slot="empty"></div>
                            <el-option v-for="(option, index) in district.options" :value="option.value"
                                       :label="option.label" :key="index"/>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop="thana_id">
                        <label class="d-block" for="thana">থানা</label>

                        <el-select v-model="models.thana_id"
                                   id="thana"
                                   class="d-block-important" placeholder="থানা নির্ধারণ করুন"
                                   @focus="loadOptions(`thanas/by-district/${models.district_id}`, thana)"
                                   :disabled="!models.district_id">
                            <div slot="empty"></div>
                            <el-option v-for="(option, index) in thana.options" :value="option.value"
                                       :label="option.label" :key="index"/>
                        </el-select>
                    </el-form-item>
                </div>

                <el-form-item prop="village">
                    <label class="d-block" for="village">এলাকা / গ্রাম / রোড নম্বর</label>
                    <el-input type="textarea" id="village" :maxlength="200" rows="5" show-word-limit
                              v-model="models.village">
                    </el-input>
                </el-form-item>
            </section>

            <section>
                <!--                <h3 class="mt-2">আবেদনকারী সম্পর্কে তথ্য</h3>-->

                <range-input name="age" append="বছর" :models="models" label="বয়স (ঐচ্ছিক)"/>

                <range-input name="experience" append="বছর" :models="models" label="অভিজ্ঞতা (ঐচ্ছিক)"/>

                <el-form-item prop="education">
                    <label class="d-block" for="education">শিক্ষাগত যোগ্যতা (ঐচ্ছিক)</label>
                    <el-input type="textarea" id="education" :maxlength="200" rows="5" show-word-limit
                              v-model="models.education">
                    </el-input>
                </el-form-item>


                <el-form-item prop="gender">
                    <label class="d-block" for="gender">লিঙ্গ</label>

                    <el-select v-model="models.gender"
                               id="gender"
                               class="d-block-important" placeholder="লিঙ্গ নির্ধারণ করুন">
                        <div slot="empty"></div>
                        <el-option :value="1" label="পুরুষ"/>
                        <el-option :value="2" label="মহিলা"/>
                        <el-option :value="3" label="পুরুষ বা মহিলা"/>
                    </el-select>
                </el-form-item>


                <el-form-item prop="additional">
                    <label class="d-block" for="additional">আবেদনকারীর জন্য আবশ্যকীয় (ঐচ্ছিক)</label>
                    <el-input type="textarea" id="additional" :maxlength="5000" rows="5" show-word-limit
                              v-model="models.additional">
                    </el-input>
                </el-form-item>
            </section>

            <el-form-item prop="special">
                <el-checkbox v-model="models.special">জরুরি নিয়োগ <b>(এখানে টিক দিলে
                    আপনার বিজ্ঞাপনটি জরুরী নিয়োগ বিজ্ঞপ্তি হিসেবে দেখানো হবে)</b>
                    &nbsp;<router-link class="link" :to="specialInfoLink">জরুরী নিয়োগ সম্পর্কে বিস্তারিত জানুন
                    </router-link>
                </el-checkbox>
            </el-form-item>

            <div class="text-center mt-1">
                <el-button class="login-btn"
                           :icon="!formLoading? 'el-icon-s-promotion' : 'el-icon-loading'"
                           type="primary"
                           nativeType="submit" :disabled="formLoading">&nbsp;&nbsp;সাবমিট
                </el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    import {elButton, elForm, elFormItem, elInput, elOption, elSelect, elCheckbox, elRadioButton} from '@/el';
    import rangeInput from './range-input';
    import elCollapse from '@components/collapse';
    import elCollapseItem from '@components/collapse-item';
    import messageBox from 'element-ui/lib/message-box';

    export default {
        components: {
            elForm,
            elFormItem,
            elInput,
            elSelect,
            elOption,
            elButton,
            elCollapse,
            elCollapseItem,
            elCheckbox,
            elRadioButton,
            rangeInput,
        },

        data() {
            return {
                formLoading: false,
                models: {
                    gender: 1,
                    negotiable: false,
                    special: false,
                },
                district: {
                    loading: true,
                    options: [],
                },
                thana: {
                    loading: true,
                    options: [],
                },
                position: {
                    loading: true,
                    options: [],
                },

                ageType: 1,

                negotiableDisabled: false,

                specialInfoLink: '',
            };
        },

        methods: {
            async minDate(rule, value, callback) {
                const d = new Date(value).getTime();
                const response = await this.$fetch('time').response();
                const min = Number(response.text) + 4.32e+7;

                if (d < min) {
                    const minDate = new Date(min);

                    callback(`দুঃখিত, আবেদনের শেষ তারিখ ${minDate.toDateString()} এর চেয়ে কম হতে পারবে না`);
                }

                callback();
            },

            async submit(evt) {
                try {
                    await evt.target.__vue__.validate();
                } catch (e) {
                }

                const {models, edit} = this;

                if (!!edit && !(await this.confirm())) {
                    return;
                }

                const body = new FormData;

                for (const key in models) {
                    body.append(key, models[key]);
                }

                const response = await this.$fetch(!!edit ? `jobs/${edit}` : 'jobs', {
                    method: !!edit ? 'PATCH' : 'POST',
                    body,
                }).response();

                if (response.status === 200) {
                    this.$notify({
                        message: 'আমরা আপনার বিজ্ঞাপন পর্যালোচনা করছি, দয়া করে অপেক্ষা করুন।',
                        type: 'success',
                    });

                    return this.$router.push(`/dashboard/jobs/${response.text}`);
                }

                this.$notify({
                    message: 'দুঃখিত কিছু ভুল হয়েছে দয়া করে আবার চেষ্টা করুন',
                    type: 'error',
                });
            },

            async loadOptions(endpoint, field) {
                if (field.loaded) {
                    return;
                }

                const response = await this.$fetch(endpoint).response();
                const data = response.json();

                field.options = data.map(item => ({
                    value: item.id,
                    label: item.name,
                }));
            },

            rangeTypeChange(evt) {
                this.negotiableDisabled = this.models.negotiable = evt === 5;
            },

            loadDistricts() {
                this.loadOptions('districts', this.district);
                this.$set(this.thana, 'loaded', false);
            },

            unselectThana() {
                this.$set(this.models, 'thana_id', null);
            },

            confirm() {
                return new Promise(resolve => {
                    messageBox.confirm(`এডমিন রিভিউ করার আগে পর্যন্ত কেউ বিজ্ঞাপনটি দেখতে পারবে না`, 'সতর্কীকরণ', {
                        confirmButtonText: 'প্রক্রিয়া সম্পন্ন করুন',
                        cancelButtonText: 'বাতিল করুন',
                        type: 'warning',
                        center: true,
                    }).then(() => {
                        resolve(true);
                    }).catch(() => {
                        resolve(false);
                    });
                });
            },
        },

        computed: {

            edit() {
                return this.$route.params.id;
            },

            rules() {
                const required = {
                    required: true,
                    message: 'অনুগ্রহ করে এই ঘরটি পূরণ করুন',
                };

                const {minDate} = this;

                return {
                    position_id: [required],
                    deadline: [required, {validator: minDate}],
                    gender: [required],
                    village: [required],
                    district_id: [required],
                    thana_id: [required],
                };
            },

            ageStrings() {
                const {age_from, age_to} = this.models;

                if (!age_from && !age_to) {
                    return ['থেকে', 'বছর'];
                }
            },
        },

        async created() {
            this.specialInfoLink = await this.$setting('special-job-info-page-link');

            if (!this.edit) {
                return;
            }

            const {models, thana} = this;

            this.loadOptions('positions', this.position);
            this.loadOptions('districts', this.district);

            const job = (await this.$fetch(`jobs/${this.edit}/edit`).response()).json();

            job.deadline = new Date(job.deadline).toISOString().split('T')[0];

            for (let key in job) {
                this.$set(models, key, job[key]);
            }

            this.loadOptions(`thanas/by-district/${models.district_id}`, thana);
        },
    };
</script>

<style lang="scss" scoped>

    .group {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        grid-gap: 10px;
    }

    .select {
        display: block !important;
    }
</style>
