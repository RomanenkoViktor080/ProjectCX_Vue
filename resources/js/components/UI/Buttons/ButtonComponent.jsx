import React from 'react';
import classes from "./ButtonComponent.module.scss";

const ButtonComponent = ({children, classWrapper = null, onClick, ...props}) => {
    return (
        <button className={[classes.button, classWrapper].join(" ")} onClick={onClick} {...props}>{children}</button>
    );
};

export default ButtonComponent;
