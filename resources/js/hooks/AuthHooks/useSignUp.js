import React from 'react';
import axios from "axios";
import {Cookies} from "react-cookie";
import {changeAuthEmailState, changeAuthNPopupState, changeAuthStatusState} from "../../store/reducers/userReducer";
import {changeBasketProductReload, loadBasket} from "../../store/reducers/basketReducer";
import {useDispatch} from "react-redux";

const useSignUp = (setErrors) => {
    const dispatch = useDispatch();

    async function signUp(data) {
        console.log(data);
        try {
            await axios.get('/sanctum/csrf-cookie')
            const response = await axios.post('/api/sign-up', {
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation,
                remember: data.remember,
            })
            const cookie = new Cookies();
            cookie.set('auth_token', response.data.token, {
                maxAge: response.data.lifetime,
                path: '/'
            })
            const reloadedBasket = await loadBasket();
            dispatch(changeBasketProductReload(reloadedBasket));
            dispatch(changeAuthStatusState(true));
            dispatch(changeAuthEmailState(response.data.email));
            dispatch(changeAuthNPopupState(false));
        } catch (error) {
            setErrors(error.response.data.errors)
            console.log(error);
        }
    }

    return signUp;
};

export default useSignUp;
