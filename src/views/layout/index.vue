<template>
  <div class="app-wrapper">
    <!--左侧 sidebar-->
    <Sidebar id="guide-sidebar" class="sidebar-container" />
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部 navbar -->
        <Navbar :userInfo="userStore.userInfo" />
      </div>
      <!-- 内容 -->
      <div class="app-main">
        <app-main />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "@/store/user";
import { useAppStore } from "@/store/app";
import Navbar from "./components/NavBar/index.vue";
import Sidebar from "./components/SIdebar/index.vue";
import AppMain from "./components/AppMain/index.vue";
import variables from "@/styles/variables.module.less";

const userStore = useUserStore();
const appStore = useAppStore();

const menuBg = ref<string>(variables.menuBg);

async function initData() {
  const userInfo = await userStore.getUserInfo();
  afterGetUserInfo(userInfo);
}

function afterGetUserInfo(userInfo: any) {
  userStore.setUserInfo(userInfo);
}

const sideBarRealWidth = computed(() => {
  return appStore.sidebarOpened
    ? variables.sideBarWidth
    : variables.hideSideBarWidth;
});

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
  .main-container {
    position: relative;
    min-height: 100%;
    transition: margin-left 0.3s;
    margin-left: v-bind(sideBarRealWidth);
  }
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100vw - v-bind(sideBarRealWidth));
    transition: width 0.28s;
  }
  .sidebar-container {
    background-color: v-bind(menuBg);
    transition: width 0.3s;
    width: v-bind(sideBarRealWidth);
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
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
