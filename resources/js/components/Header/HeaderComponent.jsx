import React, {useState} from 'react';
import classes from "./HeaderComponent.module.scss";
import {Link} from "react-router-dom";
import InputHeaderSearchComponent from "../UI/Inputs/InputHeaderSearchComponent";
import PopupAuthenticationComponent from "../Popups/PopupAuthenticationComponent";
import PopupCatalogComponent from "../Popups/PopupCatalogComponent";
import {useDispatch, useSelector} from "react-redux";
import logoImg from "../../../img/logo.png"
import PopupSearchMobileComponent from "../Popups/PopupSearchMobileComponent";
import {HiMenu, HiSearch} from "react-icons/hi";
import {FaUser} from "react-icons/fa";
import {RiShoppingCartFill} from "react-icons/ri";
import {isEmpty} from "lodash";
import {changeCategoryPopupState} from "../../store/reducers/catalogReducer";
import {changeAuthNPopupState} from "../../store/reducers/userReducer";


const HeaderComponent = () => {
    const [isAuth, email, basketQuantity] = useSelector((state) => [state.userReducer.isAuth, state.userReducer.userEmail, state.basketReducer.basketProductQuantity]);
    const dispatch = useDispatch();
    const [searchPopupState, setSearchPopupState] = useState(false);

    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <div className={classes.topHeader}>top</div>
                <div className={classes.bodyHeader}>
                    <div className={classes.headerNavMenu}>
                        <HiMenu className={classes.burger} onClick={() => dispatch(changeCategoryPopupState(true))}/>
                        <Link to="/" className={classes.headerNavMenuLogo}>
                            <img src={logoImg}
                                 alt="Логотип"/>
                        </Link>
                        <div className={classes.headerActionsMobile}>
                            <div className={classes.actionMobileItem} onClick={() => setSearchPopupState(true)}>
                                <HiSearch className={classes.actionMobileIcon}/>
                            </div>
                        </div>
                    </div>
                    <InputHeaderSearchComponent containerPropClass={classes.headerSearch}>Поиск
                        товаров</InputHeaderSearchComponent>
                    <div className={classes.headerActions}>
                        {
                            isAuth ?
                                <Link className={classes.headerActionItem} to={"/profile"}>
                                    <FaUser className={classes.headerActionItemIcon}/>
                                    <div
                                        className={classes.headerActionItemText}>{isEmpty(email) ? "Ошибка" : email} </div>
                                </Link>
                                :
                                <div className={classes.headerActionItem}
                                     onClick={() => dispatch(changeAuthNPopupState(true))}>
                                    <FaUser className={classes.headerActionItemIcon}/>
                                    <div className={classes.headerActionItemText}>{isAuth ? email : "Войти"} </div>
                                </div>
                        }

                        <Link to={"/cart"} className={classes.headerActionItem}>
                            <div className={classes.basketIconContainer}>
                                <RiShoppingCartFill className={classes.headerActionItemIcon}/>
                                {
                                    basketQuantity
                                        ? <span className={classes.basketQuantity}>{basketQuantity}</span>
                                        : null
                                }
                            </div>
                            <span className={classes.headerActionItemText}>Корзина</span>
                        </Link>
                    </div>
                </div>
            </div>
            <PopupCatalogComponent/>
            {!isAuth && <PopupAuthenticationComponent/>}
            <PopupSearchMobileComponent active={searchPopupState} setActive={setSearchPopupState}/>
        </header>
    );
};

export default HeaderComponent;
