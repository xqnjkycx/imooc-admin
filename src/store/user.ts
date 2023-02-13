import { defineStore } from "pinia";
import { loginRequest, getUserInfoRequest } from "@/api/system";
import { setItem, getItem, removeAllItem } from "@/utils/tools/storage";
import { setTimeStamp } from "@/utils/tools/auth";
import { TOKEN } from "@/utils/tools/contrast";
import md5 from "md5";

interface userInfo {
  username: string;
  password: string;
}

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: getItem(TOKEN) || "",
      userInfo: {},
    };
  },
  actions: {
    setToken(token: string) {
      setItem(TOKEN, token);
    },
    setUserInfo(userInfo: Object) {
      this.userInfo = userInfo;
    },
    // 请求登陆
    login(userInfo: userInfo) {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        loginRequest({
          username,
          password: md5(password),
        })
          .then((res: any) => {
            this.setToken(res.token);
            setTimeStamp();
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 退出登录
    logout() {
      return new Promise((resolve, reject) => {
        this.setToken("");
        this.setUserInfo({});
        removeAllItem();
        resolve(undefined);
      });
    },
    // 获取用户信息
    getUserInfo() {
      return new Promise((resolve, reject) => {
        getUserInfoRequest()
          .then((res: any) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
