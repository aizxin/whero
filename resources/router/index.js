import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../pages/layout/Layout'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow.
// so only in production use lazy-loading; detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
 **/
/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/pages/login/index'), hidden: true },
  // { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: () => import('@/pages/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/pages/errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [{
      path: 'index',
      component: () => import('@/pages/home/index'),
      name: 'index',
      meta: { title: '首页', icon: 'dashboard', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
const _import = file => () => import('@/pages/' + file + '.vue')

export const asyncRouterMap = [
  {
    path: '/manage',
    component: Layout,
    redirect: 'manage/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '管理员',
      icon: 'lock',
    },
    children: [{
      path: 'index',
      component: _import('admin/index'),
      name: 'manage-admin',
      meta: {
        title: '管理员管理',
        roles: ['dev', 'edit'] // or you can only set roles in sub nav
      }
    }, {
      path: 'group',
      component: _import('admin/group'),
      name: 'admin-group',
      meta: {
        title: '管理员分组',
        roles: ['editor']
      }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

