<template>
  <div class="index-page">
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
    <div class="list-product">
      <a
        v-for="product in products"
        :key="product.id"
        :href="product.slug"
        class="product"
      >
        <div class="image">
          <img v-if="product.images" :src="product.images[0].url" alt="image" />
        </div>
        <div class="price">{{ formatVND(product.price) }}</div>
        <div class="sale">{{ formatVND(product.salePrice) }}</div>
        <div class="name">{{ product.name }}</div>
      </a>
    </div>
    <div class="view-more">
      <button 
        class="
          bg-transparent
          hover:bg-blue-500
          text-blue-700
          font-semibold
          hover:text-white
          py-2
          px-4
          border border-blue-500
          hover:border-transparent
          rounded
        "
        @click="loadMoreProducts"
      >
        Xem thêm
      </button>
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
      products: [],
      page:3,
    };
  },
  async fetch() {
    const category = await getRequest("category");
    this.categories = category.status === 200 ? category.body : [];
    this.categoriesLv1 = this.categories.filter((item) => item.level === 1);
    const product = await getRequest(
      "products?page=0&size=48"
    );
    this.products = product.status === 200 ? product.body : [];
    console.log(product.body);
  },
  methods: {
    formatVND(price) {
      return price.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });
    },
    async loadMoreProducts() {
      const { status, body } = await getRequest(
        `products?page=${this.page+1}&size=12`
      );
      if (status === 200) {
        this.products = [...this.products, ...body];
      }
      console.log(this.products);
    },
  },
};
</script>
<style lang="scss" scoped>
.index-page {
  > .view-more {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
  }
}
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
.list-product {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 auto;
  max-width: 1440px;
  > .product {
    padding: 12px;
    margin: 6px 9px;
    cursor: pointer;
    background: #fff;
    box-shadow: 0 0 12px rgb(15 61 145 / 12%);
    border-radius: 12px;
    box-sizing: border-box;
    width: 270px;
  }
  > .product > .image {
    height: 200px;
    width: 200px;
  }
  > .product > .price {
    text-decoration-line: line-through;
    color: #b2bac6;
    font-size: 12px;
    margin-top: 12px;
  }
  > .product > .sale {
    font-weight: 700;
    color: #0f62f9;
    font-size: 14px;
    margin-top: 6px;
  }
  > .product > .name {
    font-size: 16px;
    text-overflow: ellipsis;
    margin-top: 12px;
    max-height: 2.6em;
    line-height: 1.3em;
    overflow: hidden;
  }
}
</style>
