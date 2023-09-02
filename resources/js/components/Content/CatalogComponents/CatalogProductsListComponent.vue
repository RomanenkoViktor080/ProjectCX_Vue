<template>
    <div :class="$style.productList">
        <ProductCardComponent v-for="product in products" :product="product"/>
    </div>
    <div ref="childRef" :style=" (isRequesting || fullProductLoaded) ? 'display: none' : null"/>
</template>
<script setup>
import ProductCardComponent from "../Product/ProductCardComponent.vue";
import {computed, onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import useScroll from "../../../hooks/useScroll.js";

const route = useRoute();
const category = computed(() => route.params.category)
const queryParams = computed(() => route.query);
const products = ref([]);
const page = ref(1);
const isRequesting = ref(true);
const firstProductLoaded = ref(false);
const fullProductLoaded = ref(false);
const childRef = ref(null);

onMounted(() => {
    useScroll(document.body, childRef.value, getProducts);
})

watch([category, queryParams], async ([newCategory, newQueryParams]) => {
    isRequesting.value = true;
    axios.get(`/api/catalog/${newCategory + getInitQueryParams(newQueryParams)}`).then((response) => {
        products.value = response.data;
        page.value = 2;
        firstProductLoaded.value = true;
        fullProductLoaded.value = false;
    })
        .catch((response) => {
            console.log(response);
        })
        .finally(() => {
            isRequesting.value = false;
        })
}, {immediate: true})

function getProducts() {
    if (firstProductLoaded.value) {
        isRequesting.value = true;
        axios.get(`/api/catalog/${category.value + getQueryParams()}`).then((response) => {
            if (!response.data.length) {
                fullProductLoaded.value = true;
                return;
            }
            products.value.push(...response.data);
            ++page.value;
        })
            .catch((response) => {
                console.log(response);
            })
            .finally(() => {
                isRequesting.value = false;
            })
    }
}

function getInitQueryParams(queryParams) {
    const initQueryParams = new URLSearchParams({...queryParams, page: 1})
    return '?' + initQueryParams.toString();
}

function getQueryParams() {
    const resultQueryParams = new URLSearchParams({...queryParams.value, page: page.value})
    return '?' + resultQueryParams.toString();
}
</script>

<style module>
@import "CatalogProductsListComponent.module.css";
</style>
