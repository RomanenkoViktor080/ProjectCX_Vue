import {catalogReducer} from "./reducers/catalogReducer";
import {changeAuthStatusStateThunk, userReducer} from "./reducers/userReducer";
import {productReducer} from "./reducers/productReducer";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {basketReducer, changeBasketProductReloadThunk} from "./reducers/basketReducer";
import BasketAddMiddleware from "../middleware/BasketAddMiddleware";
import BasketRemoveMiddleware from "../middleware/BasketRemoveMiddleware";
import BasketChangeQuantityMiddleware from "../middleware/BasketChangeQuantityMiddleware";

const rootReducer = combineReducers({catalogReducer, userReducer, productReducer, basketReducer})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([BasketAddMiddleware, BasketRemoveMiddleware, BasketChangeQuantityMiddleware]),
})

store.dispatch(changeAuthStatusStateThunk())
store.dispatch(changeBasketProductReloadThunk())
