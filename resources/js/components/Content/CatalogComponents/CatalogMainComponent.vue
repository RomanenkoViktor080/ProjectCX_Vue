<template>
    <div :class="$style.catalogMain">
        <CatalogSorterBlockComponent/>
<!--        <CatalogSorterBlockComponent setCatalogMobileActive={setCatalogMobileActive}/>
            <CatalogProductsListComponent/>-->
    </div>
</template>
<style module>
@import "CatalogMainComponent.module.scss";
</style>
<script setup>
import CatalogSorterBlockComponent from "../../UI/Selects/CatalogSorterBlockComponent.vue";
</script>
