import Vue from 'vue';
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
