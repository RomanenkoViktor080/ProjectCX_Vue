<template>
    <div :class="classBody">
        <template v-for="item in itemsToShow">
                {{ item.title }}
        </template>
    </div>
    <!--    {items.length > quantityToShow && showMoreFn
        ?
        <div style="cursor: pointer"
        @click="changeStatusShow">{statusShow ? "Свернуть" : "Развернуть"}</div> : null
        }-->
</template>

<script>
export default {
    name: "ShowMoreOrLessComponent",
    props: ["classBody", "items", "showMoreFn", "quantityToShow"],
    data() {
        return {
            showStatus: false,
        }
    },
    computed: {
        itemsToShow() {
            return this.items.slice(this.quantityToShow > this.items.length || this.showStatus === true ? items.length : this.quantityToShow)
        }
    },
    methods: {
        changeStatusShow() {
            this.showStatus = !this.showStatus;
        }
    }

}
</script>

<style module>
@import "ShowMoreOrLessComponent.module.scss";
</style><!--
import React, {useState} from 'react';

const ShowMoreOrLessComponent = ({
items = [], quantityToShow = 5,
showMoreFn = true,
classBody
}) => {

const [statusShow, setStatusShow] = useState(false);

return (
<>

</>
);
};

export default ShowMoreOrLessComponent;
-->
