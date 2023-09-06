<template>
    <button :class="$style.button" v-bind="$attrs">
        <slot/>
    </button>
</template>
<style module>
@import "ButtonComponent.module.scss";
</style>
