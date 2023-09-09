import {useStore} from "vuex";
import axios from "axios";
import useBasketProductReload from "../BasketHooks/useBasketProductReload.js";

const useSignOut = () => {
    const store = useStore();
    const reloadBasket = useBasketProductReload();
    async function signOut() {
        try {
            await axios.get('/sanctum/csrf-cookie')
            const response = await axios.post('/api/logout')
            await Cookies.remove('auth_token', {
                path: '/'
            });
            await store.dispatch('changeAuthState', false);
            await reloadBasket();
        } catch (error) {
            await Cookies.remove('auth_token', {
                path: '/'
            });
            console.log(error);
        }
    }

    return signOut;
};

export default useSignOut;
