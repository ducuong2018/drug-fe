import Vue from 'vue'
Vue.prototype.$formatVND = function (price) {
    return price.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
    });
}

