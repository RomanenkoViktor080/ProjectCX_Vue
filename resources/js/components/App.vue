<template>
    <HeaderComponent/>
    <div :class="$style.main">
        <div :class="$style.container">
            <router-view></router-view>
        </div>
    </div>
    <MobileNavigationComponent/>
    <ProductPreviewPopupComponent v-if="productPreviewPopupState"/>
    <FooterComponent/>
</template>

<script setup>
import {useStore} from "vuex";
import MobileNavigationComponent from "./Content/Mobile/MobileNavigationComponent.vue";
import HeaderComponent from "./Header/HeaderComponent.vue";
import FooterComponent from "./Footer/FooterComponent.vue";
import useBasketProductReload from "../hooks/BasketHooks/useBasketProductReload.js";
import {computed} from "vue";
import ProductPreviewPopupComponent from "./Content/Product/ProductPreviewPopupComponent.vue";

const store = useStore();
const productPreviewPopupState = computed(() => store.state.productPreview.productPreviewPopupState)
const reloadBasket = useBasketProductReload();


axios.get('/api/user').then((response) => {
    if (!response.data) {
        Cookies.remove('auth_token', {
            path: '/'
        });
    }
    store.dispatch('changeAuthState', response.data);
}).catch(() => {
    store.dispatch('changeAuthState', false);
    Cookies.remove('auth_token', {
        path: '/'
    });
}).finally(() => {
    reloadBasket();
});

</script>

<style module>
@import "App.module.scss";
</style>
