import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

export default function createMessageBoardModule () {
  return {
    namespace: true,
    state: {
      comments: [],
      submitSuccess: false
    },
    getters,
    mutations,
    actions
  }
}
