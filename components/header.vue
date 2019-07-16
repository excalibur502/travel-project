<template>
  <div class="container">
    <el-row type="flex" class="main" justify="space-between">
      <!-- logo -->
      <div class="logo">
        <nuxt-link to>
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
      </div>
      <!-- 导航菜单 -->
      <el-row type="flex" class="header_nav">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <!-- 登录信息 -->
      <div class="login_info">
        <div class="login" v-if="!$store.state.user.userInfo.token">
          <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
        </div>
        <div class="info" v-else>
          <el-dropdown class="dropdown">
            <span class="el-dropdown-link">
              <nuxt-link to="#">
                <img :src="$axios.defaults.baseURL+$store.state.user.userInfo.user.defaultAvatar" alt />
                {{$store.state.user.userInfo.user.nickname}}
              </nuxt-link>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  mounted() {
    // console.log(this.$store.state.user);
  },
  methods: {
    handleLogout() {
      this.$store.commit("user/clearUserInfo");
      this.$message.success("退出成功");
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 60px;
  box-shadow: 0 3px 3px #ccc;
  position: relative;
  .main {
    width: 1000px;
    margin: 0 auto;
    line-height: 60px;
    .logo {
      margin-right: 20px;
      img {
        width: 156px;
        height: 43px;
      }
    }
    .header_nav {
      .nuxt-link-exact-active {
        background: #409eff;
        color: #fff;
        &:hover {
          color: #fff;
        }
      }
      flex: 1;
      a {
        display: block;
        padding: 0 20px;
        box-sizing: border-box;
        height: 60px;
        &:hover {
          border-bottom: 5px solid #409eff;
        }
      }
    }
    .login_info {
      font-size: 14px;
      .info {
        .dropdown {
          img {
            height: 32px;
            width: 32px;
          }
        }
      }
    }
  }
}
</style>


