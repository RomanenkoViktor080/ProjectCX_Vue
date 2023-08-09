import React, {useEffect, useMemo, useState} from 'react';
import classes from "./PopupCatalogComponent.module.scss";
import {Link} from "react-router-dom";
import SpoilerConvertComponent from "../UI/Spoiler/SpoilerConvertComponent";
import {useDispatch, useSelector} from "react-redux";
import {changeCategoryMenuState, changeCategoryPopupState} from "../../store/reducers/catalogReducer";
import ShowMoreOrLessComponent from "../UI/ShowMoreOrLess/ShowMoreOrLessComponent";
import {IoIosArrowDown} from "react-icons/io";
import axios from "axios";
import {isEmpty} from "lodash";


const PopupCatalogComponent = ({classWrapper = null}) => {

    const dispatch = useDispatch();
    const catalogPopupState = useSelector(state => state.catalogReducer.popupState)
    const menuState = useSelector(state => state.catalogReducer.menuState)
    const [categories, getCategories] = useState([]);
    const catalogClasses = useMemo(() => {
        if (menuState === null) {
            return {
                menuCatalog: [classes.categoryMenu],
                contentCatalog: [classes.categoryContent, classes.hiddenOnMobile]
            }
        }
        return {
            menuCatalog: [classes.categoryMenu, classes.hiddenOnMobile],
            contentCatalog: [classes.categoryContent]
        }
    }, [menuState]);

    const popupWrapperClasses = useMemo(() => {
        if (catalogPopupState) {
            return [classes.categoryPopup, classWrapper, classes.popupaAtive].join(" ");
        }
        return [classes.categoryPopup, classWrapper].join(" ");
    }, [catalogPopupState]);


    useEffect(() => {
        axios.get('/api/catalog-data').then((response) => {
            getCategories(response.data);
        })
            .catch((response) => {
                console.log(response.data);
            })
    }, []);


    useEffect(() => {
        if (catalogPopupState) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => document.body.style.overflow = "auto";
    }, [catalogPopupState])

    const setMenuState = (state) => {
        dispatch(changeCategoryMenuState(state))
    }

    const setPopupCategoryState = (state) => {
        dispatch(changeCategoryPopupState(state))
    }


    const CatalogCategoryBlocks = useMemo(() => {
        if (isEmpty(categories)) {
            return;
        }
        let blocks = categories[menuState ?? 0]?.childrenCategories.map((category) =>
            <SpoilerConvertComponent
                key={category.id}
                classWrapper={classes.categoryContentBlock}
                title={catalogBlockTitleLink(category.title, category.slug)}>
                <ShowMoreOrLessComponent items={catalogBlockItemsLinks(category.childrenCategories)}/>
            </SpoilerConvertComponent>
        );
        const blocksCount = blocks.length;
        const column1End = Math.floor(blocksCount / 3);
        const column2End = Math.floor(blocksCount / 3 * 2);
        const column1 = <div className={classes.categoryContentColumn}>{blocks.slice(0, column1End)}</div>
        const column2 = <div className={classes.categoryContentColumn}>{blocks.slice(column1End, column2End)}</div>
        const column3 = <div className={classes.categoryContentColumn}>{blocks.slice(column2End)}</div>
        return (
            <>
                {column1}
                {column2}
                {column3}
            </>
        );

    }, [categories, menuState]);

    function catalogBlockTitleLink(title, slug) {
        return (
            <Link to={`/catalog/${slug}`} className={classes.categoryContentBlockTitle}
                  onClick={() => setPopupCategoryState(false)}>
                {title}
            </Link>
        );
    }

    function catalogBlockItemsLinks(items) {
        return items.map(item =>
            <Link to={`/catalog/${item.slug}`} className={classes.categoryContentBlockItemTitle}
                  key={item.slug}
                  onClick={() => setPopupCategoryState(false)}>
                {item.title}
            </Link>
        );
    }

    return (
        <div className={popupWrapperClasses} onClick={() => setPopupCategoryState(false)}>
            <div className={classes.body} onClick={(e) => e.stopPropagation()}>
                <div className={catalogClasses.menuCatalog.filter(Boolean).join(" ")}>
                    <div className={classes.mobileBackButton} onClick={() => setPopupCategoryState(false)}>Закрыть</div>
                    {categories.map((item, index) =>
                        <div key={item.id}
                             className={[classes.categoryMenuItem, ((menuState === index) || (menuState === null && index === 0)) && classes.menuItemActive].filter(Boolean).join(" ")}
                             onClick={() => setMenuState(index)}>
                        <span className={classes.categoryMenuItemText}>
                            {item.title}
                        </span>
                            <IoIosArrowDown className={classes.categoryMenuItemIcon}/>
                            <Link to={`/catalog/${item.slug}`} onMouseEnter={() => setMenuState(index)}
                                  className={classes.categoryMenuItemDesktopLink}
                                  onClick={() => setPopupCategoryState(false)}/>
                        </div>
                    )}
                </div>

                <div className={catalogClasses.contentCatalog.filter(Boolean).join(" ")}>
                    <div className={classes.mobileBackButton} onClick={() => setMenuState(null)}>Назад</div>
                    {
                        CatalogCategoryBlocks
                    }
                </div>
            </div>
        </div>
    );
};

export default PopupCatalogComponent;
