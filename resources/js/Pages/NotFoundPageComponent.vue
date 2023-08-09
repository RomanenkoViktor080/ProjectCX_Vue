<template>
    <div :class="$style.app">
        <div :class="$style.messageBlock">
            <div :class="$style.title">Ошибка 404</div>
            <div :class="$style.message">Страница ненайдена!</div>
            <div :class="$style.actions">
                <router-link :to="{name: 'home'}">
                    <ButtonComponent>На главную</ButtonComponent>
                </router-link>
<!--                //TODO При редиректе назад перезагружается страница-->
                    <ButtonComponent :on-click="goBack">Назад</ButtonComponent>
            </div>
        </div>
        <!--    <SwiperAdvertisementProductsComponent title={"Недавно просмотренные"}/>-->
    </div>
</template>

<script>
import ButtonComponent from "../components/UI/Buttons/ButtonComponent.vue";

export default {
    name: "NotFoundPageComponent",
    components: {ButtonComponent},
    methods: {
        goBack() {
            this.$router.go(-1)
        }
    }
}
</script>

<style module>
@import "NotFoundPageComponent.module.scss";
</style>
