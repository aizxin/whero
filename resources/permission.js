import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })


function hasPermission (roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/authredirect']

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  let userInfo = store.state.userInfo
  // if (userInfo) {
  userInfo = await store.dispatch('GetUserInfo')
  if (userInfo) { // 如果用户登陆,请求用户能访问的节点
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger_afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        const roles = userInfo.roles // note: roles must be a array! such as: ['editor','develop']
        store.dispatch('GenerateRoutes', roles).then((accessedRouters) => {
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()//
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true } })
        }
      }
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      Message.error('请登陆')
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger_afterEach hook, so manually handle it
    }
  }
  // }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
