<template>
  <div class="breakcrumb">
    <a href="/" class="link">Trang chủ</a>
    <a v-for="category in categories" :key="category.id" href="/" class="link">
      > {{ category.name }}</a
    >
  </div>
</template>
<script>
export default {
  name: "BreakCrumb",
  props: {
    categories: {
        type:Array,
        default:[]}
  },
};
</script>
<style lang="scss" scoped>
.breakcrumb {
  width: 1270px;
  margin-right: auto;
  margin-left: auto;
  padding: 12px 15px;
  > .link {
    color: rgb(128, 128, 137);
  }
}
</style>