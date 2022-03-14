<template>
  <div class="product-detail">
    <div class="breakcrumb">
      <a href="/" class="link">Trang chủ</a>
      <a
        v-for="category in productDetail.category"
        :key="category.id"
        href="/"
        class="link"
      >
        > {{ category.name }}</a
      >
    </div>
    <div v-if="!loading" class="product">
      <div class="header flex">
        <div class="image">
          <img :src="productDetail.images[0].url" alt="image" />
        </div>
        <div class="content">
          <div class="name">{{ productDetail.name }}</div>
          <div class="price-icon">
            <div class="sale">{{ $formatVND(productDetail.salePrice) }}</div>
            <div class="discount-price flex">
              <div class="price">{{ $formatVND(productDetail.price) }}</div>
              <div class="discount">
                -
                {{
                  100 - (productDetail.salePrice / productDetail.price) * 100
                }}
                %
              </div>
            </div>
          </div>
          <div class="add-card">
            <div class="quanty"><span>Số lượng</span></div>
            <div class="btn flex">
              <button class="icon">
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg"
                  alt="remove"
                />
              </button>
              <input class="input" :value="1" />
              <button class="icon">
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg"
                  alt="add"
                />
              </button>
            </div>
          </div>
          <div class="wrap-buy">
            <button class="addToCard">Thêm vào giỏ hàng</button>
          </div>
        </div>
        <div class="delivery-form">
          <div class="label">Các hình thức giao hàng</div>
          <div class="content">
            <img
              src="https://www.pharmacity.vn/icons/star-green.svg"
              alt="star-icon"
            /><span>Freeship&nbsp;</span>cho đơn hàng từ <span>&nbsp;300k</span>
          </div>
        </div>
      </div>
      <div class="body">
        <div class="flex flex-col">
          <div class="label">Mô tả sản phẩm</div>
          <div class="description mt-1 mb-3">
            {{ productDetail.description }}
          </div>
        </div>
        <div class="flex flex-col">
          <div class="label">Mô tả chi tiết sản phẩm</div>
          <div class="description" v-html="productDetail.longDescription"></div>
        </div>
      </div>
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
      loading: false,
    };
  },
  async fetch() {
    this.loading = true;
    const { status, body } = await getRequest(
      `products?slug=${this.$route.params.id}`
    );
    this.productDetail = status === 200 ? body : {};
    if (status === 200) {
      this.loading = false;
    }
  },
};
</script>
<style lang="scss" scoped>
.product-detail {
  > .breakcrumb {
    width: 1270px;
    margin-right: auto;
    margin-left: auto;
    padding: 12px 15px;
  }
  > .breakcrumb > .link {
    color: rgb(128, 128, 137);
  }
  > .product {
    background: #fff;
    max-width: 1240px;
    width: 100%;
    margin: 0 auto;
  }
  > .product > .header > .image {
    height: 444px;
    width: 444px;
  }
  > .product > .header > .content {
    margin: 24px;
  }
  > .product > .header > .content > .name {
    margin: 0px 0px 4px;
    color: rgb(36, 36, 36);
    font-size: 24px;
    font-weight: 500;
    line-height: 32px;
    word-break: break-word;
    margin-bottom: 24px;
  }
}
.price-icon {
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background-color: rgb(250, 250, 250);
  padding: 0px 16px 12px;
  margin-bottom: 48px;
  > .sale {
    font-size: 32px;
    line-height: 40px;
    margin-right: 8px;
    font-weight: 500;
    color: rgb(255, 66, 78);
  }
}
.discount-price {
  > .price {
    color: rgb(128, 128, 137);
    text-decoration: line-through;
    font-size: 14px;
    line-height: 20px;
  }
  > .discount {
    font-weight: 400;
    margin-left: 8px;
    border: 1px solid rgb(255, 66, 78);
    border-radius: 2px;
    background-color: rgb(255, 240, 241);
    color: rgb(255, 66, 78);
    line-height: 18px;
    font-size: 14px;
    padding: 0px 4px;
  }
}
.add-card {
  display: flex;
  flex-direction: column;
  margin: 16px 0px 0px;
  padding: 16px 0px;
  border-top: 1px solid rgb(242, 242, 242);
  > .btn {
    display: flex;
    align-items: center;
    margin-top: 8px;
  }
  > .btn > .icon {
    border-left: none;
    border-radius: 0px 4px 4px 0px;
    padding: 4px;
    cursor: pointer;
    width: 30px;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(236, 236, 236);
    height: 30px;
    color: rgb(36, 36, 36);
    font-size: 14px;
    text-align: center;
    outline: none;
    transition: border-color 0.15s ease-in-out 0s,
      box-shadow 0.15s ease-in-out 0s;
  }
  > .btn > .input {
    width: 40px;
    border: 1px solid rgb(236, 236, 236);
    height: 30px;
    color: rgb(36, 36, 36);
    font-size: 14px;
    text-align: center;
    outline: none;
    transition: border-color 0.15s ease-in-out 0s,
      box-shadow 0.15s ease-in-out 0s;
  }
}
.wrap-buy {
  > .addToCard {
    border: 1px solid rgb(13, 92, 182);
    font-size: 16px;
    font-weight: 700;
    line-height: 1.6;
    color: rgb(13, 92, 182);
    flex-direction: column;
    text-transform: unset;
    background: white;
    -webkit-box-pack: center;
    justify-content: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: 8px 12px;
  }
}
.body {
  padding: 16px;
  > .flex > .label {
    color: rgb(51, 51, 51);
    font-size: 20px;
    font-weight: 400;
    line-height: 32px;
    text-transform: capitalize;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px;
  }
  > .flex > .description > p {
    margin-top: 12px;
    margin-bottom: 12px;
  }
}
.delivery-form {
  margin: 36px 16px 16px;
  position: relative;
  border: 1px solid #e5e5e5;
  height: fit-content;
  width: 325px;
  padding: 8px 20px;
  border-radius: 0.75rem;
  box-sizing: border-box;
  > .label {
    font-size: 16px;
    font-weight: 700;
  }
  > .content {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #5e6f88;
  }
  > .content > img {
    height: 13px;
    width: 14px;
  }
}
</style>