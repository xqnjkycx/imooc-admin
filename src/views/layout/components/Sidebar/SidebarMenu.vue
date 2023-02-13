<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    :default-active="activeMenu"
    background-color="#455A64"
    text-color="#fff"
    active-text-color="#fff"
    :collapse="!appStore.sidebarOpened"
    router
  >
    <sidebar-item v-for="item in menuData" :key="item.path" :route="item">
    </sidebar-item>
  </el-menu>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { formatRouterMenuData } from "@/utils/tools/router";
import { useAppStore } from "@/store/app";
import SidebarItem from "./SidebarItem.vue";
const router = useRouter();
const route = useRoute();
const menuData = ref<Array<any>>([]);
const appStore = useAppStore();

function initSideBar() {
  const routes = router.options.routes;
  menuData.value = formatRouterMenuData(routes);
}

const activeMenu = computed(() => {
  const { path } = route;
  return path;
});

onMounted(() => {
  initSideBar();
});
</script>

<style scoped lang="less">
// 修复el-menu右侧多一像素的问题
.el-menu {
  border-right: none;
  .el-menu-item.is-active {
    background-color: #fb8c00 !important;
  }
}
</style>
