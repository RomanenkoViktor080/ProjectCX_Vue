<template>
    <div :class="$style.catalogMain">
<!--        <CatalogSorterBlockComponent setCatalogMobileActive={setCatalogMobileActive}/>-->
        <CatalogSorterBlockComponent/>
<!--            <CatalogProductsListComponent/>-->
    <CatalogProductsListComponent/>
    </div>
</template>
<style module>
@import "CatalogMainComponent.module.scss";
</style>
<script setup>
import CatalogSorterBlockComponent from "../../UI/Selects/CatalogSorterBlockComponent.vue";
import CatalogProductsListComponent from "./CatalogProductsListComponent.vue";
</script>
