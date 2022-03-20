<template>
  <div class="index-page">
    <div class="category-bar">
      <div class="container flex items-center justify-between">
        <a
          v-for="category in categoriesLv1"
          :key="category.id"
          :href="'danhmuc/' + category.slug"
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
        <div class="price">{{ $formatVND(product.price) }}</div>
        <div class="sale">{{ $formatVND(product.salePrice) }}</div>
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
          flex
          items-center
          justify-center
        "
        @click="loadMoreProducts"
      >
        <svg
          v-if="loading"
          role="status"
          class="
            mr-2
            w-4
            h-4
            text-gray-200
            animate-spin
            dark:text-gray-600
            fill-blue-600
          "
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span v-else>Xem thêm</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  layout: "default",
  data() {
    return {
      categories: [],
      categoriesLv1: [],
      products: [],
      page: 3,
      loading: false,
    };
  },
  async fetch() {
    const category = await this.$getRequest("category");
    this.categories = category.status === 200 ? category.body : [];
    this.categoriesLv1 = this.categories.filter((item) => item.level === 1);
    const product = await this.$getRequest("products?page=0&size=40");
    this.products = product.status === 200 ? product.body : [];
  },
  methods: {
    async loadMoreProducts() {
      this.loading = true;
      const { status, body } = await this.$getRequest(
        `products?page=${this.page + 1}&size=10`
      );
      if (status === 200) {
        this.products = [...this.products, ...body];
        this.loading = false;
        this.page += 1;
      }
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
