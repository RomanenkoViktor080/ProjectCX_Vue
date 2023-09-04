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
    changeBasketAddProduct({commit}, state) {
        commit('setBasketAddProduct', state)
    },
    changeBasketProductReload({commit}, state) {
        commit('setBasketProductReload', state)
    },
    changeBasketRemoveProduct({commit}, state) {
        commit('setBasketRemoveProduct', state)
    },
    changeBasketProductQuality({commit}, state) {
        commit('setBasketProductQuality', state)
    }
};

const mutations = {
    setBasketAddProduct(state, payload) {
        state.basketProducts = [...state.basketProducts, ...payload];

    },
    setBasketProductReload(state, payload) {
        state.basketProducts = payload;
    },
    setBasketRemoveProduct(state, payload) {
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
