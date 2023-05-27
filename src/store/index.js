// store.js atau store/index.js
import { createStore } from "vuex";

const store = createStore({
  state: {
    token: localStorage.getItem("token") || null, 
  },
  mutations: {
    setToken(state, token) {
      state.token = token; 
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit("setToken", token); 
    },
    initializeToken({ commit }) {
      const token = localStorage.getItem("token") || null; 
      commit("setToken", token); 
    },
  },
});


export default store;
