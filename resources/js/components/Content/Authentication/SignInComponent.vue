<template>
    <form @submit.prevent="signIn(signInData)">
        <div :class="$style.formRow">
            <span :class="$style.formRowTitle">Введите email</span>
            <InputTextFormComponent v-model="signInData.email" :class="$style.inputForm"/>
            <div v-if="errors?.email" :class="$style.errorField">{{ errors.email[0] }}</div>
        </div>
        <div :class="$style.formRow">
            <span :class="$style.formRowTitle">Введите пароль</span>
            <InputPasswordFormComponent v-model="signInData.password" :class="$style.inputForm"/>
            <div v-if="errors?.password" :class="$style.errorField">{{ errors.password[0] }}</div>
        </div>
        <div :class="$style.formRow">
            <CheckboxBoolComponent v-model="signInData.remember" id="remember_me" :value="true">
                Запомнить меня
            </CheckboxBoolComponent>
        </div>
        <ButtonComponent :class="$style.buttonForm">
            Войти
        </ButtonComponent>
    </form>
</template>

<script setup>
import ButtonComponent from "../../UI/Buttons/ButtonComponent.vue";
import {reactive, ref} from "vue";
import CheckboxBoolComponent from "../../UI/Checkboxes/CheckboxBoolComponent.vue";
import useSignIn from "../../../hooks/AuthHooks/useSignIn.js";
import InputPasswordFormComponent from "../../UI/Inputs/InputPasswordFormComponent.vue";
import InputTextFormComponent from "../../UI/Inputs/InputTextFormComponent.vue";

const signInData = reactive({email: "", password: "", remember: false})
const errors = ref(null)
const signIn = useSignIn(errors);
</script>

<style module>
@import "AuthentificationForm.module.scss";
</style>
