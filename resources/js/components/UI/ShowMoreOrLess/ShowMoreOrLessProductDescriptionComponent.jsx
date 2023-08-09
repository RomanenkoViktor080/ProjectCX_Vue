import React, {useState} from 'react';
import classes from "./ShowMoreOrLessProductDescriptionComponent.module.scss"

const ShowMoreOrLessProductDescriptionComponent = ({title = null, wrapperClass = null, titleClass = null, bodyClass = null, buttonClass = null,
                                                       children = "Текст", link = false}) => {

    const [bodyClasses, setBodyClasses] = useState([classes.body, bodyClass])

    function openOrClose(event){
        event.preventDefault();

        if(!bodyClasses.find((item) => item === classes.open)){
            setBodyClasses([...bodyClasses, classes.open]);
        }
        else {
            setBodyClasses(bodyClasses.filter((item) => item !== classes.open));
        }
    }

    return (

        <div className={[classes.wrapper, wrapperClass].join(" ")}>
            <div className={[classes.title, titleClass].join(" ")}>{title}</div>
            <div className={bodyClasses.join(" ")}>
                {children}
            </div>
            <a onClick={link ? null : (event) => openOrClose(event)} className={[classes.button, buttonClass].join(" ")}>{link ? "Подробнее" : bodyClasses.find((item) => item === classes.open) ? "Свернуть" : "Развернуть" }</a>
        </div>
    );
};

export default ShowMoreOrLessProductDescriptionComponent;
