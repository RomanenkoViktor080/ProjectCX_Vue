<template>
    <div :class="classesWrapper">
        <div :class="$style.titleHeader">
            {{ title }}
            <div :class="$style.button" @click="changeSpoilerState"></div>
            <font-awesome-icon icon="fa-solid fa-angle-down" :class="$style.titleIcon"/>
        </div>
        <div :class="[$style.body, classBody]">
            <slot/>
        </div>
    </div>
</template>

<script>
export default {
    name: "SpoilerConvertComponent",
    props: ['classWrapper', 'classBody', 'title', 'startState'],
    data() {
        return {
            spoilerState: this.startState
        }
    },
    computed: {
        classesWrapper() {
            if (this.spoilerState) {
                return [this.$style.spoiler, this.classWrapper]
            }
            return [this.$style.spoiler, this.classWrapper, this.$style.close]
        }
    }
    ,
    methods: {
        changeSpoilerState(){
            this.spoilerState = !this.spoilerState;
        }
    }
}

</script>

<style module>
@import "SpoilerConvertComponent.module.scss";
</style>
import React, {useEffect, useMemo, useState} from 'react';
import classes from "./SpoilerConvertComponent.module.scss";
import {IoIosArrowDown} from "react-icons/io";
import {retry} from "@reduxjs/toolkit/query";

const SpoilerConvertComponent = ({
classWrapper = null,
classBody = null,
title = null,
startState = false,
children
}) => {

const [stateSpoiler, setStateSpoiler] = useState(startState);
const classesWrapper = useMemo(() => {
if (stateSpoiler) {
return [classes.spoiler, classWrapper]
}
return [classes.spoiler, classWrapper, classes.close]
}, [stateSpoiler]);

function openOrClose() {
setStateSpoiler(state => !state)
}

return (

);
};

export default SpoilerConvertComponent;
