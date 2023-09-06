<template>
    <ProfileWrapperComponent :set-profile-state="setProfileState">
        <div :class="$style.profileSettings">
            <div :class="$style.settingsBlock">
                <div :class="$style.settingsBlockTitle">
                    Публичные данные
                </div>
                <div :class="$style.settingsBlockDescription">
                    Информация, которую вы укажете в этом разделе, публичная. Она указывается рядом с отзывами и
                    видна другим пользователям сети Интернет. Размещая свои персональные данные в данном разделе, вы
                    раскрываете их неопределенному кругу лиц.
                </div>
                <div :class="$style.settingsBlockBody">
                    <template v-if="formOpened.publicData">

                        <InputTextFormComponent placeholder="+7 990 984 57 34" :class="$style.formInput"/>
                        <InputTextFormComponent placeholder="example@gmail.com" :class="$style.formInput"/>
                    </template>

                    <template v-else>
                        <div>Телефон: +7 990 984 57 34</div>
                        <div>Почта: example@gmail.com</div>
                    </template>

                    <div :class="$style.formActions">
                        <template v-if="formOpened.publicData">
                            <ButtonComponent :class="$style.formActionsButton"
                                             @click="() => formOpened.publicData = false">Отменить
                            </ButtonComponent>
                            <ButtonComponent :class="$style.formActionsButton">Сохранить</ButtonComponent>
                        </template>
                        <ButtonComponent v-else :class="$style.formActionsButton"
                                         @click="() => formOpened.publicData = true">Изменить
                        </ButtonComponent>

                    </div>
                </div>
            </div>
            <div :class="$style.settingsBlock">
                <div :class="$style.settingsBlockTitle">
                    Учётные данные
                </div>
                <div :class="$style.settingsBlockDescription">
                    Настройка данных учетной записи
                </div>
                <div :class="$style.settingsBlockBody">
                    <template v-if="formOpened.accountsData">
                        <InputTextFormComponent placeholder="Олег" :class="$style.formInput"/>
                            <InputTextFormComponent placeholder="Романенко"
                                                    :class="$style.formInput"/>
                    </template>
                    <template v-else>
                        <div>Имя: Олег</div>
                        <div>Фамилия: Романенко</div>
                    </template>

                    <div :class="$style.formActions">
                        <template v-if="formOpened.accountsData">
                            <ButtonComponent :class="$style.formActionsButton"
                                             @click="() => formOpened.accountsData = false">Отменить
                            </ButtonComponent>
                            <ButtonComponent
                                :class="$style.formActionsButton">Сохранить
                            </ButtonComponent>
                        </template>
                        <ButtonComponent v-else :class="$style.formActionsButton"
                                         @click="() => formOpened.accountsData = true">Изменить
                        </ButtonComponent>
                    </div>
                </div>
            </div>
        </div>
    </ProfileWrapperComponent>
</template>

<script setup>
import ProfileWrapperComponent from "./ProfileWrapperComponent.vue";
import InputTextFormComponent from "../../UI/Inputs/InputTextFormComponent.vue";
import ButtonComponent from "../../UI/Buttons/ButtonComponent.vue";
import {ref} from "vue";

const props = defineProps({
    setProfileState: Function
})

const formOpened = ref({publicData: false, accountsData: false});
</script>

<style module>
@import "ProfileSettingsComponent.module.scss";
</style>
