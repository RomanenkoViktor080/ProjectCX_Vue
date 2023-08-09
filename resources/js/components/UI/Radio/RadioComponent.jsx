import React from 'react';
import classes from "./RadioComponent.module.scss";

const RadioComponent = ({
                            classProp,
                            value = null,
                            title = <span>Ошибка</span>,
                            id = null,
                            name = null,
                            checked = false,
                            onChange
                        }) => {
    const classWrapper = [classes.filterRadio, classProp];

    return (
        <div className={classWrapper.join(" ")}>
            <input checked={checked} className={classes.input} value={value} name={name} id={name + id} type="radio"
                   onChange={onChange}/>
            <label className={classes.label} htmlFor={name + id}>{title}</label>
        </div>
    );
};

export default RadioComponent;
