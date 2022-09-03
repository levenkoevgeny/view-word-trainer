import { api } from "@/api/auth_api"
import {
  getLocalItem,
  saveLocalItem,
  removeLocalItem
} from "@/utils"
import router from "@/router/router"

const state = () => ({
  token: null,
  userId: null,
  isLoggedIn: null,
  isLogInError: null,
  isRegistrationError: null,
  user: null
})

// getters
const getters = {
  getToken(state) {
    return state.token
  },
  getUserId(state) {
    return state.userId
  },
  getIsLoggedIn(state) {
    return state.isLoggedIn
  },
  getIsLogInError(state) {
    return state.isLogInError
  },
  getIsRegistrationError(state) {
    return state.isRegistrationError
  },
  getUser(state) {
    return state.user
  }
}

// actions
const actions = {
  async actionLogIn({ commit }, payload) {
    try {
      let { username, password } = payload
      const response = await api.logInGetToken(username, password)
      const {token, user_id} = await response.data
      if (token) {
        saveLocalItem("token", token)
        saveLocalItem("user_id", user_id)
        commit("setToken", token)
        commit("setUserId", user_id)
        commit("setLoggedIn", true)
        commit("setIsLogInError", false)
        const response = await api.getUserData(token, user_id)
        const userData = await response.data
        commit("setUserData", { ...userData })
      }
    } catch (error) {
      commit("setIsLogInError", true)
    }
  },

  async actionRegistration({ commit }, payload) {
    let { username, password } = payload
    try {
      await api.registration(username, password)
      await router.replace({ name: "login" })
    } catch (error) {
      commit("setIsRegistrationError", true)
    }
  },

  async actionCheckLoggedIn({ state, commit, dispatch }) {
    if (!state.isLoggedIn) {
      let token = state.token
      let user_id = state.userId
      if (!token) {
        const localToken = getLocalItem("token")
        if (localToken) {
          commit("setToken", localToken)
          token = localToken
        }
      }
      if (!user_id) {
        const localUserId = getLocalItem("user_id")
        if (localUserId) {
          commit("setUserId", localUserId)
          user_id = localUserId
        }
      }

      if (token) {
        try {
          const response = await api.getUserData(token, user_id)
          const userData = await response.data
          commit("setUserData", { ...userData })
          commit("setLoggedIn", true)
        } catch (error) {
          dispatch("actionRemoveLogIn")
        }
      } else {
        dispatch("actionRemoveLogIn")
      }
    }
  },

  async actionRemoveLogIn({ state, commit }) {
    removeLocalItem("token")
    removeLocalItem("user_id")
    commit("setToken", "")
    commit("setLoggedIn", false)
  },

  async updateUserData({ state, commit }, payload) {
    // добавить код
    commit("setUserData", { ...payload })
  }
}

// mutations
const mutations = {
  setLoggedIn(state, payload) {
    state.isLoggedIn = payload
  },
  setToken(state, payload) {
    state.token = payload
  },
  setUserId(state, payload) {
    state.userId = payload
  },
  setUserData(state, payload) {
    state.user = payload
  },
  setIsLogInError(state, payload) {
    state.isLogInError = payload
  },
  setIsRegistrationError(state, payload) {
    state.isRegistrationError = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}