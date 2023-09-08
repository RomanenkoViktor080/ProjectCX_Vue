import React from 'react';
import classes from "./ProductCommentComponent.module.scss";
import {Link} from "react-router-dom";
import StarsRatingComponent from "../../UI/Raiting/StarsRatingComponent.vue";
import {AiOutlineDislike, AiOutlineLike} from "react-icons/ai";

const ProductCommentComponent = () => {
    return (
        <div className={classes.commentWrapper}>
            <div className={classes.commentHeader}>
                <Link className={classes.userLink}>
                    <div className={classes.userImage}>
                        <img
                            src="https://avatars.mds.yandex.net/i?id=fcd934fb3fd86beedd13a150df698436402c5590-5113868-images-thumbs&n=13"/>
                    </div>
                    <div className={classes.userName}>Oleg</div>
                </Link>
                <div className={classes.userScore}>
                    <StarsRatingComponent startRating={3}/>
                    <span className={classes.commentDate}>2 Декабря 2022</span>
                </div>

            </div>
            <div className={classes.commentBody}>
                <div className={classes.commentInfoBlock}>
                    <div className={classes.commentInfoBlockTitle}>Достоинства:</div>
                    <div>цена</div>
                </div>
                <div className={classes.commentInfoBlock}>
                    <div className={classes.commentInfoBlockTitle}>Недостатки:</div>
                    <div>Придумайте</div>
                </div>
                <div className={classes.commentInfoBlock}>
                    <div className={classes.commentInfoBlockTitle}>Комментарий:</div>
                    <div>Норм</div>
                </div>
            </div>
            <div className={classes.commentFooter}>
                <div className={classes.commentActions}>
                    <div>Отзыв полезен?</div>
                    <div className={classes.commentActionsButtons}>
                        <button className={classes.commentActionsButton}><AiOutlineDislike
                            className={classes.buttonIcon}/><span>1</span></button>
                        <button className={classes.commentActionsButton}><AiOutlineLike className={classes.buttonIcon}/><span>2</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCommentComponent;
