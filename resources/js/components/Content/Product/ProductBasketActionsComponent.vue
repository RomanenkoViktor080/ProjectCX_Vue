<template>
    <div v-if="inBasket" :key="inBasket.title + inBasket.quantity" :class="$style.actionBlock">
        <CounterComponent :product="inBasket"/>
        <font-awesome-icon icon="fa-solid fa-trash" :class="$style.actionIcon"
                           @click="removeFromBasket(product.id)"
        />
    </div>
    <ButtonComponent v-else :class="$style.productButton" @click="addToBasket(product.id)">
        В корзину
    </ButtonComponent>
</template>

<script setup>
import ButtonComponent from "../../UI/Buttons/ButtonComponent.vue";
import CounterComponent from "../../UI/Counter/CounterComponent.vue";
import {computed} from "vue";
import useBasketAddItem from "../../../hooks/BasketHooks/useBasketAddItem.js";
import useBasketRemoveProduct from "../../../hooks/BasketHooks/useBasketRemoveProduct.js";
import {useStore} from "vuex";

const props = defineProps({
    product: {required: true}
})

const store = useStore();
const basketProduct = computed(() => store.state.basket.basketProducts);
const inBasket = computed(() => basketProduct.value.find(basketItem => Number(basketItem.id) === Number(props.product.id)));

const addToBasket = useBasketAddItem();
const removeFromBasket = useBasketRemoveProduct();
</script>

<style module>
.actionBlock {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
}


.actionIcon {
    font-size: 22px;
    display: flex;
    cursor: pointer;
}


.productButton {
    white-space: nowrap;
    overflow: hidden;
    font-size: 14px;
}

</style>
