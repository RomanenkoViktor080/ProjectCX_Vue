import React, {useEffect, useState} from 'react';
import classes from "./CounterComponent.module.scss";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import useBasketChangeQuantity from "../../../hooks/BasketHooks/useBasketChangeQuantity";

const CounterComponent = ({product, initialQuantity}) => {
    const [inputValue, setInputValue] = useState(initialQuantity);
    const changeQuantity = useBasketChangeQuantity();
    useEffect(() => {
        setInputValue(initialQuantity);
    }, [initialQuantity])

    function inputChange(length) {
        if (Number(length) < 1000) {
            setInputValue(Number(length));
        }
    }

    function saveChangeAfterFocusOut(length) {
        if (Number(length) === 0) {
            setInputValue(1);
            length = 1;
        }
        changeQuantity(product, length);
    }

    function inputIncrement(length) {
        length = Number(length) + 1;
        if (length < 1000) {
            setInputValue(length);
            changeQuantity(product, length);
        }
    }

    function inputDecrement(length) {
        length = Number(length) - 1;
        if (length > 0) {
            setInputValue(length);
            changeQuantity(product, length);
        }
    }

    return (
        <div className={classes.counter}>
            <button className={classes.addSubtract} onClick={() => inputDecrement(inputValue)}><AiOutlineMinus
                className={classes.buttonIcon}/></button>
            <input type={"text"} onBlur={(e) => saveChangeAfterFocusOut(e.target.value)}
                   onChange={event => inputChange(event.target.value)} value={inputValue} className={classes.input}/>
            <button className={classes.addButton} onClick={() => inputIncrement(inputValue)}><AiOutlinePlus
                className={classes.buttonIcon}/></button>
        </div>
    );
};

export default CounterComponent;
