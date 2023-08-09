import React, {useEffect, useMemo, useState} from 'react';
import classes from "./SpoilerComponent.module.scss";
import {IoIosArrowDown} from "react-icons/io";

const SpoilerComponent = ({classWrapper, classTitle, classBody, title, children, defaultStatus = true}) => {


    const [spoilerStatus, setSpoilerStatus] = useState(defaultStatus);
    const classesWrapper = useMemo(() => {
        if (!spoilerStatus) {
            return [classes.spoiler, classWrapper, classes.close];
        }
        return [classes.spoiler, classWrapper];
    }, [spoilerStatus])

    function changeStatusSpoiler() {
        setSpoilerStatus(status => !status)
    }

    return (
        <div className={classesWrapper.join(" ")}>
            <div className={[classes.title, classTitle].join(" ")} onClick={changeStatusSpoiler}>
                {title}
                <IoIosArrowDown className={classes.titleIcon}/>
            </div>
            <div className={[classes.body, classBody].join(" ")}>
                {children}
            </div>
        </div>
    );
};

export default SpoilerComponent;
