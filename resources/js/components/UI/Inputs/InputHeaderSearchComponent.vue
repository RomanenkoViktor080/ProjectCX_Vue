<template>
    <form :class="$style.headerSearchContainer" v-bind="$attrs">
        <input :class="$style.searchInput" type="text" name="#" :placeholder="placeholder"/>
        <button :class="$style.button" @click.prevent>
            <font-awesome-icon :class="$style.buttonIcon" icon="fa-solid fa-magnifying-glass"/>
        </button>
    </form>
</template>

<script>
export default {
    props:['placeholder']
}
</script>

<style module>
@import "InputHeaderSearchComponent.module.scss";
</style>
