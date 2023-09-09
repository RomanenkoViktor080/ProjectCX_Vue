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
    changeBasketAddProduct({commit, rootState}, state) {
        let basket = rootState.basket.basketProducts;
        let localBasket = JSON.parse(localStorage.getItem('basket')) ?? {};
        if (!basket.some(i => i.id == state.id)) {
            if (!rootState.user.isAuth) {
                localBasket.basketProducts = [...(localBasket.basketProducts ?? []), {id: state.id, quantity: 1}];
                localStorage.setItem('basket', JSON.stringify(localBasket));
            }
            commit('setBasketAddProduct', state)
        }
    },
    changeBasketProductReload({commit}, state) {
        commit('setBasketProductReload', state)
    },
    changeBasketRemoveProduct({commit, rootState}, state) {
        let basket = rootState.basket.basketProducts;
        let localBasket = JSON.parse(localStorage.getItem('basket')) ?? {};
        if (basket.some(i => i.id == state)) {
            if (!rootState.user.isAuth) {
                localBasket.basketProducts = localBasket.basketProducts.filter(i => i.id != state);
                localStorage.setItem('basket', JSON.stringify(localBasket));
            }
            commit('setBasketRemoveProduct', state)
        }
    },
    changeBasketProductQuality({commit, rootState}, state) {
        let basket = rootState.basket.basketProducts;
        let localBasket = JSON.parse(localStorage.getItem('basket')) ?? {};
        if (basket.some(i => i.id == state.id)) {
            if (!rootState.user.isAuth) {
                localBasket.basketProducts = localBasket.basketProducts.map(i => {
                    if (i.id == state.id) {
                        return {id: state.id, quantity: state.quantity}
                    }
                    return i;
                });
                localStorage.setItem('basket', JSON.stringify(localBasket));
            }
            commit('setBasketProductQuality', state)
        }
    }
};

const mutations = {
    setBasketAddProduct(state, payload) {
        state.basketProducts = [...state.basketProducts, payload];

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
