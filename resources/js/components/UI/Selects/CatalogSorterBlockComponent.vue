<template>
    <div :class="$style.catalogSorter" v-if="sorterData.length">
        <select :value="selected" @change="changeSort" :class="$style.catalogSelect">
            <option hidden value="default">Сортировка</option>
            <option v-for="[value, title] in sorterData"
                    :value="value"
                    :key="value"
            >
                {{ title }}
            </option>
        </select>
        <font-awesome-icon icon="fa-solid fa-sliders" :class="$style.catalogBurgerMobile"
                           @click="setCatalogMobileActive(true)"/>
    </div>
</template>
<script setup>
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const props = defineProps({
    setCatalogMobileActive: {
        required: true
    }
})
const route = useRoute();
const router = useRouter();
const sorterData = ref([]);
const selected = computed(() => {
    if (sorterData.value.some(([i, k]) => i === route.query.sort)) {
        return route.query.sort;
    }
    return "default"
})
const queryParams = computed(() => route.query);

const changeSort = (e) => {
    router.push({query: {...queryParams.value, sort: e.target.value}});
}

onMounted(async () => {
    try {
        const response = await axios.get('/api/sorter-data');
        sorterData.value = Object.entries(response.data);
    } catch (errors) {
        console.log(errors);
    }
})
</script>

<style module>
@import "CatalogSorterBlockComponent.module.scss";
</style>
