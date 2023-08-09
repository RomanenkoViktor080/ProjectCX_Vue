import React, {useEffect, useState} from 'react';
import classes from "./PopupCenterComponent.module.scss";
import {IoClose} from "react-icons/io5";

const PopupCenterComponent = ({classWrapper = null, classBody = null, children, active = false, setActive, ...props}) => {
    const [popupState, setPopupState] = useState([classes.popupCenter, classWrapper]);

    useEffect(() => {
        if (active && !popupState.find((item) => item === classes.active)) {
            document.body.style.overflow = "hidden";
            setPopupState( [...popupState, classes.active]);
        } else {
            document.body.style.overflow = "auto";
            setPopupState([...popupState.filter((item) => item !== classes.active)]);
        }
        return () => document.body.style.overflow = "auto";
    }, [active])


    return (
        <div className={popupState.join(" ")} onClick={() => setActive(false)}>
            <div className={[classes.body, classBody].join(" ")} onClick={(event) => event.stopPropagation()}>
                <IoClose className={classes.closeButton} onClick={() => setActive(false)}/>
                {children}
            </div>
        </div>
    );
};

export default PopupCenterComponent;
