import axios from "axios";
const URL = process.env.URL_API;
export function getRequest(url) {
    return new Promise((resolve,reject) => {
        axios
        .get(URL+url)
        .then(response => {
            resolve({status: response.status, body:response.data})
        }
        )
        .catch(error => {
         reject(error)
        })
    }) 
}
