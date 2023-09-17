<template>
    <header :class="$style.header">
        <div :class="$style.container">
            <!--            <div :class="$style.topHeader">top</div>-->
            <div :class="$style.bodyHeader">
                <div :class="$style.headerNavMenu">
                    <font-awesome-icon :class="$style.burger" icon="fa-solid fa-bars"
                                       @click="changeCatalogPopupState(true)"/>
                    <router-link :to="{name: 'home'}" :class="$style.headerNavMenuLogo">
                        <img src="../../../img/logo.png"
                             alt="Логотип"/>
                    </router-link>
                    <div :class="$style.headerActionsMobile">
                        <font-awesome-icon :class="$style.actionMobileIcon" icon="fa-solid fa-magnifying-glass"
                                           @click="changeSearchPopupState(true)"/>
                    </div>
                </div>
                <InputHeaderSearchComponent placeholder="Поиск" :class="$style.headerSearch"/>
                <div :class="$style.headerActions">
                    <router-link :to="{name: 'profile-home'}" v-if="isAuth" :class="$style.headerActionItem" >
                        <font-awesome-icon icon="fa-solid fa-user" :class="$style.headerActionItemIcon"/>
                        <div
                            :class="$style.headerActionItemText">Кабинет
                        </div>
                    </router-link>
                    <div v-else :class="$style.headerActionItem" @click="changeAuthPopupState(true)">
                        <font-awesome-icon icon="fa-solid fa-user" :class="$style.headerActionItemIcon"/>
                        <div :class="$style.headerActionItemText">Войти</div>
                    </div>

                    <router-link :to="{name: 'basket'}" :class="$style.headerActionItem">
                        <div :class="$style.basketIconContainer">
                            <font-awesome-icon icon="fa-solid fa-cart-shopping" :class="$style.headerActionItemIcon"/>
                            <span v-if="basketQuantity" :class="$style.basketQuantity">{{ basketQuantity }}</span>
                        </div>
                        <span :class="$style.headerActionItemText">Корзина</span>
                    </router-link>
                </div>
            </div>
        </div>
        <PopupCatalogComponent/>
        <PopupAuthenticationComponent/>
        <PopupSearchMobileComponent :active="searchPopupState" :set-active="changeSearchPopupState"/>
    </header>
</template>


<script setup>

import InputHeaderSearchComponent from "../UI/Inputs/InputHeaderSearchComponent.vue";
import PopupCatalogComponent from "../Popups/PopupCatalogComponent.vue";
import PopupAuthenticationComponent from "../Popups/PopupAuthenticationComponent.vue";
import {useStore} from "vuex";
import {computed, ref} from "vue";
import PopupSearchMobileComponent from "../Popups/PopupSearchMobileComponent.vue";

const store = useStore();
const searchPopupState = ref(false)
const isAuth = computed(() => store.state.user.isAuth)
const basketQuantity = computed(() => store.getters.basketProductQuantity)


function changeAuthPopupState(state) {
    store.dispatch('changeAuthPopupState', state);
}

function changeSearchPopupState(state) {
    searchPopupState.value = state;
}

function changeCatalogPopupState(state) {
    store.dispatch('changeCatalogPopupState', state);
}
</script>

<style module>
@import "HeaderComponent.module.scss";
</style>
