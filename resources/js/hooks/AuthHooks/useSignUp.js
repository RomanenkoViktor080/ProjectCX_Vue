import axios from "axios";
import {useStore} from "vuex";

export default function useSignUp(errors) {

    const store = useStore();

    async function signUp(data) {
        try {
            await axios.get('/sanctum/csrf-cookie')
            const response = await axios.post('/api/sign-up', {
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation,
                remember: data.remember,
            })
            Cookies.set('auth_token', response.data.token, {
                expires: response.data.lifetime,
                path: '/'
            })
            await store.dispatch('changeAuthPopupState', false);
            await store.dispatch('changeAuthState', true)
            const basketDataReloaded = await axios.post('/api/basket-data');
            store.dispatch('changeBasketProductReload', basketDataReloaded.data)
            data.email = "";
            data.password = "";
            data.remember = false;
            errors.value = null;
        } catch (error) {
            console.log(error)
            errors.value = error.response.data.errors;
        }
    }

    return signUp;
};
