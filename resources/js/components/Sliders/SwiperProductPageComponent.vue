<template>
    <Swiper
        :space-between="10"
        :direction="'vertical'"
        :modules="[Thumbs, Navigation]"
        :watch-slides-progress="true"
        @swiper="setThumbsSwiper"
        :slides-per-view="4"
        :allow-touch-move="true"
        :grab-cursor="true"
        :class="[classNavWrapper, $style.navSlider]"
    >
        <SwiperPrevSlideButton :class="$style.prevSlideButton"/>
        <SwiperNextSlideButton :class="$style.nextSlideButton"/>
        <SwiperSlide v-for="image in images" :class="classNavSlide"><img :src="image.path" alt=""/></SwiperSlide>
    </Swiper>
    <Swiper
        :breakpoints="{
        769: {
        direction: 'vertical',
        slidesPerView: 1
        }}"
        :slides-per-view="3"
        direction="horizontal"
        :grab-cursor="true"
        :modules="[Thumbs, Navigation]"
        :thumbs="{swiper: thumbsSwiper}"
        :space-between="10"
        :class="classMainWrapper">
        <SwiperSlide v-for="image in images" :class="classMainSlide"><img :src="image.path" alt=""/></SwiperSlide>
    </Swiper>
</template>

<script setup>
import {ref} from "vue";
import {Swiper, SwiperSlide} from "swiper/vue";
import {Navigation, Thumbs} from "swiper/modules";
import 'swiper/css';
import SwiperPrevSlideButton from "./SwiperPrevSlideButton.vue";
import SwiperNextSlideButton from "./SwiperNextSlideButton.vue";

const props = defineProps({
    images: {type: Array, required: true},
    classNavWrapper: {required: false},
    classNavSlide: {required: false},
    classMainWrapper: {required: false},
    classMainSlide: {required: false},
})

const thumbsSwiper = ref(null);

const setThumbsSwiper = (swiper) => {
    thumbsSwiper.value = swiper;
};

</script>

<style module>
@import "SwiperProductPageComponent.module.scss";
</style>
