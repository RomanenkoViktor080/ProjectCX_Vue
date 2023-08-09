import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import classes from "./FilterComponent.module.scss";
import FilterChooseBlock from "./FilterChooseBlock";
import FilterRangeComponent from "./FilterRangeComponent";
import ButtonComponent from "../../../UI/Buttons/ButtonComponent.vue";
import {useParams, useSearchParams} from "react-router-dom";
import axios from "axios";
import {debounce, isEmpty} from "lodash";

const FilterComponent = ({classProp, setCatalogMobileActive, CatalogMobileActive}) => {
    const classWrapper = [classes.filter, classProp];
    const {category} = useParams();
    const [filters, setFilters] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const localSearchParams = useMemo(() => new URLSearchParams(searchParams), [category, searchParams]);
    const getFilterDataDebounce = useMemo(() => debounce(getFilterData, 150), [category]);
    const FilterBlocksList = useMemo(() => {
        return (
            filters.map(item =>
                item.type === 2 ?
                    <FilterRangeComponent searchParams={localSearchParams} getFilterData={getFilterDataDebounce}
                                          minTotal={item.values.min} maxTotal={item.values.max} title={item.title}
                                          name={item.slug} key={item.slug}/>
                    : <FilterChooseBlock searchParams={localSearchParams} getFilterData={getFilterDataDebounce}
                                         type={item.type} name={item.slug} title={item.title} values={item.values}
                                         key={item.slug}
                    />
            )
        )
    }, [filters, localSearchParams, searchParams])

    useEffect(() => {
        getFilterData(searchParams)
    }, [category, searchParams])

    function getFilterData(searchParams) {
        axios.get(`/api/catalog/filter-data/${category}${getSearchParams(searchParams)}`)
            .then(response => {
                setFilters(response.data);
            })
    }

    function applyFilter() {
        setCatalogMobileActive(false)
        setSearchParams(localSearchParams)
    }


    function getSearchParams(searchParams) {
        const paramsString = searchParams.toString();
        if (paramsString === "") {
            return paramsString
        }
        return `?${paramsString}`;
    }


    useEffect(() => {
        if (CatalogMobileActive) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => document.body.style.overflow = "auto";
    }, [CatalogMobileActive])

    return (
        <div className={classWrapper.join(" ")}>
            {
                FilterBlocksList
            }
            {
                !isEmpty(filters) && <ButtonComponent
                    classWrapper={classes.closeMobileCatalogButton}
                    onClick={applyFilter}>Применить</ButtonComponent>
            }

        </div>

    );
};

export default FilterComponent;
