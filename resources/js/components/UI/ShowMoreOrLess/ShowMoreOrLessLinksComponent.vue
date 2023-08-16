<template>
    <div :class="classBody">
        <template v-for="item in itemsToShow">
            <router-link :to="{name: 'category', params: {category: item.slug} }"
                         :class="linkClass"
                         @click="changeCatalogPopupState(false)"
            >
                {{ item.title }}
            </router-link>
        </template>
    </div>
    <div v-if="items.length > quantityToShow && showMoreFn" style="cursor: pointer" @click="changeStatusShow">
        Развернуть
    </div>
</template>

<script>
export default {
    name: "ShowMoreOrLessComponentLinks",
    props: ["classBody", "linkClass", "items", "showMoreFn", "quantityToShow"],
    data() {
        return {
            showStatus: false,
        }
    },
    computed: {
        itemsToShow() {
            return this.items.slice(0, this.quantityToShow > this.items.length || this.showStatus === true ? this.items.length : this.quantityToShow)
        }
    },
    methods: {
        changeCatalogPopupState(state) {
            this.$store.dispatch('changeCatalogPopupState', state);
        },
        changeStatusShow() {
            this.showStatus = !this.showStatus;
        }
    }

}
</script>
