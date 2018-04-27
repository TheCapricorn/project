// import reqwest from 'reqwest'
import axios from 'axios'
import {message} from 'antd';
import history from '@/history/history'

/*export const post=(url,data,config)=>{
  return reqwest({
    url: baseUrl+url,
    method: 'post',
    type: 'json',
    // contentType: 'application/json',
    data,
    ...config
  }).then(res => {
    return res
  },err=>{
    console.log(err);
    message.warn('网络异常')
  });
};
export const get=(url,data,config)=>{
  return reqwest({
    url: baseUrl+url,
    method: 'get',
    type: 'json',
    // contentType: 'application/json',
    data,
    ...config
  }).then(res => {
    return res
  },err=>{
    console.log(err);
    message.warn('网络异常')
  });
};*/


const instance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  // headers: {'X-Custom-Header': 'foobar'}
});

export const get = ({url, msg = '网络异常', config}) =>
  instance.get(url, config).then(res => res.data).catch(err => {
    console.log(err);
    message.warn(msg);
  });


export const post = ({url, data, msg = '网络异常', config}) =>
  instance.post(url, data, config).then(res => {
    // console.log(res);
    switch (res.data.code) {
      case 10001:
        history.push('/login');
        break;
      case 200:
        return res.data;
      case 400:
        // console.log(res.data);
        message.warn(res.data.message);
        break;
      case 404:
        message.warn(res.data.message);
        break;
      case 500:
        message.warn(res.data.message);
        break;
      default:
        break;
    }
  }).catch(err => {
    console.log(err);
    message.warn(msg);
  });
