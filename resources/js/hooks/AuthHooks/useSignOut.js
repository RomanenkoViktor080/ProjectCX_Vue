import {useStore} from "vuex";
import axios from "axios";

const useSignOut = () => {
    const store = useStore();

    async function signOut() {
        try {
            await axios.get('/sanctum/csrf-cookie')
            const response = await axios.post('/api/logout')
            await Cookies.remove('auth_token', {
                path: '/'
            });
            await store.dispatch('changeAuthState', false);
            const basketDataReloaded = await axios.post('/api/basket-data');
            store.dispatch('changeBasketProductReload', basketDataReloaded.data)
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
