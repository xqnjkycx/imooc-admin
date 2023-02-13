<template>
  <el-sub-menu v-if="props.route.children" :index="props.route.path">
    <template #title>
      <svg-icon :icon="props.route.meta.icon"></svg-icon>
      <span class="item-text">{{ props.route.meta.title }}</span>
    </template>
    <sidebar-item
      v-for="subRoute in props.route.children"
      :key="subRoute.path"
      :route="subRoute"
    >
    </sidebar-item>
  </el-sub-menu>
  <el-menu-item v-else :index="props.route.path">
    <svg-icon :icon="props.route.meta.icon"></svg-icon>
    <span class="item-text">{{ props.route.meta.title }}</span>
  </el-menu-item>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
const props = defineProps({
  route: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped lang="less">
:deep(.el-menu-item.is-active) {
  background-color: #fb8c00 !important;
}
.item-text {
  margin-left: 4px;
}
</style>
