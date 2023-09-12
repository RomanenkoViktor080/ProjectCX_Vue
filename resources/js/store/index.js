import { createStore } from 'vuex'
import user  from './modules/user.js'
import catalog  from './modules/catalog.js'
import basket  from './modules/basket.js'
import productPreview  from './modules/productPreview.js'
const store = createStore({
    modules: {
        user,
        catalog,
        basket,
        productPreview
    }
})
export default store
