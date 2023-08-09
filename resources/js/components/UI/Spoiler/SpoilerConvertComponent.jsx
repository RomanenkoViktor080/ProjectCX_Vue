import React, {useEffect, useMemo, useState} from 'react';
import classes from "./SpoilerConvertComponent.module.scss";
import {IoIosArrowDown} from "react-icons/io";
import {retry} from "@reduxjs/toolkit/query";

const SpoilerConvertComponent = ({
                                     classWrapper = null,
                                     classBody = null,
                                     title = null,
                                     startState = false,
                                     children
                                 }) => {

    const [stateSpoiler, setStateSpoiler] = useState(startState);
    const classesWrapper = useMemo(() => {
        if (stateSpoiler) {
            return [classes.spoiler, classWrapper]
        }
        return [classes.spoiler, classWrapper, classes.close]
    }, [stateSpoiler]);

    function openOrClose() {
        setStateSpoiler(state => !state)
    }

    return (
        <div className={classesWrapper.join(" ")}>
            <div className={classes.titleHeader}>
                {
                    title
                }
                <div className={classes.button} onClick={() => openOrClose()}></div>
                <IoIosArrowDown className={classes.titleIcon}/>
            </div>
            <div className={[classes.body, classBody].join(" ")}>
                {children}
            </div>
        </div>
    );
};

export default SpoilerConvertComponent;
