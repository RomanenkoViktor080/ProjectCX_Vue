import React from 'react';
import classes from "./ProductRatingComponent.module.scss";
import {BsStarFill} from "react-icons/bs";

const ProductRatingComponent = ({classWrapper}) => {
    return (
        <div className={[classes.ratingBlock, classWrapper].filter(Boolean).join(" ")}>
            <div className={classes.ratingHeader}>
                <span className={classes.title}>Рейтинг</span>
                <span className={classes.ratingValue}>4.6 / 5</span>
            </div>
            <div className={classes.ratingBody}>
                <div className={classes.ratingRowItem}>
                    <div className={classes.starsQuantity}><span className={classes.starsQuantityText}>5</span>
                        <BsStarFill className={classes.starIcon}/></div>
                    <div className={classes.reviewScoreValuePercentage}>40%</div>

                    <div className={classes.reviewScoreBody}>
                        <div className={classes.reviewScoreContainer}>
                            <div className={classes.reviewScoreFill} style={{width: "40%"}}></div>
                        </div>
                    </div>
                    <span className={classes.reviewScoreValue}> 453</span>
                </div>
                <div className={classes.ratingRowItem}>
                    <div className={classes.starsQuantity}><span className={classes.starsQuantityText}>4</span>
                        <BsStarFill className={classes.starIcon}/></div>
                    <div className={classes.reviewScoreValuePercentage}>22%</div>

                    <div className={classes.reviewScoreBody}>
                        <div className={classes.reviewScoreContainer}>
                            <div className={classes.reviewScoreFill} style={{width: "22%"}}></div>
                        </div>
                    </div>
                    <span className={classes.reviewScoreValue}> 453</span>
                </div>
                <div className={classes.ratingRowItem}>
                    <div className={classes.starsQuantity}><span className={classes.starsQuantityText}>3</span>
                        <BsStarFill className={classes.starIcon}/></div>
                    <div className={classes.reviewScoreValuePercentage}>18%</div>

                    <div className={classes.reviewScoreBody}>
                        <div className={classes.reviewScoreContainer}>
                            <div className={classes.reviewScoreFill} style={{width: "18%"}}></div>
                        </div>
                    </div>
                    <span className={classes.reviewScoreValue}> 453</span>
                </div>
                <div className={classes.ratingRowItem}>
                    <div className={classes.starsQuantity}><span className={classes.starsQuantityText}>2</span>
                        <BsStarFill className={classes.starIcon}/></div>
                    <div className={classes.reviewScoreValuePercentage}>12%</div>

                    <div className={classes.reviewScoreBody}>
                        <div className={classes.reviewScoreContainer}>
                            <div className={classes.reviewScoreFill} style={{width: "12%"}}></div>
                        </div>
                    </div>
                    <span className={classes.reviewScoreValue}> 453</span>
                </div>
                <div className={classes.ratingRowItem}>
                    <div className={classes.starsQuantity}><span className={classes.starsQuantityText}>1</span>
                        <BsStarFill className={classes.starIcon}/></div>
                    <div className={classes.reviewScoreValuePercentage}>8%</div>

                    <div className={classes.reviewScoreBody}>
                        <div className={classes.reviewScoreContainer}>
                            <div className={classes.reviewScoreFill} style={{width: "8%"}}></div>
                        </div>
                    </div>
                    <span className={classes.reviewScoreValue}> 453</span>
                </div>
            </div>
        </div>
    );
};

export default ProductRatingComponent;
