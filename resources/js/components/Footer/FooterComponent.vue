<template>
    <footer :class="$style.footer" id="footer">
        <div :class="$style.container">
            <div :class="$style.footerNavigate">
                <SpoilerConvertComponent :class="$style.navigateSpoiler">
                    <template v-slot:title>
                        <div>Заголовок 1</div>
                    </template>
                    <template v-slot:body>
                        <div>text1</div>
                        <div>text2</div>
                        <div>text3</div>
                    </template>
                </SpoilerConvertComponent>
                <SpoilerConvertComponent :class="$style.navigateSpoiler">
                    <template v-slot:title>
                        <div>Заголовок 1</div>
                    </template>
                    <template v-slot:body>
                        <div>text1</div>
                        <div>text2</div>
                        <div>text3</div>
                    </template>
                </SpoilerConvertComponent>
                <SpoilerConvertComponent :class="$style.navigateSpoiler">
                    <template v-slot:title>
                        <div>Заголовок 1</div>
                    </template>
                    <template v-slot:body>
                        <div>text1</div>
                        <div>text2</div>
                        <div>text3</div>
                    </template>
                </SpoilerConvertComponent>
                <SpoilerConvertComponent :class="$style.navigateSpoiler">
                    <template v-slot:title>
                        <div>Заголовок 1</div>
                    </template>
                    <template v-slot:body>
                        <div>text1</div>
                        <div>text2</div>
                        <div>text3</div>
                    </template>
                </SpoilerConvertComponent>
                <SpoilerConvertComponent :class="$style.navigateSpoiler">
                    <template v-slot:title>
                        <div>Заголовок 1</div>
                    </template>
                    <template v-slot:body>
                        <div>text1</div>
                        <div>text2</div>
                        <div>text3</div>
                    </template>
                </SpoilerConvertComponent>
        </div>
        <div :class="$style.footerBottomInfo">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci at atque, culpa laborum obcaecati
            odit perferendis quas suscipit. A, assumenda cum debitis eos error exercitationem ipsa maxime
            molestiae nemo nihil nobis pariatur qui quis quisquam rerum sed sequi similique tempore temporibus
            unde vel vero voluptatem voluptatibus. Cupiditate laborum porro reiciendis.
        </div>
        <div :class="$style.copyrightBlock">© ProjectCX | -_- |</div>
        </div>
    </footer>
</template>

<script setup>

import SpoilerConvertComponent from "../UI/Spoiler/SpoilerConvertComponent.vue";
</script>

<style module>
@import "FooterComponent.module.scss";
</style>
