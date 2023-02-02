import { defineStore } from "pinia";
import { loginRequest } from "@/api/system";
import md5 from "md5";

interface userInfo {
  username: string;
  password: string;
}

export const useUserStore = defineStore("user", {
  actions: {
    login(userInfo: userInfo) {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        loginRequest({
          username,
          password: md5(password),
        })
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
