<template>
  <div class="breakcrumb">
    <a href="/" class="link">Trang chủ</a>
    <div v-if="categories.length">
      <div v-for="category in categories" :key="category.id">
        <span v-if="category.name"> ></span>
        <a :href="'/danhmuc/' + category.slug"> {{ category.name }}</a>
      </div>
    </div>
    <div v-else>
      > <a :href="'/danhmuc/' + categories.slug">{{ categories.name }}</a>
    </div>
  </div>
</template>
<script>
export default {
  name: "BreakCrumb",
  props: {
    categories: {
      type: [Object, Array],
      default: [],
    },
  },
};
</script>
<style lang="scss" scoped>
.breakcrumb {
  width: 1270px;
  margin-right: auto;
  margin-left: auto;
  padding: 12px 15px;
  display: flex;
  align-items: center;
  color: rgb(128, 128, 137);
}
</style>