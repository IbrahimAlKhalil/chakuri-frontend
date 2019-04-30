<template>
  <el-container v-loading="loading" />
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  }
}
</script>
