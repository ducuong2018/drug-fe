<template>
  <div class="category-bar">
    <div class="container flex items-center justify-between">
      <a
        v-for="category in categoriesLv1"
        :key="category.id"
        :href="category.slug"
        class="category"
        >{{ category.name }}</a
      >
    </div>
  </div>
</template>

<script>
import { getRequest } from "@/plugins/api.js";
export default {
  name: "IndexPage",
  layout: "default",
  data() {
    return {
      categories: [],
      categoriesLv1: [],
    };
  },
  async fetch() {
    const { status, body } = await getRequest(
      "http://localhost:8082/v1/category"
    );
    this.categories = status === 200 ? body : [];
    this.categoriesLv1 = this.categories.filter((item) => item.level === 1);
    console.log(this.categoriesLv1);
  },
};
</script>
<style lang="scss" scoped>
.category-bar {
  background: #fff;
  height: 44px;
  > .container {
    width: 1240px;
    padding: 15px 0px;
    margin: 0px auto;
    position: relative;
    height: 44px;
  }
  > .container > .category {
    font-size: 14px;
    text-decoration: none;
    color: rgb(56, 56, 61);
  }
}
</style>
