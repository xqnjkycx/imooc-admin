<template>
  <div class="navbar">
    <Hamburger class="hamburger-container" />
    <Bread class="bread-container" />
    <div class="right-menu">
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar :size="40" :src="props.userInfo.avatar"></el-avatar>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <el-dropdown-item> 首页 </el-dropdown-item>
            <el-dropdown-item> 课程主页 </el-dropdown-item>
            <el-dropdown-item @click="logout"> 退出登录 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useUserStore } from "@/store/user";
import { useRouter } from "vue-router";
import Hamburger from "@/components/hamburger/idnex.vue";
import Bread from "@/components/bread/index.vue";

const props = defineProps({
  userInfo: {
    type: Object,
    required: true,
  },
});

const userStore = useUserStore();
const router = useRouter();

async function logout() {
  await userStore.logout();
  router.push("/login");
}
</script>

<style scoped lang="less">
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.5s;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .bread-container {
    float: left;
  }
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;
    :deep(.avatar-container) {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
