<template>
  <div class="header-section bg-gradient-to-r from-cyan-500 to-blue-500">
    <div class="header flex items-center justify-between">
      <div class="logo-menu flex">
        <a href="/" class="link">
          <img src="@/assets/images/logo-drug.png" alt="logo" />
        </a>
      </div>
      <div class="search-form flex">
        <input
          class="search"
          placeholder="Tìm sản phần, bạn muốn gì..........."
        />
        <button class="btn">
          <img
            class="icon"
            src="https://salt.tikicdn.com/ts/upload/ed/5e/b8/8538366274240326978318348ea8af7c.png"
          />
          Tìm Kiếm
        </button>
      </div>
      <div class="user-shortcut">
       <div v-if="user.name" class="wrap-user">
         <div class="icon flex items-center justify-center">{{user.name.slice(0,1)}}</div>
         <span class="flex flex-col">
           <span class="label">Tài khoản</span>
           <span class="name">{{ user.name }} <img class="arrow" src="https://salt.tikicdn.com/ts/upload/d7/d4/a8/34939af2da1ceeeae9f95b7485784233.png"></span>
         </span>
         </div>
        <div v-else class="account" @click="isShowLogin = true">
          <img
            class="icon"
            src="	https://salt.tikicdn.com/ts/upload/67/de/1e/90e54b0a7a59948dd910ba50954c702e.png"
            alt="account"
          />
          <div class="content flex flex-col">
            <span>Đăng Nhập / Đăng Ký</span>
            <span>Tài khoản</span>
          </div>
        </div>
        <div class="card flex items-end">
          <img
            class="icon"
            src="https://salt.tikicdn.com/ts/upload/40/44/6c/b80ad73e5e84aeb71c08e5d8d438eaa1.png"
          />
          <span>Giỏ Hàng</span>
        </div>
      </div>
    </div>
    <login-component
      v-show="isShowLogin"
      @close="closeFormLogin"
      @getUserDetail="getUserDetail"
    />
  </div>
</template>
<script>
import LoginComponent from "@/components/login.vue";
export default {
  name: "HeaderSection",
  components: {
    LoginComponent,
  },
  data() {
    return {
      isShowLogin: false,
      user: {},
    };
  },
    async created() {
    if(localStorage.getItem("token")) {
       const { status, body } = await this.$getRequest("user", true);
      if (status === 200) {
        this.user = body;
      }
    }
  },
  methods: {
    closeFormLogin() {
      this.isShowLogin = false;
    },
    async getUserDetail() {
      const { status, body } = await this.$getRequest("user", true);
      if (status === 200) {
        this.isShowLogin = false;
        this.user = body;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap-user {
  cursor: pointer;
    margin: 0px 0px 0px 16px;
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    color: rgb(255, 255, 255);
    font-size: 12px;
    position: relative;
    width: 162px;
    > .icon {
    width: 32px;
    height: 32px;
    margin-right: 8px;
    border-radius: 2px;
    font-size: 24px;
    }
    > .flex {
      > .name {
        display: flex;
        align-items: center;
        > .arrow {
          height: 16px;
          width: 16px;
        }
      }
    }
}
.header-section {
  z-index: 999;
  width: 100%;
  > .header {
    position: relative;
    width: 1240px;
    margin: 0 auto;
    padding: 16px 0;
  }
  > .header > .logo-menu > .link {
    width: 60px;
    height: 40px;
  }
}
.search-form {
  background: rgb(255, 255, 255);
  height: 40px;
  width: 626px;
  > .search {
    border: 0px;
    padding: 0px 12px;
    font-size: 13px;
    border-radius: 2px 0px 0px 2px;
    outline: none;
  }
  > .btn {
    cursor: pointer;
    border: 0px;
    width: 120px;
    background: rgb(13, 92, 182);
    height: 40px;
    border-radius: 0px 2px 2px 0px;
    color: white;
    font-size: 13px;
    font-weight: 500;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    > .icon {
      width: 20px;
      height: 20px;
      margin: 0px 8px 0px 0px;
    }
  }
}
.user-shortcut {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  > .account {
    cursor: pointer;
    margin: 0px 0px 0px 16px;
    align-items: center;
    display: flex;
    color: rgb(255, 255, 255);
    font-size: 12px;
    position: relative;
    width: 162px;
  }
  > .account > .icon {
    width: 32px;
    height: 32px;
    margin-right: 8px;
    border-radius: 2px;
  }
  > .card {
    cursor: pointer;
    margin: 0px 0px 0px 16px;
    -webkit-box-align: center;
    display: flex;
    color: rgb(255, 255, 255);
    font-size: 12px;
    position: relative;
    align-items: flex-end;
    width: 94px;
  }
  > .card > .icon {
    width: 32px;
    height: 32px;
  }
}
</style>
