import React from 'react';
import {Cookies} from "react-cookie";
import {changeAuthEmailState, changeAuthStatusState} from "../../store/reducers/userReducer";
import {changeBasketProductReload, loadBasket} from "../../store/reducers/basketReducer";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";

const useSignOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function signOut() {
        try {
            const cookie = new Cookies();
            await axios.post('/api/logout')
            cookie.remove('auth_token', {
                path: '/'
            });
            navigate("/");
            const reloadedBasket = await loadBasket();
            dispatch(changeBasketProductReload(reloadedBasket));
            dispatch(changeAuthStatusState(false));
            dispatch(changeAuthEmailState(false));
        } catch (error) {
            console.log(error);
        }
    }

    return signOut;
};

export default useSignOut;
