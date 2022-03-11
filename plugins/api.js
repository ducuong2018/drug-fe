import axios from "axios";
export function getRequest(url) {
    return new Promise((resolve,reject) => {
        axios
        .get(url)
        .then(response => {
            resolve({status: response.status, body:response.data})
        }
        )
        .catch(error => {
         reject(error)
        })
    }) 
}
