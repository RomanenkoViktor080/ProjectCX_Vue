const state = {
    popupState: false,
    isAuth: false,
};

const getters = {
    popupState: state => state.popupState,
    isAuth: state => state.isAuth,
};

const actions = {
    changeAuthPopupState({commit}, state) {
        commit('setPopupState', state);
    }
};

const mutations = {
    setPopupState(state, payload) {
        state.popupState = payload
    },
    setIsAuth(state, payload) {
        state.isAuth = payload
    }
};
export default {state, getters, actions, mutations};
