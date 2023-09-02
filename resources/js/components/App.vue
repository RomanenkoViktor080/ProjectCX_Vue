<template>
    <HeaderComponent/>
    <div :class="$style.main">
        <div :class="$style.container">
            <router-view></router-view>
        </div>
    </div>
    <MobileNavigationComponent/>
    <!--{productPreviewPopupState && <ProductPreviewPopupComponent/>}
    <FooterComponent/>-->
</template>

<script setup>
import {useStore} from "vuex";
import {onBeforeMount} from "vue";
import MobileNavigationComponent from "./Content/Mobile/MobileNavigationComponent.vue";
import HeaderComponent from "./Header/HeaderComponent.vue";

const store = useStore();

onBeforeMount(() => {
    axios.get('/api/user').then(() => {
        store.dispatch('changeAuthState', true);
    }).catch(() => {
        store.dispatch('changeAuthState', false);
        Cookies.remove('auth_token', {
            path: '/'
        });
    })
    axios.post('/api/basket-data').then((response) => {
        store.dispatch('changeBasketProductReload', response.data)
    }).catch(() => {

    })
    /*export async function loadBasket() {
        try {
            const response = await ,
                {products: JSON.parse(localStorage.getItem('basket'))?.basketItems})
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }*/


})
</script>

<style module>
@import "App.module.scss";
</style>
