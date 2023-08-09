<template>
    <header :class="$style.header">
        <div :class="$style.container">
            <!--            <div :class="$style.topHeader">top</div>-->
            <div :class="$style.bodyHeader">
                <div :class="$style.headerNavMenu">
                    <font-awesome-icon :class="$style.burger" icon="fa-solid fa-bars"
                                       @click="changeAuthPopupState(true)"/>
                    <router-link to="#" :class="$style.headerNavMenuLogo">
                        <img src="../../../img/logo.png"
                             alt="Логотип"/>
                    </router-link>
                    <div :class="$style.headerActionsMobile">
                        <font-awesome-icon :class="$style.actionMobileIcon" icon="fa-solid fa-magnifying-glass"
                                           @click="changeSearchPopupState(true)"/>
                    </div>
                </div>
                <InputHeaderSearchComponent placeholder="Поиск" :containerPropClass="$style.headerSearch"/>
                <div :class="$style.headerActions">
                    <router-link v-if="isAuth" :class="$style.headerActionItem" to="#">
                        <font-awesome-icon icon="fa-solid fa-cart-shopping" :class="$style.headerActionItemIcon"/>
                        <div
                            :class="$style.headerActionItemText">Кабинет
                        </div>
                    </router-link>
                    <div v-else :class="$style.headerActionItem" @click="changeSearchPopupState(true)">
                        <font-awesome-icon icon="fa-solid fa-user" :class="$style.headerActionItemIcon"/>
                        <div :class="$style.headerActionItemText">Войти</div>
                    </div>

                    <router-link to="#" :class="$style.headerActionItem">
                        <div :class="$style.basketIconContainer">
                            <font-awesome-icon icon="fa-solid fa-cart-shopping" :class="$style.headerActionItemIcon"/>
                            <!--//TODO Отображение количества товара в корзине-->
                            <!--
                                basketQuantity
                                ? <span :class="$style.basketQuantity">{basketQuantity}</span>
                                : null
                                }-->
                        </div>
                        <span :class="$style.headerActionItemText">Корзина</span>
                    </router-link>
                </div>
            </div>
        </div>
        <!--        <PopupCatalogComponent/>
                {!isAuth && <PopupAuthenticationComponent/>}
                <PopupSearchMobileComponent active={searchPopupState} setActive={setSearchPopupState}/>-->
    </header>
</template>


<script>

import {mapState} from "vuex";
import InputHeaderSearchComponent from "../UI/Inputs/InputHeaderSearchComponent.vue";

export default {
    name: "HeaderComponent",
    components: {InputHeaderSearchComponent},
    data() {
        return {
            searchPopupState: false
        }
    },
    computed: {
        ...mapState({
            isAuth: state => state.user.isAuth,
            popupState: state => state.user.popupState,
        })
    },

    methods: {
        changeAuthPopupState(state) {
            this.$store.dispatch('changeAuthPopupState', state);
        },
        changeSearchPopupState(state) {
            this.searchPopupState = state;
        }
    }
}
</script>

<style module>
@import "HeaderComponent.module.scss";
</style>
