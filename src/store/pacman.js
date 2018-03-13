// initial state
const state = {
    loading: true
}

// getters
const getters = {
    loading: state => state.loading
}

// actions
const actions = {
    isLoading ({ commit, state }) {
        console.log('loading')
        commit('UPDATE_LOADING', true)
    },
    notLoading ({ commit, state }) {
        console.log('not loading')
        commit('UPDATE_LOADING', false)
    }
}

// mutations
const mutations = {
    /* eslint-disable no-useless-computed-key */
    ['UPDATE_LOADING'] (state, loading) {
        state.loading = loading
    }
}
// export the store module
export default {
    state,
    getters,
    actions,
    mutations
}
