import { createStore } from 'vuex'
import user  from './modules/user.js'
import catalog  from './modules/catalog.js'
import basket  from './modules/basket.js'
const store = createStore({
    modules: {
        user,
        catalog,
        basket,
    }
})
export default store
