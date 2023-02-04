import request from "@/utils/tools/request";
import { AxiosPromise } from "axios";

/**
 * 登陆
 * */

export function loginRequest(data: any): AxiosPromise {
  return request({
    url: "/sys/login",
    method: "POST",
    data,
  });
}

/**
 * 获取用户信息
 */
export function getUserInfoRequest(): AxiosPromise {
  return request({
    url: "/sys/profile",
  });
}
