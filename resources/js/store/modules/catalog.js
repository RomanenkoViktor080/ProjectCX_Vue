const state = {
    catalogPopupState: false,
    catalogMenuState: null,
};

const getters = {
};

const actions = {
    changeCatalogPopupState({commit}, state) {
        commit('setCatalogPopupState', state);
    },
    changeCatalogMenuState({commit}, state) {
        commit('setCatalogMenuState', state);
    }
};

const mutations = {
    setCatalogPopupState(state, payload) {
        state.catalogPopupState = payload
    },
    setCatalogMenuState(state, payload) {
        state.catalogMenuState = payload
    }
};
export default {state, getters, actions, mutations};
