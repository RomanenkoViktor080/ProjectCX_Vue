<template>
    <div :class="$style.filterRadio">
        <input :class="$style.input" type="radio" @change="updateValue" :value="value" :id="id" v-bind="$attrs"/>
        <label :class="$style.label" :for="id">
            <slot/>
        </label>
    </div>
</template>

<script setup>

import {computed} from "vue";

const props = defineProps({
    id: {required: true},
    value: {default: undefined},
    modelValue: [Boolean, String, Object, Array, Number]
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
    emit('update:modelValue', event.target.value)
}

</script>

<style module>
@import "RadioComponent.module.scss";
</style>
