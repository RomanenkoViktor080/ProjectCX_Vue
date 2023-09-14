<template>
    <div :class="$style.ratingBlock" v-bind="$attrs">
        <div :class="$style.ratingHeader">
            <span :class="$style.title">Рейтинг</span>
            <span :class="$style.ratingValue">4.6 / 5</span>
        </div>
        <div :class="$style.ratingBody">
            <div :class="$style.ratingRowItem">
                <div :class="$style.starsQuantity"><span :class="$style.starsQuantityText">5</span>
                    <font-awesome-icon icon="fa-solid fa-star" :class="$style.starIcon"/>
                </div>
                <div :class="$style.reviewScoreValuePercentage">40%</div>

                <div :class="$style.reviewScoreBody">
                    <div :class="$style.reviewScoreContainer">
                        <div :class="$style.reviewScoreFill" style="{width: 40%}"></div>
                    </div>
                </div>
                <span :class="$style.reviewScoreValue"> 453</span>
            </div>
            <div :class="$style.ratingRowItem">
                <div :class="$style.starsQuantity"><span :class="$style.starsQuantityText">4</span>
                    <font-awesome-icon icon="fa-solid fa-star" :class="$style.starIcon"/>
                </div>
                <div :class="$style.reviewScoreValuePercentage">22%</div>
                <div :class="$style.reviewScoreBody">
                    <div :class="$style.reviewScoreContainer">
                        <div :class="$style.reviewScoreFill" style="{width: 22%}"></div>
                    </div>
                </div>
                <span :class="$style.reviewScoreValue"> 453</span>
            </div>
            <div :class="$style.ratingRowItem">
                <div :class="$style.starsQuantity"><span :class="$style.starsQuantityText">3</span>
                    <font-awesome-icon icon="fa-solid fa-star" :class="$style.starIcon"/>
                </div>
                <div :class="$style.reviewScoreValuePercentage">18%</div>

                <div :class="$style.reviewScoreBody">
                    <div :class="$style.reviewScoreContainer">
                        <div :class="$style.reviewScoreFill" style="{width: 18%}"></div>
                    </div>
                </div>
                <span :class="$style.reviewScoreValue"> 453</span>
            </div>
            <div :class="$style.ratingRowItem">
                <div :class="$style.starsQuantity"><span :class="$style.starsQuantityText">2</span>
                    <font-awesome-icon icon="fa-solid fa-star" :class="$style.starIcon"/>
                </div>
                <div :class="$style.reviewScoreValuePercentage">12%</div>
                <div :class="$style.reviewScoreBody">
                    <div :class="$style.reviewScoreContainer">
                        <div :class="$style.reviewScoreFill" style="{width: 12%}"></div>
                    </div>
                </div>
                <span :class="$style.reviewScoreValue"> 453</span>
            </div>
            <div :class="$style.ratingRowItem">
                <div :class="$style.starsQuantity"><span :class="$style.starsQuantityText">1</span>
                    <font-awesome-icon icon="fa-solid fa-star" :class="$style.starIcon"/>
                </div>
                <div :class="$style.reviewScoreValuePercentage">8%</div>
                <div :class="$style.reviewScoreBody">
                    <div :class="$style.reviewScoreContainer">
                        <div :class="$style.reviewScoreFill" style="{width: 8%}"></div>
                    </div>
                </div>
                <span :class="$style.reviewScoreValue"> 453</span>
            </div>
        </div>
    </div>
</template>
<style module>
@import "ProductRatingComponent.module.scss";
</style>
