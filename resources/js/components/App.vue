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
})
</script>

<style module>
@import "App.module.scss";
</style>
