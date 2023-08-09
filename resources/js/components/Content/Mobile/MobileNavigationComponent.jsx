import React from 'react';
import classes from "./MobileNavigationComponent.module.scss";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AiFillAppstore, AiFillHome, AiOutlineAppstore, AiOutlineHome} from "react-icons/ai";
import {RiShoppingCartFill, RiShoppingCartLine} from "react-icons/ri";
import {FaRegUser, FaUser} from "react-icons/fa";
import {changeCategoryPopupState} from "../../../store/reducers/catalogReducer";
import {changeAuthNPopupState} from "../../../store/reducers/userReducer";

const MobileNavigationComponent = () => {
    const [isAuth, basketQuantity] = useSelector((state) => [state.userReducer.isAuth, state.basketReducer.basketProductQuantity]);
    const dispatch = useDispatch();
    const categoryPopupState = useSelector(state => state.catalogReducer.popupState);
    const authNPopupState = useSelector(state => state.userReducer.popupState);

    function basketQuantityComponent() {
        return (
            <div>qweqwe</div>
        );
    }

    return (
        <div className={classes.mobileNavigation}>
            <NavLink to="/"
                     className={({isActive}) => ([classes.navLink, isActive && !categoryPopupState ? classes.navLinkActive : null].filter(Boolean).join(" "))}
                     end>
                {({isActive}) => (isActive && !categoryPopupState ? <AiFillHome className={classes.navLinkIcon}/> :
                    <AiOutlineHome className={classes.navLinkIcon}/>)}
            </NavLink>
            <NavLink to="/cart"
                     className={({isActive}) => ([classes.navLink, isActive && !categoryPopupState ? classes.navLinkActive : null].filter(Boolean).join(" "))}>

                {({isActive}) =>
                    <>
                        {
                            basketQuantity
                                ? <span className={classes.basketQuantity}>{basketQuantity}</span>
                                : null
                        }
                        {
                            isActive && !categoryPopupState ?
                                <RiShoppingCartFill className={classes.navLinkIcon}/>
                                :
                                <RiShoppingCartLine className={classes.navLinkIcon}/>

                        }
                    </>
                }
            </NavLink>
            <div
                onClick={() => dispatch(changeCategoryPopupState(true))}
                className={[classes.navLink, categoryPopupState ? classes.navLinkActive : null].filter(Boolean).join(" ")}>
                {categoryPopupState ? <AiFillAppstore className={classes.navLinkIcon}/> :
                    <AiOutlineAppstore className={classes.navLinkIcon}/>}
            </div>
            {
                isAuth ?
                    <NavLink
                        className={({isActive}) => ([classes.navLink, isActive && !categoryPopupState ? classes.navLinkActive : null].filter(Boolean).join(" "))}
                        to="/profile">
                        {({isActive}) => (isActive && !categoryPopupState ? <FaUser className={classes.navLinkIcon}/> :
                            <FaRegUser className={classes.navLinkIcon}/>)}
                    </NavLink>
                    :
                    <div onClick={() => dispatch(changeAuthNPopupState(true))}
                         className={[classes.navLink, authNPopupState && !categoryPopupState ? classes.navLinkActive : null].filter(Boolean).join(" ")}>
                        {authNPopupState && !categoryPopupState ? <FaUser className={classes.navLinkIcon}/> :
                            <FaRegUser className={classes.navLinkIcon}/>}
                    </div>

            }

        </div>
    );
};

export default MobileNavigationComponent;
