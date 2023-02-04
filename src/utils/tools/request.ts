import axios from "axios";
import { ElMessage } from "element-plus";
import { TOKEN } from "./contrast";
import { getItem } from "./storage";

const service = axios.create({
  baseURL: __VUE_APP_BASE_API,
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use((config) => {
  config.headers.icode = "DF3E81D3840CE967";
  const token = getItem(TOKEN);
  if (token) config.headers.Authorization = `Bearer ${token}`;
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
    ElMessage.error(error.message);
    return Promise.reject(new Error(error.message));
  }
);

export default service;
