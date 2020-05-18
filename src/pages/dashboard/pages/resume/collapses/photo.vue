<template>
    <form @submit.prevent="" ref="form">
        <cropper :photo.sync="photo" @done="save($event)" @cancel="cancel"/>

        <template v-if="!user.photo">
            <div class="no-academic w-100">আপনি এখনো ফটো যুক্ত করেননি। নিচের বক্সে ক্লিক করে যুক্ত করুন। (ঐচ্ছিক)</div>

            <div class="flex justify-center">
                <label class="flex justify-center align-center up-box">
                    <i class="el-icon-plus"></i>
                    <input class="d-none" type="file" accept="image/jpeg,image/png" @change="crop($event)">
                </label>
            </div>
        </template>

        <div v-else class="flex justify-center" v-loading="loading">
            <div>
                <img class="d-block mb-1 photo" :src="user.photo | fileUrl">
                <div class="flex justify-center">
                    <label class="align-center el-button el-button--primary flex is-plain justify-center is-circle">
                        <i class="el-icon-edit"></i>
                        <input class="d-none" type="file" accept="image/jpeg,image/png" @change="crop($event)">
                    </label>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
    import {elDialog, elButton} from '../../../../../el'
    import cropper from '../../../../../components/cropper'
    import mixin from '../../../mixins/photo'

    export default {
        mixins: [mixin],
        components: {elDialog, elButton, cropper},
        data() {
            return {
                user: this.$store.state.auth.user,
                reset: 'form'
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../../../styles/var";

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

    .photo {
        width: 250px;
        border-radius: 5px;
        box-shadow: 0 0 15px 7px rgba(0, 0, 0, .1);
    }
</style>
