<template>
    <div :class="$style.FilterCheckBox">
        <input :class="$style.input" @change="updateValue" :value="modelValue" :id="id" type="checkbox"
               v-bind="$attrs"/>
        <label :class="$style.label" :for="id">
            <slot/>
        </label>
    </div>
</template>

<script setup>
const props = defineProps({
    name: String,
    id: String,
    modelValue: [Boolean, String, Object]
});
const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
    emit('update:modelValue', event.target.checked)
}

</script>
<style module>
@import "CheckboxComponent.module.scss";
</style>
