import React, {useState} from 'react';
import classes from "./InputPasswordFormComponent.module.scss";
import {BsEye, BsEyeSlash} from "react-icons/bs";

const InputPasswordFormComponent = ({
                                        inputPropClass = null,
                                        placeholderText = "что-то...",
                                        ...props
                                    }) => {
    const [inputType, setInputType] = useState(false);
    return (
        <div className={classes.inputPasswordContainer}>
            <input type={inputType ? "text" : "password"}
                   className={[classes.input, inputPropClass].filter(item => item).join(" ")}
                   placeholder={placeholderText} {...props}/>
            <button className={classes.button} onClick={() => setInputType(!inputType)}>
                {inputType ? <BsEye className={classes.buttonIcon}/> :
                    <BsEyeSlash className={classes.buttonIcon}/>}
            </button>
        </div>
    );
};

export default InputPasswordFormComponent;
