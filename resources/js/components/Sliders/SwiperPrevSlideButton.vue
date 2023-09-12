<template>
    <font-awesome-icon icon="fa-solid fa-angle-down" :class="$style.button" @click="swiper.slidePrev()" v-bind="$attrs"/>
</template>

<script setup>
import {useSwiper} from "swiper/vue";

const swiper = useSwiper()
</script>

<style module>
@import "SwiperChangeSlideButton.module.scss";
</style>
