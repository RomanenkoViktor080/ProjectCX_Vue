<template>
    <div :class="$style.mobileNavigation">
        <router-link :to="{name: 'home'}" :class="$style.navLink"
                     :active-class="!categoryPopupState ? $style.navLinkActive : null">
            <font-awesome-icon icon="fa-solid fa-house" :class="$style.navLinkIcon"/>
        </router-link>
        <router-link to="#" :class="$style.navLink" :active-class="!categoryPopupState ? $style.navLinkActive : null">
            <font-awesome-icon icon="fa-solid fa-cart-shopping" :class="$style.navLinkIcon"/>
        </router-link>
        <div @click="changeCategoryPopupState(true)"
             :class="[$style.navLink, categoryPopupState ? $style.navLinkActive : null]">
            <font-awesome-icon icon="fa-solid fa-border-all" :class="$style.navLinkIcon"/>
        </div>
        <router-link to="#" :class="$style.navLink" :active-class="!categoryPopupState ? $style.navLinkActive : null">
            <font-awesome-icon icon="fa-solid fa-user" :class="$style.navLinkIcon"/>
        </router-link>
    </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore();
const categoryPopupState = computed(() => store.state.catalog.catalogPopupState);
const isAuth = computed(() => store.state.user.isAuth);

const changeCategoryPopupState = (state) => store.dispatch('changeCatalogPopupState', state)
</script>

<style module>
@import "MobileNavigationComponent.module.scss";
</style>
<!--

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
    const [isAuth, basketQuantity] = useSelector((state) => [state.userReducer.isAuth, state.basket.basketProductQuantity]);
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
-->
