<template>
  <div>
    <break-crumb :categories="categoriesLv1" />
    <div class="container">
      <div class="category">
        <h3>Danh mục</h3>
        <div v-for="lv2 in categoriesLv2" :key="lv2.id">
          <div class="item">
            <a :href="lv2.slug" class="flex items-center">
              <img :src="lv2.image" alt="image" />
              {{ lv2.name }}
            </a>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div v-for="lv3 in categoriesLv3" :key="lv3.id">
            <a
              :href="lv3.slug"
              v-if="lv3.parentId === lv2.id"
              class="linklv3 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-2 w-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              {{ lv3.name }}</a
            >
          </div>
        </div>
      </div>
      <product :products="products" class="product" />
    </div>
    <div v-if="products.length > 1" class="view-more">
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
import BreakCrumb from "@/components/breakcrumb.vue";
import Product from "@/components/product.vue";
export default {
  name: "CategoryPage",
  components: { BreakCrumb, Product },
  data() {
    return {
      products: [],
      categoriesLv1: [],
      categoriesLv2: [],
      categoriesLv3: [],
      loading: false,
      page: 3,
    };
  },
  async fetch() {
    const product = await this.$getRequest(
      `products?slugCategory=${this.$route.params.slug}&page=0&size=40`
    );
    this.products = product.status === 200 ? product.body : [];
    const category = await this.$getRequest(
      `category_detail?slug=${this.$route.params.slug}`
    );
    this.categoriesLv1 =
      category.status === 200 ? category.body.categoryLv1 : [];
    this.categoriesLv2 =
      category.status === 200 ? category.body.categoryLv2 : [];
    this.categoriesLv3 =
      category.status === 200 ? category.body.categoryLv3 : [];
  },
  methods: {
    async loadMoreProducts() {
      this.loading = true;
      const { status, body } = await this.$getRequest(
        `products?slugCategory=${this.$route.params.slug}&page=${
          this.page + 1
        }&size=10`
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
.view-more {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
}
.container {
  display: flex;
  width: 100%;
  > .category {
    width: 30%;
    background: #fff;
    border-right: 1px solid #e5e5e5;
    > h3 {
      font-size: 24px;
      font-weight: 700;
      line-height: 32px;
      margin: 20px 0 22px 12px;
      text-align: center;
    }
    > div > .item {
      display: flex;
      align-items: center;
    }
    > div > .item > a > img {
      height: 52px;
      width: 52px;
    }
    > div > .item > button {
      margin-left: 12px;
    }
    > div > div > .linklv3 {
      margin-left: 32px;
    }
  }
  > .product {
    width: 70%;
  }
}
</style>