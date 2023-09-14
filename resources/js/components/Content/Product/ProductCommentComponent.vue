<template>
    <div :class="$style.commentWrapper">
        <div :class="$style.commentHeader">
            <router-link to="#" :class="$style.userLink">
                <div :class="$style.userImage">
                    <img
                        src="https://avatars.mds.yandex.net/i?id=fcd934fb3fd86beedd13a150df698436402c5590-5113868-images-thumbs&n=13"/>
                </div>
                <div :class="$style.userName">Oleg</div>
            </router-link>
            <div :class="$style.userScore">
                <StarsRatingComponent :start-rating="3"/>
                    <span :class="$style.commentDate">2 Декабря 2022</span>
            </div>

        </div>
        <div :class="$style.commentBody">
            <div :class="$style.commentInfoBlock">
                <div :class="$style.commentInfoBlockTitle">Достоинства:</div>
                <div>цена</div>
            </div>
            <div :class="$style.commentInfoBlock">
                <div :class="$style.commentInfoBlockTitle">Недостатки:</div>
                <div>Придумайте</div>
            </div>
            <div :class="$style.commentInfoBlock">
                <div :class="$style.commentInfoBlockTitle">Комментарий:</div>
                <div>Норм</div>
            </div>
        </div>
        <div :class="$style.commentFooter">
            <div :class="$style.commentActions">
                <div>Отзыв полезен?</div>
                <div :class="$style.commentActionsButtons">
                    <button :class="$style.commentActionsButton">
                        <font-awesome-icon icon="fa-regular fa-thumbs-down" :class="$style.buttonIcon"/>
                        <span>1</span></button>
                    <button :class="$style.commentActionsButton">
                        <font-awesome-icon icon="fa-regular fa-thumbs-up" :class="$style.buttonIcon"/>
                        <span>2</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import StarsRatingComponent from "../../UI/Raiting/StarsRatingComponent.vue";
</script>

<style module>
@import "ProductCommentComponent.module.scss";
</style>
