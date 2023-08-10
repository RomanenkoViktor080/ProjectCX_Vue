import React from 'react';
import classes from "./FooterComponent.module.scss";
import SpoilerConvertComponent from "../UI/Spoiler/SpoilerConvertComponent.vue";

const FooterComponent = () => {
    return (
        <footer className={classes.footer} id={"footer"}>
            <div className={classes.container}>
                <div className={classes.footerNavigate}>
                    <SpoilerConvertComponent classWrapper={classes.navigateSpoiler} title={<div>Заголовок 1</div>}>
                        <div>text1</div>
                        <div>text2</div>
                        <div>text3</div>
                    </SpoilerConvertComponent>
                    <SpoilerConvertComponent classWrapper={classes.navigateSpoiler} title={<div>Заголовок 2</div>}>
                        <div>text1</div>
                        <div>text2</div>
                        <div>text3</div>
                    </SpoilerConvertComponent>
                    <SpoilerConvertComponent classWrapper={classes.navigateSpoiler} title={<div>Заголовок 3</div>}>
                        <div>text1</div>
                        <div>text2</div>
                        <div>text3</div>
                    </SpoilerConvertComponent>
                    <SpoilerConvertComponent classWrapper={classes.navigateSpoiler} title={<div>Заголовок 4</div>}>
                        <div>text1</div>
                        <div>text2</div>
                        <div>text3</div>
                    </SpoilerConvertComponent>
                    <SpoilerConvertComponent classWrapper={classes.navigateSpoiler} title={<div>Заголовок 5</div>}>
                        <div>text1</div>
                        <div>text2</div>
                        <div>text3</div>
                    </SpoilerConvertComponent>
                </div>
                <div className={classes.footerBottomInfo}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci at atque, culpa laborum obcaecati
                    odit perferendis quas suscipit. A, assumenda cum debitis eos error exercitationem ipsa maxime
                    molestiae nemo nihil nobis pariatur qui quis quisquam rerum sed sequi similique tempore temporibus
                    unde vel vero voluptatem voluptatibus. Cupiditate laborum porro reiciendis.
                </div>
                <div className={classes.copyrightBlock}>© ProjectCX | -_- |</div>
            </div>
        </footer>
    );
};

export default FooterComponent;
