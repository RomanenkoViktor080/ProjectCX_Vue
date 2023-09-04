import {useStore} from "vuex";

export default function useSignIn(errors) {

    const store = useStore();

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
            const basketDataReloaded = await axios.post('/api/basket-data');
            store.dispatch('changeBasketProductReload', basketDataReloaded.data)
            data.email = "";
            data.password = "";
            data.remember = false;
            data.password_confirmation = "";
            errors.value = null;
        } catch (error) {
            errors.value = error.response.data.errors;
        }
    }

    return signIn;
};

