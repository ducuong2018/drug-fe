<template>
  <div
    class="
      hidden
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
    <div class="login">login</div>
  </div>
</template>
<script>
export default {
  name: "LoginComponent",
};
</script>
<style lang="scss" scoped>
.login {
  position: relative;
  inset: 0px;
  border: none;
  background: rgb(255, 255, 255);
  overflow: unset;
  border-radius: 20px;
  outline: none;
  padding: 0px;
  width: 800px;
  margin: 80px auto;
  height: 800px;
}
</style>
