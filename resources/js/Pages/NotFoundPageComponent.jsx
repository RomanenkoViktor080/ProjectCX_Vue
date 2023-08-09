import React from 'react';
import classes from "./NotFoundPageComponent.module.scss";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import ButtonComponent from "../components/UI/Buttons/ButtonComponent";
import SwiperAdvertisementProductsComponent from "../components/Sliders/SwiperAdvertisementProductsComponent";

const NotFoundPageComponent = () => {
    const navigate = useNavigate()
    return (
        <div className={classes.app}>
            <div className={classes.messageBlock}>
                <div className={classes.title}>Ошибка 404</div>
                <div className={classes.message}>Страница ненайдена!</div>
                <div className={classes.actions}>
                    <Link to={"/"}><ButtonComponent classWrapper={classes.button}>Вернутся на главную</ButtonComponent></Link>
                    <div onClick={() => navigate(-1)}><ButtonComponent
                        classWrapper={classes.button}>Назад</ButtonComponent></div>
                </div>
            </div>
            <SwiperAdvertisementProductsComponent title={"Недавно просмотренные"}/>
        </div>
    );
};

export default NotFoundPageComponent;
