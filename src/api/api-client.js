import axios from "axios";
const request = axios.create({
  baseURL: 'https://classobservation.herokuapp.com',
  timeout: 20000,
});
const apiClient = {
    get: (url, data = {}) => {
      return request({
        method: "get",
        url,
        params: data,
      })
        .then((response) => response)
        .catch((err) => {
          throw err;
        });
    },
    post: (url, data) => {
      return request({
        method: "post",
        url,
        data,
      })
        .then((response) => response)
        .catch((err) => {
          throw err;
        });
    },
    delete: (url, data, headers = {}) =>
      request({
        method: "delete",
        url,
        data,
        headers,
      })
        .then((response) => response)
        .catch((err) => {
          throw err;
        }),
    put: (url, data) =>
      request({
        method: "put",
        url,
        data,
      })
        .then((response) => response)
        .catch((err) => {
          throw err;
        }),
    patch: (url, data) =>
      request({
        method: "patch",
        url,
        data,
      })
        .then((response) => response)
        .catch((err) => {
          throw err;
        }),
  };
  
  export { apiClient };
  