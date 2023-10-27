<template>
    <RouteAuthComponent>
        <div :class="$style.profile">
            <div :class="profileClasses.menuProfile">
                <div :class="$style.profileImage">
                    <img
                        src="https://avatars.mds.yandex.net/i?id=fcd934fb3fd86beedd13a150df698436402c5590-5113868-images-thumbs&n=13"
                        alt=""/>
                </div>
                <div :class="$style.menuBlock">
                    <div :class="$style.menuBlockTitle">
                        Профиль
                    </div>
                    <div :class="$style.blockMenuList">
                        <router-link :to="{name: 'profile-home'}"
                                     :class="[$style.link, $style.menuItem, $style.hiddenOnMobile]"
                                     :exact-active-class="$style.active">
                    <span :class="$style.text">
                        Главная
                    </span>
                        </router-link>
                        <router-link :to="{name: 'settings'}" :class="[$style.link, $style.menuItem]"
                                     :active-class="$style.active">
                    <span :class="$style.text">
                        Настройки профиля
                    </span>
                        </router-link>
                        <router-link :to="{name: 'basket'}" :class="[$style.link, $style.menuItem]">
                    <span :class="$style.text">
                        Корзина
                    </span>
                        </router-link>
                        <div :class="$style.menuItem" @click="signOut">
                            <span :class="$style.text">Выйти из аккаунта</span>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="profileClasses.contentProfile">
                <div v-if="profileState" :class="$style.showOnMobile" @click="router.go(-1)">
                    Назад
                </div>
                <router-view :set-profile-state="setProfileState"/>
            </div>
        </div>
    </RouteAuthComponent>
</template>


<script setup>
import {useRouter} from "vue-router";
import useSignOut from "../hooks/AuthHooks/useSignOut.js";
import {computed, ref, useCssModule} from "vue";
import RouteAuthComponent from "../components/Route/RouteAuthComponent.vue";

const router = useRouter();
const signOutHook = useSignOut();
const style = useCssModule();
const profileState = ref(false);
const profileClasses = computed(() => {
    if (profileState.value === true) {
        return {
            menuProfile: [style.profileMenu, style.hiddenOnMobile],
            contentProfile: style.content
        }
    }
    return {
        menuProfile: style.profileMenu,
        contentProfile: [style.content, style.hiddenOnMobile]
    }
});


function setProfileState(state) {
    profileState.value = state;
}
function signOut(){
    router.replace({name: 'home'})
    signOutHook()
}

</script>

<style module>
@import "ProfilePageComponent.module.scss";
</style>
