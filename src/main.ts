import { createApp } from "vue";
import { awaitErrorCatchPlugin } from "./plugins/AwaitErrorCatchPlugin";
import "./styles/index.css";
import router from "./router";
import App from "./App.vue";

const app = createApp(App);

app.use(router);
app.use(awaitErrorCatchPlugin);
app.mount("#app");
