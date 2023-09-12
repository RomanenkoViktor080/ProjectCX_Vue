const state = {
    productPreviewPopupState: false,
    productPreviewData: null,
};

const getters = {};

const actions = {
    changeProductPreviewPopupState({commit}, state) {
        commit('setProductPreviewPopupState', state);
    },
    changeProductPreviewData({commit}, state) {
        commit('setProductPreviewData', state);
    }
};

const mutations = {
    setProductPreviewPopupState(state, payload) {
        state.productPreviewPopupState = payload;
    },
    setProductPreviewData(state, payload) {
        state.productPreviewData = payload;
    }
};
export default {state, getters, actions, mutations};
