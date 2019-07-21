/**
 * 使用api 请求的 url 和 请求方式配置
 * 格式为: name: {url:''url,type:'get|post'}
 * @type {{login: {url: string, type: string}}}
 */
const urlConfig = {
  login: {},
  logout: {},
  userinfo: { url: 'info', type: 'post' },
  router: { url: 'router', type: 'post' },
  isLogin: { url: 'isLogin', type: 'post' },
}

export default urlConfig
