<template>
  <div class="main-content">
    <header-component class="sticky top-0" />
    <Nuxt class="app" />
    <footer-component/>
  </div>
</template>
<script>
import HeaderComponent from "@/components/header.vue";
import FooterComponent from '@/components/footer.vue';
export default {
  name: "LayoutDefault",
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>
<style lang="scss" scoped>
.main-content {
  position: relative;
  > .app {
    min-width: 1280px;
    background: #f5f5fa;
  }
}
</style>