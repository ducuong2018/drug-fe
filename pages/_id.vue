<template>
  <div class="product-detail">
    <div class="breakcrumb">
      <a href="/" class="link">Trang chủ</a>
      <a v-for="category in productDetail.category" :key="category.id" href="/" class="link">{{ category.name }}</a>
    </div>
  </div>
</template>
<script>
import { getRequest } from "@/plugins/api.js";
export default {
  name: "ProductDetailPage",
  data() {
    return {
      productDetail: {},
    };
  },
  async fetch() {
    console.log(this.$route);
    const { status, body } = await getRequest(
      `products?slug=${this.$route.params.id}`
    );
    this.productDetail = status === 200 ? body : {};
  },
};
</script>
<style lang="scss" scoped>
.product-detail {
  /* max-width: 1440px; */
  > .breakcrumb {
    width: 1270px;
    margin-right: auto;
    margin-left: auto;
    padding: 12px 15px;
    
  }
  > .breakcrumb > .link {
    color: rgb(128, 128, 137);
  }
}
</style>