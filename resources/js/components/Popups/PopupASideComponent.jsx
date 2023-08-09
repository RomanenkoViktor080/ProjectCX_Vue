import React, {useEffect, useState} from 'react';
import classes from "./PopupASideComponent.module.css"

const PopupASideComponent = ({children, active = false, setActive, ...props}) => {
    const [popupState, setPopupState] = useState([classes.popupASide]);
    useEffect(() => {
        if (active && !popupState.find((item) => item === classes.active)) {
            document.body.style.overflow = "hidden";
            setPopupState([...popupState, classes.active]);
        } else {
            document.body.style.overflow = "unset";
            setPopupState([popupState.filter((item) => item !== classes.active)]);
        }
    }, [active])

    return (
        <aside className={popupState.join(" ")} onClick={() => setActive(false)}>
            <div className={classes.body} onClick={(event) => event.stopPropagation()}>
                {children}
            </div>
        </aside>
    );
};

export default PopupASideComponent;
