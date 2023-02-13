import axios from "axios";
//import { ElMessage, ElLoading } from "element-plus";
import { TOKEN } from "./contrast";
import { getItem } from "./storage";
import { isCheckTimeout } from "./auth";
import router from "@/router";

const service = axios.create({
  baseURL: __VUE_APP_BASE_API,
  timeout: 5000,
});

// 返回登录页
function backToLoginPage(): void {
  const loadingConfig = {
    text: "正在返回登录页...",
    background: "rgba(0, 0, 0, 0.7)",
  };
  import("@/store/user").then((storeModule) => {
    const userStore = storeModule.useUserStore();
    const loadingInstance = ElLoading.service(loadingConfig);
    setTimeout(async () => {
      loadingInstance.close();
      await userStore.logout();
      router.push("/login");
    }, 2500);
  });
}

// 请求拦截器
service.interceptors.request.use((config) => {
  config.headers.icode = "DF3E81D3840CE967";
  const token = getItem(TOKEN);
  if (token) {
    const isTokenTimeOut = isCheckTimeout();
    if (isTokenTimeOut) {
      backToLoginPage();
      return Promise.reject(new Error("出错啦！token 失效了"));
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data;
    if (success) return data;
    else {
      ElMessage.error(message);
      return Promise.reject(new Error(message));
    }
  },
  (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      backToLoginPage();
    }
    ElMessage.error(error.message);
    return Promise.reject(new Error(error.message));
  }
);

export default service;
