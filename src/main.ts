import { createApp } from "vue";
import { awaitTryCatchPlugin } from "./plugins/AwaitErrorCatchPlugin";
import { SvgIconPlugin } from "./plugins/SvgIconPlugin";
import "./styles/index.css";
import router from "./router";
import App from "./App.vue";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(awaitTryCatchPlugin);
app.use(SvgIconPlugin);
app.mount("#app");
