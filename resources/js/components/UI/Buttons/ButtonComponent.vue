<template>
    <button :class="[$style.button, classWrapper]" @click="onClick" v-bind="$attrs"><slot/></button>
</template>

<script>
export default {
    name: "ButtonComponent",
    props: ['classWrapper', 'onClick']
}
</script>

<style module>
@import "ButtonComponent.module.scss";
</style>
