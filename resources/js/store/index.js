import { createStore } from 'vuex'
import user  from './modules/user.js'
import catalog  from './modules/catalog.js'
const store = createStore({
    modules: {
        user,
        catalog,
    }
})
export default store
