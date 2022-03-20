import Vue from 'vue';
import GAuth from 'vue-google-oauth2';
import axios from "axios";
const URL = process.env.URL_API;
const headers = {};
headers["Content-Type"] = "application/json";
Vue.prototype.$formatVND = function (price) {
    return price.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
    });
}
Vue.prototype.$getRequest = function (url, isToken = false) {
    if(isToken) headers["x-token"] = localStorage.getItem("token") || "";
    return new Promise((resolve, reject) => {
        axios
            .get(URL + url, isToken ? { headers: headers } : undefined)
            .then(response => {
                resolve({ status: response.status, body: response.data })
            }
            )
            .catch(error => {
                if (error.response.status === 403) {
                    localStorage.clear("token")
                }
                reject(error)
            })
    })
}
Vue.prototype.$postRequest = function (url, data, isToken = false) {
    return new Promise((resolve, reject) => {
        axios.post(URL + url, data, isToken ? { headers: headers } : undefined).then((response) => {
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

