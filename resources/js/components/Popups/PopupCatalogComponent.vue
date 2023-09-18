<template>
    <div :class="popupWrapperClasses" @click="changeCatalogPopupState(false)">
        <div :class="$style.body" @click.stop>
            <div :class="catalogClasses.menuCatalog">
                <div :class="$style.mobileBackButton" @click="changeCatalogPopupState(false)">Закрыть</div>
                <template v-for="(category, index) in categories">
                    <div :class="[$style.categoryMenuItem,
                        (catalogMenuState === index || (catalogMenuState === null && index === 0)) && $style.menuItemActive]"
                         @click="changeCatalogMenuState(index)">
                        <span :class="$style.categoryMenuItemText">
                        {{ category.title }}
                        </span>
                        <font-awesome-icon icon="fa-solid fa-angle-down" :class="$style.categoryMenuItemIcon"/>
                        <router-link :to="{name: 'category', params: {'category': category.slug}}"
                                     :class="$style.categoryMenuItemDesktopLink"
                                     @click="changeCatalogPopupState(false)"
                                     @mouseenter="changeCatalogMenuState(index)"/>
                    </div>
                </template>
            </div>
            <div :class="catalogClasses.contentCatalog">
                <div :class="$style.mobileBackButton" @click="changeCatalogMenuState(null)">Назад</div>
                <div v-for="CatalogCategoryColumn in CatalogCategoryColumns" :class="$style.categoryContentColumn">
                    <template v-for="CatalogCategoryBlock in CatalogCategoryColumn">
                        <SpoilerConvertComponent>
                            <template v-slot:title>
                                <router-link :to="{name: 'category', params: {'category': CatalogCategoryBlock.slug}}"
                                             :class="$style.categoryContentBlockTitle"
                                             @click="changeCatalogPopupState(false)"
                                >{{ CatalogCategoryBlock.title }}
                                </router-link>
                            </template>
                            <template v-slot:body>
                                <ShowMoreOrLessComponentLinks
                                    quantity-to-show="5"
                                    v-slot="body"
                                    :items="CatalogCategoryBlock.childrenCategories"
                                    :link-class="$style.categoryContentBlockItemTitle"
                                    show-more-fn="true"
                                />
                            </template>
                        </SpoilerConvertComponent>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {mapState, useStore} from "vuex";
import SpoilerConvertComponent from "../UI/Spoiler/SpoilerConvertComponent.vue";
import ShowMoreOrLessComponentLinks from "../UI/ShowMoreOrLess/ShowMoreOrLessLinksComponent.vue";
import {computed, onMounted, ref, useCssModule} from "vue";

const categories = ref([]);
const store = useStore();
const style = useCssModule();
const catalogPopupState = computed(() => store.state.catalog.catalogPopupState);
const catalogMenuState = computed(() => store.state.catalog.catalogMenuState);
const popupWrapperClasses = computed(() => {
    if (catalogPopupState.value) {
        return [style.categoryPopup, style.popupaAtive];
    }
    return [style.categoryPopup];
})
const catalogClasses = computed(() => {
    if (catalogMenuState.value === null) {
        return {
            menuCatalog: [style.categoryMenu],
            contentCatalog: [style.categoryContent, style.hiddenOnMobile]
        }
    }
    return {
        menuCatalog: [style.categoryMenu, style.hiddenOnMobile],
        contentCatalog: [style.categoryContent]
    }
})

const CatalogCategoryColumns = computed(() => {
    const childrenCategories = categories.value[catalogMenuState.value ?? 0]?.childrenCategories;
    if (!childrenCategories) {
        return;
    }
    const childrenCategoriesCount = childrenCategories.length;
    const column1End = Math.floor(childrenCategoriesCount / 3);
    const column2End = Math.floor(childrenCategoriesCount / 3 * 2);
    const column1 = childrenCategories.slice(0, column1End);
    const column2 = childrenCategories.slice(column1End, column2End);
    const column3 = childrenCategories.slice(column2End);
    return [column1, column2, column3];
})

onMounted(async () => {
    try {
        const response = await axios.get('/api/catalog-data');
        categories.value = response.data;
    } catch (error) {
        console.log(error);
    }
});

function changeCatalogPopupState(state) {
    store.dispatch('changeCatalogPopupState', state);
}

function changeCatalogMenuState(state) {
    store.dispatch('changeCatalogMenuState', state);
}
</script>

<style module>
@import "PopupCatalogComponent.module.scss";
</style>
