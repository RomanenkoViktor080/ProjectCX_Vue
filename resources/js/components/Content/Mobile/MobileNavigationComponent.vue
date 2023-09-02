<template>
    <div :class="$style.mobileNavigation">
        <router-link :to="{name: 'home'}" :class="$style.navLink"
                     :active-class="!categoryPopupState ? $style.navLinkActive : null">
            <font-awesome-icon icon="fa-solid fa-house" :class="$style.navLinkIcon"/>
        </router-link>
        <router-link :to="{name: 'basket'}" :class="$style.navLink" :active-class="!categoryPopupState ? $style.navLinkActive : null">
            <span v-if="basketQuantity" :class="$style.basketQuantity">{{ basketQuantity }}</span>
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
const basketQuantity = computed(() => store.getters.basketProductQuantity)
const changeCategoryPopupState = (state) => store.dispatch('changeCatalogPopupState', state)
</script>

<style module>
@import "MobileNavigationComponent.module.scss";
</style>
