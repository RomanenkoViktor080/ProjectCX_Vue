<template>
    <div :class="$style.FilterCheckBox">
        <input :class="$style.input" v-model="model" :value="value" :id="id" type="checkbox"
               v-bind="$attrs"/>
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
    modelValue: [Boolean, String, Object, Array]
});

const emit = defineEmits(['update:modelValue'])

const model = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});

</script>
<style module>
@import "CheckboxComponent.module.scss";
</style>
