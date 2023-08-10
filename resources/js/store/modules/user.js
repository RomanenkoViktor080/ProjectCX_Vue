const state = {
    userPopupState: false,
    isAuth: false,
};

const getters = {};

const actions = {
    changeAuthPopupState({commit}, state) {
        commit('setUserPopupState', state);
    }
};

const mutations = {
    setUserPopupState(state, payload) {
        state.userPopupState = payload
    },
    setIsAuth(state, payload) {
        state.isAuth = payload
    }
};
export default {state, getters, actions, mutations};
