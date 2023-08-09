import React from 'react';
import HeaderComponent from "./Header/HeaderComponent.vue";
import FooterComponent from "./Footer/FooterComponent";
import classes from "./App.module.scss";
import {Route, Routes} from "react-router";
import NotFoundPageComponent from "../Pages/NotFoundPageComponent.vue";
import HomePageComponent from "../Pages/HomePageComponent.vue";
import ProductPageComponent from "../Pages/ProductPageComponent";
import CatalogPageComponent from "../Pages/CatalogPageComponent";
import ProfilePageComponent from "../Pages/ProfilePageComponent";
import BasketPage from "../Pages/BasketPage";
import MobileNavigationComponent from "./Content/Mobile/MobileNavigationComponent";
import ProductPreviewPopupComponent from "./Content/Product/ProductPreviewPopupComponent";
import {useSelector} from "react-redux";
import ButtonComponent from "./UI/Buttons/ButtonComponent.vue";


const App = () => {
    const productPreviewPopupState = useSelector(state => state.productReducer.popupState)
    const isAuth = useSelector(state => state.userReducer.isAuth);
    const AuthProtected = ({ children}) => {

        if (isAuth) {
            return (
                    <>
                        {children}
                    </>
            );
        }
        else{
            return (
                <>
                    <ButtonComponent>Назад</ButtonComponent>
                    <div>
                        Профиль не найден
                    </div>
                </>
            );
        }
    };


    return (
        <>
            <HeaderComponent/>
            <div className={classes.main}>
                <div className={classes.container}>
                    <Routes>
                        <Route path="/" element={<HomePageComponent/>}/>
                        <Route path="/catalog/:category" element={<CatalogPageComponent/>}/>
                        <Route path="/item/:productId" element={<ProductPageComponent/>}/>
                        <Route path="/profile/*" element={<AuthProtected><ProfilePageComponent/></AuthProtected>}/>
                        <Route path="/cart" element={<BasketPage/>}/>
                        <Route path="/*" element={<NotFoundPageComponent/>}/>
                    </Routes>
                </div>
            </div>
            <MobileNavigationComponent/>
            {productPreviewPopupState && <ProductPreviewPopupComponent/>}
            <FooterComponent/>
        </>
    );
};

export default App;

