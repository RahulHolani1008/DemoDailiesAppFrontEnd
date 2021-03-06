import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    isTeacher: true,
    user: {
      email: "",
      id: 0,
      fullName: ""
    },
    apiBaseURL: "http://localhost:8080",
  },
  plugins: [createPersistedState()],
  mutations: {
    changeIsTeacher(state, value) {
      state.isTeacher = value;
    },
    changeIsLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
    changeUser(state, value) {
      state.user = value;
    },
  },
  actions: {},
  modules: {}
});
