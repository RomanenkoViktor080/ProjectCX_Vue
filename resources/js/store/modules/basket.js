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
};
export default {state, getters, actions, mutations};
/*

export const basket = (state = defaultState, action) => {
    switch (action.type) {
        case BASKET_ADD_ITEM:
            if (!state.basketItems.some(basketItem => Number(basketItem?.id) === Number(action.payload.id))) {
                return {
                    ...state,
                    basketItems: [...state.basketItems, action.payload],
                    basketFullPrice: Number(state.basketFullPrice) + Number(action.payload.price),
                    basketProductQuantity: Number(state.basketProductQuantity) + 1,
                }
            }
            return {
                ...state
            }
        case BASKET_CHANGE_QUANTITY:
            let diffQuantity = 0;
            return {
                ...state,
                basketItems: state.basketItems.map((item) => {
                    if (Number(item.id) === action.payload.id) {
                        diffQuantity += Number(action.payload.quantity) - Number(item.quantity);
                        return action.payload;
                    }
                    return item;
                }),
                basketProductQuantity: Number(state.basketProductQuantity) + diffQuantity,
                basketFullPrice: state.basketFullPrice + diffQuantity * action.payload.price
            }
        case BASKET_REMOVE_ITEM:
            let basketRemoveItem = [...state.basketItems.filter((item) => Number(item.id) !== Number(action.payload.id))]
            return {
                ...state,
                basketItems: basketRemoveItem,
                basketFullPrice: Number(state.basketFullPrice) - action.payload.quantity * action.payload.price,
                basketProductQuantity: Number(state.basketProductQuantity) - action.payload.quantity,
            }
        case BASKET_RELOAD:
            return {
                basketItems: [...action.payload],
                basketFullPrice: action.payload.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0),
                basketProductQuantity: action.payload.reduce((sum, item) => sum + Number(item.quantity), 0),
            }
        default:
            return state;
    }
}
export const changeBasketAddItem = (payload) => ({type: BASKET_ADD_ITEM, payload: payload});
export const changeBasketRemoveItem = (payload) => ({type: BASKET_REMOVE_ITEM, payload: payload})
export const changeBasketProductQuality = (payload) => ({type: BASKET_CHANGE_QUANTITY, payload: payload})
export const changeBasketProductReload = (payload) => ({type: BASKET_RELOAD, payload: payload})
export const changeBasketProductReloadThunk = () => async (dispatch) => {
    try {
        const response = await axios.post('/api/basket-data',
            {products: JSON.parse(localStorage.getItem('basket'))?.basketItems})

        dispatch({type: BASKET_RELOAD, payload: response.data});
    } catch (error) {
        console.log(error);
    }
}
*/
