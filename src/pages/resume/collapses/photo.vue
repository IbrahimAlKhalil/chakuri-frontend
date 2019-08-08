<template>
    <div>
        <el-dialog title="আপনার ছবির আকার পরিবর্তন করুন"
                   :visible.sync="dialog"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   :show-close="false"
                   :destroy-on-close="true"
                   center>
            <img :src="photo" :alt="user.name" class="w-100" ref="crop">

            <span slot="footer" class="dialog-footer">
                <el-button @click="close('cancel')" :disabled="!cropInitialized">বাতিল করুন</el-button>
                <el-button type="primary" @click="close('save')" :disabled="!cropInitialized">সংরক্ষণ করুন</el-button>
            </span>
        </el-dialog>

        <template v-if="!user.photo">
            <div class="no-academic w-100">আপনি এখনো ফটো যুক্ত করেননি। নিচের বক্সে ক্লিক করে যুক্ত করুন। (ঐচ্ছিক)</div>

            <div class="flex justify-center">
                <label class="flex justify-center align-center up-box">
                    <i class="el-icon-plus"></i>
                    <input class="d-none" type="file" accept="image/jpeg,image/png" @change="save($event)">
                </label>
            </div>
        </template>

        <div v-else class="flex justify-center">
            <div>
                <img class="d-block mb-1" :src="user.photo" :alt="user.name">
                <label class="align-center el-button el-button--medium el-button--primary flex is-plain justify-center">
                    <i class="el-icon-edit"></i>&nbsp;পরিবর্তন করুন
                    <input class="d-none" type="file" accept="image/jpeg,image/png">
                </label>
            </div>
        </div>
    </div>
</template>

<script>
    import Croppr from 'croppr'
    import {elDialog, elButton} from '@/el'

    let resolver

    export default {
        components: {elDialog, elButton},

        data() {
            const {user} = this.$store.state.auth

            return {
                user,
                dialog: false,
                cropInitialized: false,
                photo: ''
            }
        },

        methods: {
            async save(evt) {
                // Take the photo
                const photo = evt.target.files[0]

                // Check whether photo is undefined
                if (!photo) {
                    return
                }

                // Create data url
                const url = URL.createObjectURL(photo)

                // Resize the photo
                const size = await this.resize(url)

                // Don't proceed if resizing canceled
                if (!size) {
                    return
                }

                // Request to server
                const response = await this.$fetch('update-photo', {
                    method: 'POST',
                    body: {
                        photo,
                        x: size.x,
                        y: size.y
                    }
                }).response()


                console.log(response.text)
            },

            close(action) {
                resolver(action === 'save')
                this.dialog = false
            },

            resize(url) {
                this.cropInitialized = false
                this.dialog = true
                this.photo = url

                return new Promise(resolve => {

                    this.$nextTick(() => {
                        const {crop} = this.$refs

                        const croppr = new Croppr(crop, {
                            maxSize: [300, 350],
                            minSize: [300, 350],
                            startSize: [300, 350, 'px']
                        })

                        resolver = save => {
                            if (!save) {
                                croppr.destroy()
                                return resolve(false)
                            }

                            const value = croppr.getValue()
                            croppr.destroy()

                            resolve(value)
                        }

                        this.cropInitialized = true
                    })
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../styles/var";

    .no-academic {
        font-weight: bold;
        font-size: 1.1rem;
        padding: 30px;
        text-align: center;
    }

    .up-box {
        width: 200px;
        max-width: 200px;
        height: 200px;
        border: 1px dashed #c0ccda;
        border-radius: 6px;
        font-size: 2rem;
        color: #8c939d;
        background: #fbfdff;
        cursor: pointer;

        &:hover {
            border: 1px dashed $--color-primary;
        }
    }
</style>
