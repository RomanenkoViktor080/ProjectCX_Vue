import React from 'react';
import classes from "./InputHeaderSearchComponent.module.scss"
import {HiSearch} from "react-icons/hi";

const InputHeaderSearchComponent = ({children = null, containerPropClass, ...props}) => {
    return (
        <form className={[classes.headerSearchContainer, containerPropClass].filter(Boolean).join(" ")}>
                <input {...props} className={classes.searchInput} type="text" name="#" placeholder={children}/>
                <button className={classes.button} onClick={(event) => {event.preventDefault()}}><HiSearch className={classes.buttonIcon}/>
                </button>
        </form>
    );
};

export default InputHeaderSearchComponent;
