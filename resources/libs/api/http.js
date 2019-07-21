import { request, response, post, get } from './request'

/**
 * 发起 http 请求操作类
 */
class Http {
  static install (Vue) {
    Vue.prototype.$request = request
    Vue.prototype.$get = get
    Vue.prototype.$post = post
    Vue.prototype.response = response
    Vue.http = {
      $request: request,
      $post: post,
      $get: get,
      $response: response
    }
  }
}

export default Http
