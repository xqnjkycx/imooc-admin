<template>
  <div class="app-wrapper">
    <!--左侧 sidebar-->
    <Sidebar id="guide-sidebar" class="sidebar-container" />
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部 navbar -->
        <Navbar />
      </div>
      <!-- 内容 -->
      <div class="app-main">
        <app-main />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUserStore } from "@/store/user";
import Navbar from "./components/NavBar/index.vue";
import Sidebar from "./components/SIdebar/index.vue";
import AppMain from "./components/AppMain/index.vue";
import variables from "@/styles/variables.module.less";

const userStore = useUserStore();

const menuBg = ref<string>(variables.menuBg);

function afterGetUserInfo(userInfo: any) {
  userStore.userInfo = userInfo;
}

async function initData() {
  const userInfo = await userStore.getUserInfo();
  afterGetUserInfo(userInfo);
}

onMounted(async () => {
  initData();
});
</script>

<style scoped lang="less">
@import "@/styles/mixin.less";
@import "@/styles/variables.module.less";

.app-wrapper {
  .clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100vw - @sideBarWidth);
  }
  .sidebar-container {
    background-color: v-bind(menuBg);
  }
  .app-main {
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
    padding: 61px 20px 20px 20px;
    box-sizing: border-box;
  }
}
</style>
