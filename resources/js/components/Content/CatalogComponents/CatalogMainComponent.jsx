import React from 'react';
import CatalogProductsListComponent from "./CatalogProductsListComponent";
import classes from "./CatalogMainComponent.module.scss";
import CatalogSorterBlockComponent from "../../UI/Selects/CatalogSorterBlockComponent";

const CatalogMainComponent = ({setCatalogMobileActive}) => {


    return (
        <div className={classes.catalogMain}>
            <CatalogSorterBlockComponent setCatalogMobileActive={setCatalogMobileActive}/>
            <CatalogProductsListComponent/>
        </div>
    );
};

export default CatalogMainComponent;
