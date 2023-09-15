<template>
    <div :class="$style.counter">
        <button :class="$style.addSubtract" @click="inputDecrement(inputValue)">
            <font-awesome-icon icon="fa-solid fa-minus" :class="$style.buttonIcon"/>
        </button>
        <input type="text" v-model="inputValue" @input="inputChange" @blur="saveChangeAfterFocusOut"
               :class="$style.input"/>
        <button :class="$style.addButton" @click="inputIncrement(inputValue)">
            <font-awesome-icon icon="fa-solid fa-plus" :class="$style.buttonIcon"/>
        </button>
    </div>
</template>

<script setup>

import {ref} from "vue";
import {useStore} from "vuex";
import useBasketChangeQuantity from "../../../hooks/BasketHooks/useBasketChangeQuantity.js";

const props = defineProps({
    product: {
        required: true
    }
});

const inputValue = ref(props.product.quantity ?? 1);
const store = useStore();
const changeQuantity = useBasketChangeQuantity();

function inputChange(e) {
    inputValue.value = Number(e.target.value.replace(/[^0-9]/g, ""));
}

function saveChangeAfterFocusOut(e) {
    let value = Number(e.target.value.replace(/[^0-9]/g, ""))
    if (Number(value) === 0) {
        value = 1
    }
    inputValue.value = value;
    changeQuantity(props.product, inputValue.value);
}

function inputIncrement(count) {
    count = Number(count) + 1;
    if (count < 1000) {
        inputValue.value = (count);
        changeQuantity(props.product, inputValue.value);
    }
}

function inputDecrement(count) {
    count = Number(count) - 1;
    if (count > 0) {
        inputValue.value = count;
        changeQuantity(props.product, inputValue.value);
    }
}


</script>

<style module>
@import "CounterComponent.module.scss";
</style>
