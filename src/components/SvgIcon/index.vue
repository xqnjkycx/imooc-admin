<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    :class="className"
  ></div>
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts" setup>
import { isExternal as external } from "@/utils/tools/validate";
import { defineProps, computed, CSSProperties } from "vue";

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: "",
  },
});

const isExternal = computed<boolean>(() => external(props.icon));

/** 外部svg图片样式 **/
const styleExternalIcon = computed<CSSProperties>(() => {
  return {
    mask: `url(${props.icon}) no-repeat 50% 50%`,
    "-webkit-mask": `url(${props.icon}) no-repeat 50% 50%`,
  };
});

/** 项目内图标样式 **/
const iconName = computed<string>(() => `#icon-${props.icon}`);
</script>

<style lang="less" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
