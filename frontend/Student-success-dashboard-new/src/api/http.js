import axios from 'axios'


axios.defaults.timeout = 50000;
// axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
axios.defaults.withCredentials = true;

let http = {
    post: "",
    get: ""
};

http.post = function (api, params={}) {
    return new Promise((resolve, reject) => {
        axios.post(api, params).then((res) => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
};


http.get = function (api, params={}) {

    return new Promise((resolve, reject) => {
        axios.get(api, params).then((res) => {
            resolve(res);
        }).catch(err => {
            reject(err)
        })
    })
};

export default http