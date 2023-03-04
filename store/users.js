
export const state = () => ({
    users: []
  })
  
  export const mutations = {
    // store userdata into stor
    setUsers(state, users) {
      state.users = users
    }
  }
  
  export const actions = {
    async fetchUsers({ commit }) {
      // API request for list of users
      const users = await fetch('http://localhost:8080/list').then(res => res.json())
  
      commit('setUsers', users)
    },
    //  set userdata call
    storeUsers({ commit}, data) {
      commit('setUsers', data)
    }
  }