<template>
  <div v-if="products.length > 1" class="list-product">
    <a
      v-for="product in products"
      :key="product.id"
      :href="'/' + product.slug"
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
  <div v-else>Không tìm thấy sản phẩm</div>
</template>
<script>
export default {
  name: "ProductComponent",
  props: {
    products: {
      type: [Object, Array],
      default: [],
    },
  },
};
</script>
<style lang="scss" scoped>
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
    height: 350px;
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