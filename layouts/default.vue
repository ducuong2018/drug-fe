<template>
  <div class="main-content">
    <header-component />
    <Nuxt class="app" />
  </div>
</template>
<script>
import HeaderComponent from "@/components/header.vue";
export default {
  name: "LayoutDefault",
  components: {
    HeaderComponent,
  },
};
</script>
<style lang="scss" scoped>
.main-content {
  > .app {
    min-width: 1280px;
  }
}
</style>