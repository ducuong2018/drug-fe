import Vue from 'vue';
import GAuth from 'vue-google-oauth2';
import axios from "axios";
const URL = process.env.URL_API;
Vue.prototype.$formatVND = function (price) {
    return price.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
    });
}
Vue.prototype.$getRequest = function  (url) {
    return new Promise((resolve, reject) => {
        axios
            .get(URL + url)
            .then(response => {
                resolve({ status: response.status, body: response.data })
            }
            )
            .catch(error => {
                reject(error)
            })
    })
}
Vue.prototype.$postRequest = function   (url, data) {
    return new Promise((resolve, reject) => {
        axios.post(URL + url, data).then((response) => {
            resolve({ status: response.status, body: response.data })
        }).catch(error => {
            reject(error)
        })
    });
}
const gauthOption = {
  clientId: '661541043064-1prr1brmk7rpo8divc1en63kl07d9ale.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

