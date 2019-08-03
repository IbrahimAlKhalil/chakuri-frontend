<template>
    <el-card class="card">
        <el-menu>
            <li class="el-menu-item">Heck</li>
        </el-menu>
    </el-card>
</template>

<script>
    import {elCard, elMenu} from '@/el'

    export default {
        components: {elCard, elMenu}
    }
</script>

<style lang="scss">
    .card {
        margin: 0 20px;
    }
</style>
