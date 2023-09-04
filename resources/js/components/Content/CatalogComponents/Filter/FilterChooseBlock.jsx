import React, {memo, useEffect, useMemo, useState} from 'react';
import classes from './FilterChooseBlock.module.scss'
import SpoilerComponent from "../../../UI/Spoiler/SpoilerComponent.vue";
import RadioComponent from "../../../UI/Radio/RadioComponent";
import CheckboxComponent from "../../../UI/Checkboxes/CheckboxComponent";
import {isEmpty} from "lodash";

const FilterChooseBlock = ({
                               searchParams,
                               getFilterData,
                               values,
                               title = "Error",
                               name = null,
                               type = 0,
                               quantityToDisplay = 5
                           }) => {

    const [showStatus, setShowStatus] = useState(false)
    const [localChooseBlockParams, setLocalChooseBlockParams] = useState(null);
    const titleSpoiler = useMemo(() => {
        return (
            <div className={classes.titleBlock}>
                <span className={classes.titleText}>{title}</span>
                {localChooseBlockParams ?
                    <span className={classes.resetButton} onClick={resetParam}>Сбросить</span>
                    : null}
            </div>)
    }, [localChooseBlockParams, title, searchParams]);


    useEffect(() => {
        setLocalChooseBlockParams(searchParams.get(name))
    }, [searchParams])

    const TitleItem = memo(function ({value, count}) {
        return (<>
            <span className={classes.titleItemText}>{value}</span>
            <span className={classes.titleItemCount}>{count}</span>
        </>);
    })

    function resetParam(event) {
        event.stopPropagation();
        deleteSearchParamFn();
    }

    function checkBoxIsChecked(value) {
        let paramValues = localChooseBlockParams ? localChooseBlockParams.split('ZZ') : [];
        return paramValues.some(item => item == value);
    }

    function changeCheckBox(event) {
        let value = event.target.value;
        let isChecked = event.target.checked
        let paramValues = localChooseBlockParams ? localChooseBlockParams.split('ZZ') : []
        if (isChecked) {
            paramValues.push(value)
            setSearchParamsFn(paramValues.join('ZZ'))
        } else {
            paramValues = paramValues.filter(item => item !== event.target.value)
            !isEmpty(paramValues) ?
                setSearchParamsFn(paramValues.join('ZZ')) :
                deleteSearchParamFn();
        }

    }


    function changeRadio(event) {
        let value = event.target.value;
        let isChecked = event.target.checked
        if (isChecked) {
            setSearchParamsFn(value)
        } else {
            deleteSearchParamFn()
        }
    }

    function radioIsChecked(value) {
        return localChooseBlockParams == value;
    }


    function setSearchParamsFn(value) {
        setLocalChooseBlockParams(value);
        searchParams.set(name, value)
        getFilterData(searchParams)
    }

    function deleteSearchParamFn() {
        setLocalChooseBlockParams(null);
        searchParams.delete(name)
        getFilterData(searchParams)
    }

    return (
        <SpoilerComponent classWrapper={classes.filterChooseBlock} title={titleSpoiler}>

            <div className={classes.content}>
                {
                    values ? values.slice(0, (quantityToDisplay > values.length || showStatus === true) ? values.length : quantityToDisplay).map((value) =>
                            Number(type) === 0 ?
                                <CheckboxComponent checked={checkBoxIsChecked(value.id)} id={name + value.id}
                                                   value={value.id}
                                                   title={<TitleItem count={value.productCount} value={value.value}/>}
                                                   name={name}
                                                   onChange={changeCheckBox}
                                                   key={value.id}
                                /> :
                                Number(type) === 1 ?
                                    <RadioComponent checked={radioIsChecked(value.id)} id={name + value.id} value={value.id}
                                                    title={<TitleItem count={value.productCount} value={value.value}/>}
                                                    name={name}
                                                    onChange={changeRadio}
                                                    key={value.id}
                                    /> :
                                    <div>Error</div>
                        )
                        : <div>Error</div>
                }
            </div>
            {
                values && values.length > quantityToDisplay ?
                    <div className={classes.moreLessText}
                         onClick={() => setShowStatus(!showStatus)}>{showStatus ? "Свернуть" : "Развернуть"}
                    </div>
                    : null
            }
        </SpoilerComponent>
    );
};

export default FilterChooseBlock;
