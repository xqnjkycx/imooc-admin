<template>
  <div class="hamburger-container" @click="toggleClick">
    <svg-icon class="hamburger" :icon="hamburgerIcon" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useAppStore } from "@/store/app";
import SvgIcon from "@/components/SvgIcon/index.vue";

const appStore = useAppStore();

function toggleClick() {
  appStore.triggerSidebarOpened();
}

const hamburgerIcon = computed(() => {
  console.log(appStore.sidebarOpened);
  return appStore.sidebarOpened ? "hamburger-open" : "hamburger-close";
});
</script>

<style lang="less" scoped>
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
