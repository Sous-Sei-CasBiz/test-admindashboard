import { createStore } from "vuex";

const store = createStore({
  state: {
    accessToken: JSON.parse(localStorage.getItem("token")) ?? "",
    accessUsers: JSON.parse(localStorage.getItem("Users")) ?? "",
  },
  getters: {
    getToken(state) {
      return state.accessToken;
    },
    getUsers(state) {
      return state.accessUsers;
    },
  },
  mutations: {
    setAuth(state, data) {
      state.accessToken = data;
      localStorage.setItem("token", JSON.stringify(data));
    },
    setUser(state, data) {
      state.accessUsers = data;
      localStorage.setItem("Users", JSON.stringify(data));
    },
  },
  actions: {
    async login({ commit }, payload) {
      try {
        const requestOptions = {
          method: "POST",
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache",
          referrerPolicy: "no-referrer",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:8080",
          },

          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
          }),
        };
        await fetch(`https://reqres.in/api/login`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            commit("setAuth", data.token);
            commit("setUsers", data);
          })

      } catch (err) {
        return console.error(err);
      }
    },
  },
});

export default store;
