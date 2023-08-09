import React from 'react';
import classes from "./InputFormComponent.module.scss";

const InputTextFormComponent = ({inputPropClass = null, placeholderText = "что-то...", ...props}) => {
    const inputClasses = [classes.input, inputPropClass];
    return (
        <input type={"text"} className={inputClasses.filter(item => item).join(" ")} placeholder={placeholderText} {...props}/>
    );
};

export default InputTextFormComponent;
