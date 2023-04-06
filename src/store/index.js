import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  getters: {
  },
  mutations: {
    saveUser(state, user){
      state.user = user;
    }
  },
  actions: {
    saveUser(context, user){
      context.commit('saveUser', user);
    }
  },
  modules: {
  }
})
