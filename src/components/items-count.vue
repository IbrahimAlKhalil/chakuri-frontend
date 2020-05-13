<template>
    <div class="el-card mb-1 is-always-shadow">
        <div class="el-card__body">
            <strong>{{prefix||'মোটঃ'}} {{data.total|enToBn}} {{suffix || 'টি'}}</strong>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['data', 'suffix', 'prefix', 'classes']
    };
</script>
