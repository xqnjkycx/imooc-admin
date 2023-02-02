import SvgIcon from "@/components/SvgIcon/index.vue";
import { App } from "vue";

export const SvgIconPlugin = {
  install(app: App) {
    /** require.context 函数可以创建自己的上下文
     *  require 函数可以接受三个参数 ：需要搜索的目录string 是否搜索子目录boolean 匹配文件正则表达式exp
     * **/
    const svgRequire = require.context("../assets/icons", false, /\.svg$/);
    /**
     * 通过svgReuire.keys 可以扫描所选文件夹内部的资源，将资源传入到require函数中，完成本地svg图标的导入
     */
    svgRequire.keys().forEach((svg) => {
      console.log(svg);
      svgRequire(svg);
    });
    app.component("svg-icon", SvgIcon);
  },
};
