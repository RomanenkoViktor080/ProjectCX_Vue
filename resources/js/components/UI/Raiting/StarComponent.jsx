import React from 'react';
import {BsStar, BsStarFill} from "react-icons/bs";

const StarComponent = ({cursorPointer, num, setValue, value, setHover, hover, starColor = "#0CD9AFFF"}) => {
    return (
        <>
            <input id={`star_${num}`} hidden type="radio" value={num} name="value"/>
            <label
                className="star"
                htmlFor={`star_${num}`}
                style={{color: starColor, fontSize: '100%'}}

                onClick={() => {
                    setValue(num);
                }}
                onMouseEnter={() => {
                    setHover(num);
                }}
                onMouseLeave={() => {
                    setHover(null);
                }}
            >
                {num <= (hover || value) ?
                    <BsStarFill className={cursorPointer ? "cursorPointer" : null}/> :
                    <BsStar className={cursorPointer ? "cursorPointer" : null}/>}
            </label>
        </>
    );
};

export default StarComponent;
