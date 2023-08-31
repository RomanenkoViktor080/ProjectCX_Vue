<template>
    <PopupCenterComponent :active="authNPopupState" :set-active="changeAuthNState" :class-body="$style.bodyPopup"
                          :class-wrapper="$style.wrapperPopup">
        <div :class="$style.popupContainer">
            <div :class="$style.popupHeader">
                <div
                    :class="[$style.headerTitle, popupShowLoginContent && $style.headerTitleActive]"
                @click="setPopupShowLoginContent(true)">
                    Вход
                </div>
                <div
                    :class="[$style.headerTitle, !popupShowLoginContent && $style.headerTitleActive]"
                    @click="setPopupShowLoginContent(false)">

                    Регистрация
                </div>
            </div>
            <div :class="$style.popupContent">
                <div :class="$style.authenticationForm">
                    <SignInComponent v-if="popupShowLoginContent"/>
                    <SignUpComponent v-else/>
                </div>
            </div>
        </div>
    </PopupCenterComponent>
</template>

<script setup>
import {useStore} from "vuex";
import {computed, ref} from "vue";
import PopupCenterComponent from "./PopupCenterComponent.vue";
import SignInComponent from "../Content/Authentication/SignInComponent.vue";
import SignUpComponent from "../Content/Authentication/SignUpComponent.vue";

const store = useStore();
const popupShowLoginContent = ref(true);
const authNPopupState = computed(() => store.state.user.userPopupState)
function setPopupShowLoginContent(state){
    popupShowLoginContent.value = state;
}
function changeAuthNState(state) {
    store.dispatch('changeAuthPopupState', state)
}

</script>

<style module>
@import "PopupAuthenticationComponent.module.scss";
</style>
