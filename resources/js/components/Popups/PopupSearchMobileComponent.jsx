import React, {useEffect, useState} from 'react';
import classes from "./PopupSearchMobileComponent.module.scss";
import InputHeaderSearchComponent from "../UI/Inputs/InputHeaderSearchComponent.vue";


const PopupSearchMobileComponent = ({classWrapper = null, setActive, active}) => {

    const [popupWrapperClasses, setPopupWrapperClasses] = useState([classes.categoryPopup, classWrapper]);


    useEffect(() => {
        if (active && !popupWrapperClasses.find((item) => item === classes.popupaAtive)) {
            document.body.style.overflow = "hidden";
            setPopupWrapperClasses([...popupWrapperClasses, classes.popupaAtive]);
        } else if (!active && popupWrapperClasses.find((item) => item === classes.popupaAtive)) {
            document.body.style.overflow = "auto";
            setPopupWrapperClasses([...popupWrapperClasses.filter((item) => item !== classes.popupaAtive)]);
        }
    }, [active])

    return (
        <div className={popupWrapperClasses.join(" ")} onClick={() => setActive(false)}>
            <div className={classes.body} onClick={(e) => e.stopPropagation()}>
                <div className={classes.backButton} onClick={() => setActive(false)}>назад</div>
                <InputHeaderSearchComponent containerPropClass={classes.searchContainer}/>
            </div>
        </div>
    );
};

export default PopupSearchMobileComponent;
