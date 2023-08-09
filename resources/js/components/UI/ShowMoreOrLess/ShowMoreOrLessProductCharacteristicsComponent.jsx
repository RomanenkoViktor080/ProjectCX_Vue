import React, {useState} from 'react';
import classes from "./ShowMoreOrLessProductCharacteristicsComponent.module.scss"

const ShowMoreOrLessProductCharacteristicsComponent = ({
                                                           title = null,
                                                           wrapperClass = null,
                                                           titleClass = null,
                                                           bodyClass = null,
                                                           link = false
                                                       }) => {

    const listItems = {
        items: [{title: "Модель", value: "51095YQE"}, {
            title: "Гарантийный срок",
            value: "1 год"
        }, {title: "Комплектация", value: "инструкция; смартфон"}, {
            title: "Страна производства",
            value: "Китай"
        }, {title: "Модель", value: "51095YQE"}, {title: "Гарантийный срок", value: "1 год"}, {
            title: "Комплектация",
            value: "инструкция; смартфон"
        }, {title: "Страна производства", value: "Китай"}], quantityToDisplay: 5
    };
    const [showStatus, setShowStatus] = useState(false)


    return (
        <div className={[classes.productCharacteristics, wrapperClass].join(" ")}>
            <div className={[classes.title, titleClass].join(" ")}>{title}</div>
            <div>
                {listItems.items.slice(0, (listItems.quantityToDisplay > listItems.items.length || showStatus) ? listItems.items.length : listItems.quantityToDisplay).map((item, index) =>
                    <dl className={[classes.characteristicsMain, bodyClass].join(" ")}>
                        <dt className={classes.characteristicsItemTitle}>
                            <span className={classes.text}>{item.title}</span>
                        </dt>
                        <dd className={classes.characteristicsItemValue}>{item.value}</dd>
                    </dl>
                )}
            </div>
            <a onClick={link ? null : () => setShowStatus(!showStatus)}
               className={classes.button}>{link ? "Подробнее" : showStatus ? "Свернуть" : "Развернуть"}</a>
        </div>
    );
};

export default ShowMoreOrLessProductCharacteristicsComponent;
