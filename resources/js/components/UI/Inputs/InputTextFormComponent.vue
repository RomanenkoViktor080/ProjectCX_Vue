<template>
    <input type="text" :value="modelValue" @input="updateValue" :class="$style.input" v-bind="$attrs"/>
</template>

<script setup>

const props = defineProps({
    modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
    emit('update:modelValue', event.target.value)
}

</script>

<style module>
@import "InputFormComponent.module.scss";
</style>
