const state = () => ({
  token: null,
  isLoggedIn: false,
  user: { id: null, is_superuser: false, lastname: "" },
})

// getters
const getters = {
  getLastName(state) {
    return state.user.lastname
  },
}

// actions
const actions = {
  // async getAllProducts ({ commit }) {
  //     const products = await shop.getProducts()
  //     commit('setProducts', products)
  // }
}

// mutations
const mutations = {
  // setProducts (state, products) {
  //     state.all = products
  // },
  //
  // decrementProductInventory (state, { id }) {
  //     const product = state.all.find(product => product.id === id)
  //     product.inventory--
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
