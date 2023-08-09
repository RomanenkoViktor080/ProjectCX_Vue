import React, {useEffect, useState} from 'react';
import {GoSettings} from "react-icons/go";
import {useSearchParams} from "react-router-dom";
import classes from "./CatalogSorterBlockComponent.module.scss"

const CatalogSorterBlockComponent = ({setCatalogMobileActive}) => {

    const [isLoad, setIsLoad] = useState(true);
    const [sorterData, setSorterData] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        axios.get('/api/sorter-data').then(response => {
            setSorterData(Object.entries(response.data))
            setIsLoad(false)
        })
            .catch(error => {
                console.log(error);
            })
    }, []);

    function changeSelect(event) {
        setSearchParams((prevSearchParams) => {
            let value = event.target.value;
            prevSearchParams.set('sort', value);
            return prevSearchParams;
        });
    }

    return (
        <div className={classes.catalogSorter}>
            {
                !isLoad ?
                    <select className={classes.catalogSelect} defaultValue={searchParams.get('sort')}
                            onChange={changeSelect}>
                        <option hidden>Сортировка</option>
                        {
                            sorterData.map(([key, item]) =>
                                <option value={key}
                                        key={key}>{item}</option>)
                        }
                    </select>
                    : null
            }

            <GoSettings className={classes.catalogBurgerMobile} onClick={() => setCatalogMobileActive(true)}/>
        </div>
    );
};

export default CatalogSorterBlockComponent;
