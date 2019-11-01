<template>
    <div v-loading="!resumeData" class="container">
        <template v-if="resumeData">
            <div class="flex justify-center">
                <img class="cv-pic" :src="resume.photo | fileUrl" :alt="resume.name">
            </div>

            <table class="el-card is-always-shadow mt-1">
                <tbody>
                <tr>
                    <th>নাম</th>
                    <td>{{resume['name']}}</td>
                </tr>

                <tr>
                    <th>লিঙ্গ</th>
                    <td>{{resume['gender']}}</td>
                </tr>

                <tr>
                    <th>জন্ম তারিখ</th>
                    <td>{{resume['dob'] | bnDate}}</td>
                </tr>

                <tr>
                    <th>পিতার নাম</th>
                    <td>{{resume['father']}}</td>
                </tr>

                <tr>
                    <th>মাতার নাম</th>
                    <td>{{resume['mother']}}</td>
                </tr>

                <tr>
                    <th>মোবাইল নাম্বার</th>
                    <td>{{resume['mobile'] | enToBn}}</td>
                </tr>

                <tr>
                    <th>ইমেইল</th>
                    <td>{{resume['email']}}</td>
                </tr>

                <tr>
                    <th>বৈবাহিক অবস্থা</th>
                    <td>{{resume['marital_status']}}</td>
                </tr>

                <tr>
                    <th>জাতীয়তা</th>
                    <td>{{resume['nationality']}}</td>
                </tr>
                </tbody>
            </table>

            <div class="text-center">
                <el-button v-if="application.shortlist" icon="fas fa-times" type="danger"
                           @click="shortlist">
                    &nbsp;&nbsp;বাছাই লিস্ট থেকে মুছুন
                </el-button>
                <el-button v-else icon="fa fa-save" type="primary"
                           @click="shortlist">
                    &nbsp;&nbsp;বাছাই করুন
                </el-button>
                <el-button icon="fas fa-info-circle" type="info" @click="dialog = true">&nbsp;&nbsp;পূর্ণ সিভি দেখতে
                    এখানে ক্লিক করুন
                </el-button>
            </div>
        </template>


        <el-dialog v-if="resumeData" :visible.sync="dialog" append-to-body fullscreen>

            <div class="flex justify-center">
                <img class="cv-pic" :src="resume.photo | fileUrl" :alt="resume.name">
            </div>

            <h3>ব্যক্তিগত তথ্য</h3>

            <table class="el-card is-always-shadow">
                <tbody>
                <tr>
                    <th>নাম</th>
                    <td>{{resume['name']}}</td>
                </tr>

                <tr>
                    <th>লিঙ্গ</th>
                    <td>{{resume['gender']}}</td>
                </tr>

                <tr>
                    <th>জন্ম তারিখ</th>
                    <td>{{resume['dob'] | bnDate}}</td>
                </tr>

                <tr>
                    <th>পিতার নাম</th>
                    <td>{{resume['father']}}</td>
                </tr>

                <tr>
                    <th>মাতার নাম</th>
                    <td>{{resume['mother']}}</td>
                </tr>

                <tr>
                    <th>মোবাইল নাম্বার</th>
                    <td>{{resume['mobile'] | enToBn}}</td>
                </tr>

                <tr>
                    <th>ইমেইল</th>
                    <td>{{resume['email']}}</td>
                </tr>

                <tr>
                    <th>বৈবাহিক অবস্থা</th>
                    <td>{{resume['marital_status']}}</td>
                </tr>

                <tr>
                    <th>জাতীয়তা</th>
                    <td>{{resume['nationality']}}</td>
                </tr>
                </tbody>
            </table>


            <h3>ঠিকানা</h3>

            <table class="el-card is-always-shadow">
                <tbody>
                <tr>
                    <th>বর্তমান ঠিকানা</th>
                    <td>{{resume['present_village']}}, {{resume['present_thana']}}, {{resume['present_district']}}</td>
                </tr>

                <tr>
                    <th>স্থায়ী ঠিকানা</th>
                    <td>{{resume['village']}}, {{resume['thana']}}, {{resume['district']}}</td>
                </tr>
                </tbody>
            </table>


            <h3>শিক্ষা</h3>

            <table v-for="(education, index) in educations" class="el-card is-always-shadow" :key="index">
                <tbody>
                <tr>
                    <th>মারহালা</th>
                    <td>{{education.marhala}}</td>
                </tr>

                <tr>
                    <th>ফলাফল</th>
                    <td>{{education.result}}</td>
                </tr>

                <tr>
                    <th>প্রতিষ্ঠান</th>
                    <td>{{education.madrasa}}</td>
                </tr>

                <tr>
                    <th>শিক্ষাবর্ষ</th>
                    <td>{{education.year | enToBn}}</td>
                </tr>
                </tbody>
            </table>

            <h3>কর্ম</h3>

            <table v-for="(experience, index) in experiences" class="el-card is-always-shadow" :key="index+'e'">
                <tbody>
                <tr>
                    <th>প্রতিষ্ঠান</th>
                    <td>{{experience.institute}}</td>
                </tr>

                <tr>
                    <th>ঠিকানা</th>
                    <td>{{experience.address}}</td>
                </tr>

                <tr>
                    <th>পদ</th>
                    <td>{{experience.designation}}</td>
                </tr>

                <tr>
                    <th>দায়িত্ব</th>
                    <td>{{experience.responsibilities}}</td>
                </tr>

                </tbody>
            </table>
        </el-dialog>
    </div>
</template>

<script>
    import {elButton, elDialog} from '@/el';

    export default {
        components: {elButton, elDialog},

        data() {
            return {
                dialog: false,
                resumeData: null
            };
        },

        computed: {
            resume() {
                return this.resumeData.resume;
            },

            educations() {
                return this.resumeData.educations;
            },

            experiences() {
                return this.resumeData.experiences;
            },

            application() {
                return this.resumeData.application;
            }
        },

        methods: {
            async load() {
                const response = await this
                    .$fetch(`show-resume?applicant=${this.$route.params.userId}&job=${this.$route.params.id}`)
                    .response();

                this.resumeData = response.json();
            },

            async shortlist() {
                const {shortlist, id} = this.application;

                const response = await this.$fetch('applications/shortlist/' + id, {method: 'POST'}).response();

                if (response.status === 200) {
                    this.application.shortlist = !shortlist;
                }
            }
        },

        watch: {
            '$route.params.userId': function () {
                this.load();
            }
        },

        created() {
            this.load();
        },
    };

</script>

<style lang="scss" scoped>
    @import "../../../../styles/var";

    .container {
        margin-top: 30px;
    }

    h3 {
        text-indent: 20px;
    }

    table {
        width: 100%;
        border: 1px solid $--border-color-light;
        border-radius: 5px;
        border-collapse: collapse;
        margin-bottom: 50px;
    }

    th {
        padding: 15px;
        text-align: left;
        white-space: nowrap;
    }

    tr:nth-child(odd) {
        background: #f2f2f2;
    }

    .cv-pic {
        width: 150px;
        border-radius: 4px;
        box-shadow: 0 0 5px rgba(0, 0, 0, .2);
    }
</style>
