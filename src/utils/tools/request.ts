import axios from "axios";

const service = axios.create({
  baseURL: __VUE_APP_BASE_API,
  timeout: 5000,
});

export default service;
