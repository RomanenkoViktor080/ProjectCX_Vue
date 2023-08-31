const state = {
    userPopupState: false,
    isAuth: !!Cookies.get('auth_token'),
};

const getters = {};

const actions = {
    changeAuthPopupState({commit}, state) {
        commit('setUserPopupState', state);
    },
    changeAuthState({commit}, state) {
        commit('setIsAuth', state);
    },
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
