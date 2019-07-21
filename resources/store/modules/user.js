import { request } from '@/libs/api/request'

const user = {
  state: {
    userInfo: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_USER_INFO: (state, user) => {
      state.userInfo = user
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 获取用户信息
    async GetUserInfo ({ commit, state }) {
      const response = await request('userinfo')
      if (response.code === 200) {
        const data = response.data
        commit('SET_USER_INFO', data)
        return data
      }
      return ''
    },
    // 登出
    async LogOut ({ commit, state }) {
      await request('logout')
      commit('SET_ROLES', [])
    },

    async LoginByUsername ({ commit, state }, data) {
      await request('login', data)
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      commit('SET_TOKEN', '')
    },

    // 动态修改权限
    async ChangeRoles ({ commit }, role) {
      const response = await request('userinfo', role)
      if (response.code === 200) {
        const data = response.data
        commit('SET_ROLES', data.roles)
        commit('SET_USER_INFO', data)
        return data
      }
    }
  }
}

export default user
