import axios, { Method } from 'axios';

const network = {
  get: null,
  post: null,
};

const request = (url: string, method: Method, data: any): Promise<any> => {
  const obj = method.toUpperCase() === 'GET' ? { params: data } : { data };
  return axios({
    method: method,
    url,
    ...obj,
  }).then((resp) => resp.data);
};

['get', 'post'].forEach((method: Method) => {
  network[method] = (url: string, data: any): Promise<any> =>
    request(url, method, data);
});

export default network;
