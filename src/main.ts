import { createApp } from "vue";
import { awaitTryCatchPlugin } from "./plugins/AwaitErrorCatchPlugin";
import { SvgIconPlugin } from "./plugins/SvgIconPlugin";
import "./styles/index.less";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(awaitTryCatchPlugin);
app.use(SvgIconPlugin);
app.mount("#app");
