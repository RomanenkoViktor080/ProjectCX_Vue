import React, {useEffect, useMemo, useState} from 'react';
import classes from "./FilterRangeComponent.module.scss";
import SpoilerComponent from "../../../UI/Spoiler/SpoilerComponent";

const FilterRangeComponent = ({searchParams, getFilterData, title = "Ошибка", name, minTotal, maxTotal}) => {
    const range = searchParams.get(name) ? searchParams.get(name).toString().split("ZZ") : [];
    const [inputMin, setInputMin] = useState(range.length > 1 ? range[0] : minTotal);
    const [inputMax, setInputMax] = useState(range.length > 1 ? range[1] : maxTotal);
    const titleSpoiler = useMemo(() => {
        return (
            <div className={classes.titleBlock}>
                <span className={classes.titleText}>{title}</span>
                {range.length > 1 ?
                    <span className={classes.resetButton} onClick={resetParam}>Сбросить</span>
                    : null
                }
            </div>)
    }, [range]);

    function inputChange(value, setValue) {
        if (Number(value) >= 0) {
            setValue(Number(value));
        }
    }

    useEffect(() => {
        if (range.length < 2) {
            setInputMin(Number(minTotal))
            setInputMax(Number(maxTotal))
        }
    }, [minTotal, maxTotal])

    function saveLocalSearchMinParams(minValue) {
        let maxValue = Number(inputMax);
        if (Number(minValue) >= maxValue) {
            maxValue = Number(minValue) + 200;
            setInputMax(maxValue)
        }
        setSearchParamsFn(minValue, maxValue);
    }

    function saveLocalSearchMaxParams(maxValue) {
        let minValue = inputMin;
        if (Number(maxValue) <= Number(inputMin)) {
            minValue = Number(maxValue) <= 200 ? 0 : (Number(maxValue) - 200)
            setInputMin(minValue);
        }
        setSearchParamsFn(minValue, maxValue);
    }

    function setSearchParamsFn(minTotal, maxTotal) {
        searchParams.set(name, minTotal + 'ZZ' + maxTotal)
        getFilterData(searchParams)
    }

    function resetParam(event) {
        event.stopPropagation();
        deleteSearchParamFn();
    }

    function deleteSearchParamFn() {
        searchParams.delete(name)
        getFilterData(searchParams)
    }

    return (
        <SpoilerComponent classTitle={classes.title} classBody={classes.body} title={titleSpoiler}>
            <div className={[classes.inputBlock, classes.right].join(" ")}>
                <div className={classes.hText}>От</div>
                <input placeholder={minTotal} onChange={e => inputChange(e.target.value, setInputMin)}
                       onBlur={(e) => saveLocalSearchMinParams(e.target.value)}
                       value={inputMin} type="text"/>
            </div>
            <div className={[classes.inputBlock, classes.left].join(" ")}>
                <div className={classes.hText}>До</div>
                <input placeholder={maxTotal} onChange={e => inputChange(e.target.value, setInputMax)}
                       onBlur={(e) => saveLocalSearchMaxParams(e.target.value)}
                       value={inputMax} type="text"/>
            </div>
        </SpoilerComponent>
    );
};

export default FilterRangeComponent;
