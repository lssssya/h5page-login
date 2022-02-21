import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './actions'

const state = {
  userInfo: null
}

export default createStore({
  state,
  actions,
  mutations,
  modules: {}
})
