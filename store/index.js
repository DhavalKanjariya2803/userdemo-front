
import Vuex from 'vuex'
import { state, mutations, actions } from './users'

const createStore = () => {
  return new Vuex.Store({
    state,
    mutations,
    actions
  })
}

export default createStore