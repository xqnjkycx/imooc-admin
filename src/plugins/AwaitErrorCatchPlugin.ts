import { App } from "vue";

// await报错 全局捕获
export const awaitTryCatchPlugin = {
  install(app: App) {
    app.provide("$tryCatchAwait", function (p: Promise<any>) {
      return p
        .then((res) => ({ error: null, result: res }))
        .catch((err) => ({
          error: err,
          result: null,
        }));
    });
  },
};
