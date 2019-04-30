<template>
  <div class="flex align-center wrapper">
    <el-popover
      v-if="auth.user"
      placement="top-start"
      trigger="click"
      popper-class="user-popper"
    >
      <div
        class="avatar"
        slot="reference"
      >
        <img
          :src="icons.user"
          alt="User"
        >
      </div>
      <ul>
        <li class="el-dropdown-menu__item">
          <i class="el-icon-setting" /> Profile
        </li>
        <li
          class="el-dropdown-menu__item"
          @click="signOut"
        >
          <i class="fas fa-sign-out-alt" /> Sign Out
        </li>
      </ul>
    </el-popover>

    <template v-else>
      <el-button
        type="primary"
        icon="fas fa-sign-in-alt"
        class="btn"
      >
        Login
      </el-button>
      <el-button
        icon="fas fa-user-plus"
        class="btn"
      >
        Sign Up
      </el-button>
    </template>
  </div>
</template>

<style lang="scss">
    @import "../../styles/var";

    .user-popper {
        padding: 0;
    }
</style>

<style lang="scss" scoped>
    @import "../../styles/var";

    .wrapper > span:first-child {
        height: 100%;
    }

    .avatar {
        height: 100%;
        border-radius: 50%;
        cursor: pointer;

        img {
            box-sizing: border-box;
            height: 100%;
            border-radius: 50%;
            border: 10px solid transparent;

            &:hover {
                border-color: $bg;
            }
        }
    }

    .el-popover {
        padding: 0;

        ul {
            margin: 0;
            padding: 8px 0;
        }
    }

    .btn i {
        margin-right: 10px;
    }
</style>

<script>
export default {
  data () {
    const auth = this.$root.$auth

    return {
      icons: {
        user: require('../../assets/images/user.svg')
      },
      auth: auth
    }
  },

  methods: {
    signOut () {
      this.$root.$auth.signOut()
    }
  }
}
</script>
