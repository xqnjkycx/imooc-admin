<template>
  <div class="login-container">
    <el-form
      class="login-form"
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
    >
      <div class="title-container">
        <h3 class="title">用户登陆</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <!-- 用户名输入框 -->
          <svg-icon icon="https://res.lgdsunday.club/user.svg"></svg-icon>
        </span>
        <el-input
          placeholder="username"
          name="username"
          type="text"
          v-model="loginForm.username"
        />
      </el-form-item>
      <!-- 密码输入框 -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input
          placeholder="password"
          name="password"
          v-model="loginForm.password"
          :type="showPassword ? 'text' : 'password'"
        />
        <span class="show-pwd" @click="changePasswordStatus">
          <svg-icon :icon="showPassword ? 'eyes' : 'eyes-close'"></svg-icon>
        </span>
      </el-form-item>
      <el-button type="primary" class="login-btn" @click="handleLogin"
        >登陆</el-button
      >
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, inject } from "vue";
import { useUserStore } from "@/store/user";
import { useRouter } from "vue-router";

const $tryCatchAwait = inject("$tryCatchAwait") as Function;
const router = useRouter();

// 密码是否明文显示
const showPassword = ref<boolean>(false);
function changePasswordStatus(): void {
  showPassword.value = !showPassword.value;
}

// 登陆
const userStore = useUserStore();
const loading = ref(false);
function handleLogin() {
  loginFormRef.value.validate(async (valid: boolean) => {
    if (!valid) return;
    loading.value = true;
    const res: Array<any> = await $tryCatchAwait(
      userStore.login(loginForm.value)
    );
    if (res[0]) {
      console.log(res[0]);
    }
    router.push("/");
  });
}

// 表单数据源
interface loginFormData {
  username: string;
  password: string;
}
const loginForm = ref<loginFormData>({
  username: "super-admin",
  password: "123456",
});

const loginFormRef = ref();

// 验证规则
interface RuleType {
  validator: Function;
  trigger?: string;
}
interface loginRulesData {
  username: Array<RuleType>;
  password: Array<RuleType>;
}

const loginRules = reactive<loginRulesData>({
  username: [
    {
      validator: validateUsername,
      trigger: "blur",
    },
  ],
  password: [
    {
      validator: validatePassword,
      trigger: "blur",
    },
  ],
});

function validateUsername(rule: any, value: any, callback: Function): void {
  if (value === "") {
    callback(new Error("用户名不能为空"));
  } else {
    callback();
  }
}

function validatePassword(rule: any, value: any, callback: Function): void {
  if (value === "") {
    callback(new Error("密码不能为空"));
  } else {
    callback();
  }
}
</script>

<style lang="less" scoped>
@bg: #2d3a4b;
@dark_gray: #889aa4;
@light_gray: #eee;
@cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: @bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 85%;

      .el-input__wrapper {
        width: 100%;
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        height: 47px;
        caret-color: @cursor;
        box-shadow: none;
        .el-input__inner {
          color: #fff;
        }
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: @dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: @light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: @dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .login-btn {
    width: 100px;
    margin-left: 210px;
  }
}
</style>
