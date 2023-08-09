import React, {useState} from 'react';
import StarComponent from "./StarComponent";

const StarsRatingComponent = ({maxStars = 5, startRating = 0, readOnly = false, cursorPointer = false}) => {

    const [rating, setRating] = useState({value: startRating, valueHover: null});

    function setRatingFn(value) {
        if (readOnly) return;
        setRating({...rating, value: value });
    }

    function setHoverFn(value) {
        if (readOnly) return;
        setRating({...rating, valueHover: value });
    }

    return (
        <div style={{display: "flex"}}>
            {[...Array(maxStars)].map((star, index) => {
                const value = index + 1;
                return (
                    <StarComponent
                        cursorPointer={cursorPointer}
                        num={value}
                        key={index}
                        setValue={setRatingFn}
                        value={rating.value}
                        setHover={setHoverFn}
                        hover={rating.valueHover}
                    />
                );
            })}
        </div>
    );
};

export default StarsRatingComponent;
