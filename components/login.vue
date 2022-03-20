<template>
  <div
    class="
      modal
      overflow-y-auto overflow-x-hidden
      fixed
      right-0
      left-0
      top-4
      z-50
      justify-center
      items-center
      h-modal
      md:h-full md:inset-0
    "
  >
    <div class="login">
      <img
        class="close"
        src="https://salt.tikicdn.com/ts/upload/fe/20/d7/6d7764292a847adcffa7251141eb4730.png"
        alt="icon"
        @click="login"
      />
      <div class="container">
        <div class="heading">
          <h4>Xin chào</h4>
          <p>Đăng nhập hoặc tạo tài khoản</p>
        </div>
        <input placeholder="Email" type="email" v-model="form.email" />
        <input placeholder="Mật khẩu" type="password" v-model="form.password" />
        <button @click="login">Đăng nhập</button>
        <p class="register">Đăng ký</p>
        <div class="social flex flex-col items-center">
          <span>Hoặc tiếp tục bằng</span>
          <button class="google" @click="$emit('close')">
            <img
              src="https://salt.tikicdn.com/ts/upload/1c/ac/e8/141c68302262747f5988df2aae7eb161.png"
              alt="google"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      form: {},
    };
  },
  methods: {
    loginWithGoogle() {
      this.$gAuth
        .signIn()
        .then((GoogleUser) => {
          // on success do something
          console.log("GoogleUser", GoogleUser);
          var userInfo = {
            loginType: "google",
            google: GoogleUser,
          };
          console.log(userInfo);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    async login() {
      const { status, body } = await this.$postRequest("login", this.form);
      if (status === 200) {
        localStorage.setItem("token", body.token);
        this.$emit("getUserDetail");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.modal {
  background: rgba(0, 0, 0, 0.53);
}
.login {
  position: relative;
  inset: 0px;
  border: none;
  background: rgb(255, 255, 255);
  overflow: unset;
  border-radius: 20px;
  outline: none;
  padding: 0px;
  width: 500px;
  margin: 80px auto;
  height: 500px;
  > .close {
    position: absolute;
    height: 32px;
    width: 32px;
    z-index: 2;
    cursor: pointer;
    right: 12px;
    top: 12px;
  }
  > .container {
    padding: 40px 45px 24px;
    > .heading {
      margin-bottom: 20px;
      > h4 {
        margin: 0px 0px 10px;
        font-size: 24px;
        font-weight: 500;
      }
      > p {
        margin: 0px;
        font-size: 15px;
      }
    }
    > input {
      width: 100%;
      padding: 10px 0px;
      border: none;
      font-size: 24px;
      color: rgb(36, 36, 36);
      outline: none;
      border-bottom: 1px solid rgb(224, 224, 224);
    }
    > button {
      margin: 30px 0px 10px;
      outline: none;
      border-radius: 4px;
      background: rgb(255, 66, 78);
      padding: 13px 0px;
      width: 100%;
      color: rgb(255, 255, 255);
      border: none;
      font-size: 20px;
      cursor: pointer;
    }
    > .register {
      margin: 10px 0px 0px;
      text-align: center;
      color: rgb(13, 92, 182);
      cursor: pointer;
    }
    > .social {
      text-align: center;
      margin: 20px 0px 0px;
      di > span {
        font-size: 15px;
        color: rgb(120, 120, 120);
        display: inline-block;
        background: rgb(255, 255, 255);
        padding: 0px 20px;
        position: relative;
        z-index: 2;
        &::before {
          content: "";
          width: 100%;
          height: 1px;
          background: rgb(242, 242, 242);
          position: absolute;
          left: 0px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
        }
      }
      > button {
        margin-top: 12px;
        height: 58px;
        width: 58px;
      }
    }
  }
}
</style>
