import React, {useState} from 'react';
import PopupCenterComponent from "./PopupCenterComponent";
import classes from "./PopupAuthenticationComponent.module.scss";
import FcVKontakte from "../SVG/FcVKontakte";
import {useDispatch, useSelector} from "react-redux";
import {FcGoogle} from "react-icons/fc";
import SignInComponent from "../Content/Authentication/SignInComponent";
import SignUpComponent from "../Content/Authentication/SignUpComponent";
import {changeAuthNPopupState} from "../../store/reducers/userReducer";


const PopupAuthenticationComponent = () => {

    const [popupShowLoginContent, setPopupShowLoginContent] = useState(true);
    const dispatch = useDispatch();
    const authNPopupState = useSelector(state => state.userReducer.popupState);

    function changeAuthNState(state) {
        dispatch(changeAuthNPopupState(state))
    }

    return (
        <PopupCenterComponent active={authNPopupState} setActive={changeAuthNState} classBody={classes.bodyPopup}
                              classWrapper={classes.wrapperPopup}>
            <div className={classes.popupContainer}>
                <div className={classes.popupHeader}>
                    <div
                        className={[classes.headerTitle, popupShowLoginContent && classes.headerTitleActive].filter(Boolean).join(" ")}
                        onClick={() => !popupShowLoginContent && setPopupShowLoginContent(true)}>Вход
                    </div>
                    <div
                        className={[classes.headerTitle, !popupShowLoginContent && classes.headerTitleActive].filter(Boolean).join(" ")}
                        onClick={() => popupShowLoginContent && setPopupShowLoginContent(false)}>Регистрация
                    </div>
                </div>
                <div className={classes.popupContent}>
                    <div className={classes.authenticationForm}>
                        {
                            popupShowLoginContent ?
                                <SignInComponent/>
                                :
                                <SignUpComponent/>
                        }
                    </div>
                    <div className={classes.dividingLine}>
                        <span className={classes.dividingLineText}>ИЛИ</span>

                    </div>
                    <div className={classes.authenticationViaServices}>
                        <div className={classes.socialBlock}>
                            <FcGoogle className={classes.socialIcon}/>
                            <div>Google</div>
                        </div>
                        <div className={classes.socialBlock}>
                            <FcVKontakte className={classes.socialIcon}/>
                            <div>Вконтакте</div>
                        </div>
                    </div>
                </div>
            </div>
        </PopupCenterComponent>
    );
};

export default PopupAuthenticationComponent;
