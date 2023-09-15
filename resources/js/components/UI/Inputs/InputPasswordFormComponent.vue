<template>
    <div :class="$style.inputPasswordContainer">
        <input :type="inputType ? 'text' : 'password'" v-bind="$attrs" :value="modelValue" @input="updateValue" :class="$style.input"/>
        <button type="button" :class="$style.button" @click="setInputType">
            <font-awesome-icon icon="fa-regular fa-eye" v-if="inputType" :class="$style.buttonIcon"/>
            <font-awesome-icon icon="fa-regular fa-eye-slash" v-else :class="$style.buttonIcon"/>
        </button>
    </div>
</template>

<script setup>
import {ref} from "vue";

const inputType = ref(false)
function  setInputType(){
    inputType.value = !inputType.value;
}

const props = defineProps({
    modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
    emit('update:modelValue', event.target.value)
}

</script>

<style module>
@import "InputPasswordFormComponent.module.scss";
@import "InputFormComponent.module.scss";
</style>
