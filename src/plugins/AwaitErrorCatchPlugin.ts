import { App } from "vue";

// 全局捕获
export const awaitErrorCatchPlugin = {
  install(app: App) {
    window.addEventListener("unhandledrejection", function (event: Event) {
      console.log(event, "自定义全局报错");
      event.preventDefault();
    });
  },
};
