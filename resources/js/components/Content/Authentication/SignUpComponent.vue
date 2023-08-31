<template>
    <div :class="$style.formRow">
        <span :class="$style.formRowTitle">Введите email</span>
        <InputTextFormComponent v-model="signUpData.email" :class="$style.inputForm"/>
        <div v-if="errors?.email" :class="$style.errorField">{{ errors.email[0] }}</div>
    </div>
    <div :class="$style.formRow">
        <span :class="$style.formRowTitle">Введите пароль</span>
        <InputPasswordFormComponent v-model="signUpData.password" :class="$style.inputForm"/>
        <div v-if="errors?.password" :class="$style.errorField">{{ errors.password[0] }}</div>
    </div>
    <div :class="$style.formRow">
        <span :class="$style.formRowTitle">Повторите пароль</span>
        <InputPasswordFormComponent v-model="signUpData.password_confirmation" :class="$style.inputForm"/>
    </div>
    <div :class="$style.formRow">
        <CheckboxBoolComponent id="remember_me" v-model="signUpData.remember" :value="true">
            Запомнить меня
        </CheckboxBoolComponent>
    </div>
    <ButtonComponent
        @click="signUp(signUpData)"
        :class="$style.buttonForm">Зарегистрироватся
    </ButtonComponent>
</template>

<script setup>
import ButtonComponent from "../../UI/Buttons/ButtonComponent.vue";
import {reactive, ref} from "vue";
import CheckboxBoolComponent from "../../UI/Checkboxes/CheckboxBoolComponent.vue";
import useSignUp from "../../../hooks/AuthHooks/useSignUp.js";
import InputTextFormComponent from "../../UI/Inputs/InputTextFormComponent.vue";
import InputPasswordFormComponent from "../../UI/Inputs/InputPasswordFormComponent.vue";

const signUpData = reactive({
    email: "",
    password: "",
    password_confirmation: "",
    remember: false
})
const errors = ref(null);
const signUp = useSignUp(errors);
</script>

<style module>
@import "AuthentificationForm.module.scss";
</style>
