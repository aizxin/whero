import axios from 'axios'
import ApiConfig from './config'
import store from '@/store'
import urlConfig from './urlConfig'
import {Message, MessageBox, Loading} from 'element-ui'

/**
 * 初始化 axios 的一些配置
 * @type {{baseUrl: *, timeout: number, headers: {"Content-Type": string, "X-Requested-With": string}, transformRequest: *[], responseType: string}}
 */
const config = {
  baseURL: ApiConfig.domain,
  timeout: 15000,
  headers: {'Content-Type': 'application/x-www-form-urlencoded', 'X-Requested-With': 'XMLHttpRequest'},
  transformRequest: [function (data) {
    // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }],
  responseType: 'json'
}
/**
 * 花开不同赏，花落不同悲.欲问相思处，花开花落时.
 * @type {AxiosInstance}
 */
const AxiosInit = axios.create(config)

/**
 * axios 请求拦截器,目前主要用户传递api 请求头
 */
AxiosInit.interceptors.request.use((config) => {
  return config
}, (err) => {
  return Promise.reject(err)
})

/**
 * axios 相应拦截器
 */
AxiosInit.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.reject(error)
})

/**
 * 通过 url 配置发起请求
 * @param url 需要请求的配置url
 * @param opts 请求参数
 * @param message 是否开启提示框
 */
export function request(url, opts, message = true) {
  // 是否显示 loading 提示
  _message(message)

  let method = urlConfig[url]
  if (method) {
    let typeOpts = typeof (opts)
    if (typeOpts == null || typeOpts !== 'object') {
      opts = {}
    }
    if (method.type.toLowerCase() === 'get') {
      return get(method.url, opts)
    } else if (method.type.toLowerCase() === 'post') {
      return post(method.url, opts)
    } else {
      console.log('非法请求')
    }
  } else {
    closeLoading()
    console.log('url 错误', '返回结果：err = ', '无法请求，无效的请求！', '建议使用 get 或者 post 请求试试', '\n')
  }
}

/**
 * post 请求
 * @param url 需要请求的 Url
 * @param data 请求带上的参数
 * @param message 是否开启提示信息
 * @returns {Promise<any>}
 */
export function post(url, data, message = true) {
  _message(message)
  return new Promise((resolve, reject) => {
    AxiosInit.post(url, data).then(res => {
      response(res.data)
      resolve(res.data)
    }).catch(res => {
      console.log('Customize Notice', res)
      closeLoading()
      reject(res)
    })
  })
}

/**
 * get 请求
 * @param url 请求的 Url
 * @param data 请求需要带上的参数
 * @param message 提示消息
 * @returns {Promise<any>}
 */
export function get(url, data, message) {
  _message(message)
  return new Promise((resolve, reject) => {
    AxiosInit.get(url, {
      params: data
    }).then((res) => {
      response(res.data)
      resolve(res.data)
    }).catch((response) => {
      console.log('Customize Notice', response)
      closeLoading()
      reject(response)
    })
  })
}

/**
 * 结果相应处理
 * @param data 接口返回的数据
 * @returns {boolean}
 */
export function response(data) {
  if (data == null) {
    Message({
      message: '接口相应错误,请核对接口...',
      type: 'error',
      duration: 5 * 1000
    })
    setTimeout(() => closeLoading(), 800)
    return false
  } else if (data.code !== 200 && data.code !== 401) {
    console.log(data.message)
    Message({
      message: data.message ? data.message :'接口相应错误,请核对接口...',
      type: 'error',
      duration: 5 * 1000
    })
    // 处理接口返回错误码
    setTimeout(() => closeLoading(), 300)
    return false
  } else if (data.code === 401) {
    MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      store.dispatch('FedLogOut').then(() => {
        // location.reload()// 为了重新实例化vue-router对象 避免bug
      })
    })
    return false
  } else if (data.code === 200) {
    setTimeout(() => closeLoading(), 300)
    return data
  }
}

/**
 * 关闭所有 loading 提示框
 */
function closeLoading() {
  Loading.service().close()
}

/**
 * 加载 loading 提示框
 * @param message 需要显示的 提示消息,当传递布尔值的时候 默认显示  加载中,请稍后...
 * @private
 */
function _message(message) {
  if (message && typeof (message) === 'boolean') {
    Loading.service({
      text: '加载中,请稍后...'
    })
  } else if (message && typeof (message) === 'string') {
    Loading.service({
      text: message
    })
  }
}

export default AxiosInit
