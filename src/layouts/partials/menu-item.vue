<template>
  <el-menu-item
    v-if="!item.children"
    :index="index.toString()"
  >
    <router-link :to="item.link">
      <img
        v-if="item.icon"
        :src="item.icon"
        :alt="item.title"
        class="icon"
      >
      <span>{{ item.title }}</span>
    </router-link>
  </el-menu-item>

  <sub-menu
    v-else
    :item="item"
    :index="index"
  />
</template>

<style lang="scss" scoped>
    @import "../../styles/var.scss";

    .el-submenu.is-opened {
        background-color: $--dropdown-menuItem-hover-fill !important;

        .el-submenu__title {
            background-color: $--dropdown-menuItem-hover-fill !important;
        }
    }

    .icon {
        height: 20px;
        margin-right: 10px;
        filter: grayscale(1);
    }
</style>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: [Number, String],
      required: true
    }
  },
  components: {
    subMenu: () => import('./sub-menu')
  }
}
</script>
