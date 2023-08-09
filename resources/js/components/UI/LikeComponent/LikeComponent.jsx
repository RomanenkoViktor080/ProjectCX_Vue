import React, {useState} from 'react';
import classes from "./LikeComponent.module.scss";
import {BsHeart, BsHeartFill} from "react-icons/bs";

const LikeComponent = ({propClass}) => {

    const [liked, setLiked] = useState(true);

    return (
        <span className={classes.likeBlock}>
            {
                liked ? <BsHeartFill className={[classes.likeItem, propClass].filter(item => item).join(" ")} onClick={() => setLiked(false)}/>
                : <BsHeart className={[classes.likeItem, propClass].filter(item => item).join(" ")} onClick={() => setLiked(true)}/>
            }
        </span>
    );
};

export default LikeComponent;
