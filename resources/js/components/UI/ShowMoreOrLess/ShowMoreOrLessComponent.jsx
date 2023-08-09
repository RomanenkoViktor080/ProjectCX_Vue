import React, {useState} from 'react';

const ShowMoreOrLessComponent = ({
                                     items = [], quantityToShow = 5,
                                     showMoreFn = true,
                                     classBody
                                 }) => {

    const [statusShow, setStatusShow] = useState(false);

    return (
        <>
            <div className={classBody}>
                {items.slice(0, (quantityToShow > items.length || statusShow === true) ? items.length : quantityToShow).map(item =>
                    <div key={item.id}>
                        {item}
                    </div>)}
            </div>
            {items.length > quantityToShow && showMoreFn
                ?
                <div style={{cursor: "pointer"}}
                     onClick={() => setStatusShow(!statusShow)}>{statusShow ? "Свернуть" : "Развернуть"}</div> : null
            }
        </>
    );
};

export default ShowMoreOrLessComponent;
