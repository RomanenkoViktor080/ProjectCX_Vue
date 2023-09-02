const state = {
    basketProducts: [],
};

const getters = {
    basketFullPrice(state) {
        return state.basketProducts.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0)
    },
    basketProductQuantity(state) {
        return state.basketProducts.reduce((sum, item) => sum + Number(item.quantity), 0)
    },
};


const actions = {
    changeBasketAddItem({commit}, state) {
        commit('setBasketAddItem', state)
    },
    changeBasketProductReload({commit}, state) {
        commit('setBasketProductReload', state)
    },
    changeBasketRemoveProduct({commit}, state) {
        commit('setBasketProductDelete', state)
    },
    changeBasketProductQuality({commit}, state) {
        commit('setBasketProductQuality', state)
    }
};

const mutations = {
    setBasketAddItem(state, payload) {
        state.basketProducts = [...state.basketProducts, ...payload];

    },
    setBasketProductReload(state, payload) {
        state.basketProducts = payload;
    },
    setBasketProductDelete(state, payload) {
        state.basketProducts = state.basketProducts.filter(product => Number(product.id) !== Number(payload));
    },
    setBasketProductQuality(state, payload) {
        state.basketProducts = state.basketProducts.map((product) => {
            if (Number(product.id) === Number(payload.id)) {
                product.quantity = payload.quantity;
            }
            return product;
        });
    }
};
export default {state, getters, actions, mutations};
