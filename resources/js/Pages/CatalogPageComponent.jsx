import React, {useEffect, useMemo, useState} from 'react';
import classes from "./CatalogPageComponent.module.scss";
import FilterComponent from "../components/Content/CatalogComponents/Filter/FilterComponent";
import CatalogMainComponent from "../components/Content/CatalogComponents/CatalogMainComponent";
import {useParams} from "react-router-dom";

const CatalogPageComponent = () => {
    const [catalogMobileActive, setCatalogMobileActive] = useState(false);
    const {category} = useParams();
    const catalogFilterClasses = useMemo(() => {
        if (catalogMobileActive) {
            return [classes.catalogFilter, classes.mobile];
        }
        return [classes.catalogFilter];
    }, [catalogMobileActive])

    return (
        <div className={classes.app}>
            <div className={classes.catalogTitle}>
                <div className={classes.catalogTitleText}>
                    {category}
                </div>
                <div className={classes.catalogProductCount}>
                    123131231 товаров
                </div>
            </div>
            <div className={classes.catalogBody}>
                <FilterComponent classProp={catalogFilterClasses.join(" ")}
                                 CatalogMobileActive={catalogMobileActive}
                                 setCatalogMobileActive={setCatalogMobileActive}
                />
                <CatalogMainComponent setCatalogMobileActive={setCatalogMobileActive}/>
            </div>
        </div>
    );
};

export default CatalogPageComponent;
