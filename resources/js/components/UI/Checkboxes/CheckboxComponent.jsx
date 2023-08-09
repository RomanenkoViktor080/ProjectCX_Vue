import React, {useEffect} from 'react';
import classes from "./CheckboxComponent.module.scss";
import {useSearchParams} from "react-router-dom";

const CheckboxComponent = ({
                               classProp,
                               value,
                               title = <span>Ошибка</span>,
                               name,
                               id,
                               checked,
                               onChange
                           }) => {
    const classWrapper = [classes.FilterCheckBox, classProp]

    return (
        <div className={classWrapper.join(" ")}>
            <input checked={checked} className={classes.input} value={value} name={name} id={id} type="checkbox"
                   onChange={onChange}/>
            <label className={classes.label} htmlFor={id}>{title}</label>
        </div>
    );
};

export default CheckboxComponent;
