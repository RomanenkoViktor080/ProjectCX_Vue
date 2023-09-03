<template>
    <div :class="$style.catalogMain">
        <CatalogSorterBlockComponent :set-catalog-mobile-active="setCatalogMobileActive"/>
    <CatalogProductsListComponent/>
    </div>
</template>

<script setup>
import CatalogSorterBlockComponent from "../../UI/Selects/CatalogSorterBlockComponent.vue";
import CatalogProductsListComponent from "./CatalogProductsListComponent.vue";

const props = defineProps({
    setCatalogMobileActive: {
        required: true
    }
})
</script>

<style module>
@import "CatalogMainComponent.module.scss";
</style>
