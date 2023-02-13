<template>
  <el-breadcrumb class="breadcrumb">
    <el-breadcrumb-item
      class="breadcrumb-item"
      v-for="item in matchedRoutes"
      :key="item.path"
      @click="changeRoute(item)"
    >
      <span v-if="item.path === route.path">{{ item.meta.title }}</span>
      <span v-else class="no-redirect">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const matchedRoutes = ref<any>([]);

function initBread() {
  matchedRoutes.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  );
  console.log(matchedRoutes.value);
}

function changeRoute(route) {
  router.push(route.path);
}

watch(route, () => {
  initBread();
});

onMounted(() => {
  initBread();
});
</script>

<style scoped lang="less">
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: pointer;
  }
}
</style>
