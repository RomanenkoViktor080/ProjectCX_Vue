<template>
    <input type="text" :value="modelValue" @input="updateValue" v-bind="$attrs"
           :class="$style.inputFill"/>
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

.inputFill {
    border: 2px solid var(--main-light-grey-color);
    border-radius: 15px;
    background: var(--main-very-light-grey-color);
    padding: 10px 10px 6px;
    color: var(--main-grey-color);

    &:focus {
        outline: none;
        border: 2px solid var(--main-grey-color);
    }
}
</style>
