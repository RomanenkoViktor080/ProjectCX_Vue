<template>
    <HeaderComponent/>
        <div :class="$style.main">
            <div :class="$style.container">
                <router-view></router-view>
            </div>
        </div>
<!--        <MobileNavigationComponent/>
        {productPreviewPopupState && <ProductPreviewPopupComponent/>}
        <FooterComponent/>-->
</template>

<script>
import HeaderComponent from "./Header/HeaderComponent.vue";
import {defineComponent} from "vue";

export default defineComponent({
    components: {HeaderComponent}
})

</script>

<style module>
@import "App.module.scss";
</style>
