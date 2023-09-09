import {useStore} from "vuex";
import useBasketProductReload from "../BasketHooks/useBasketProductReload.js";

export default function useSignIn(errors) {

    const store = useStore();
    const reloadBasket = useBasketProductReload();

    async function signIn(data) {
        try {
            await axios.get('/sanctum/csrf-cookie')
            const response = await axios.post('/api/sign-in', {
                email: data.email,
                password: data.password,
                remember: data.remember
            })
            Cookies.set('auth_token', response.data.token, {
                expires: response.data.lifetime,
                path: '/'
            })
            await store.dispatch('changeAuthPopupState', false);
            await store.dispatch('changeAuthState', true);
            await reloadBasket();
            data.email = "";
            data.password = "";
            data.remember = false;
            errors.value = null;
        } catch (error) {
            errors.value = error.response.data.errors;
        }
    }

    return signIn;
};

