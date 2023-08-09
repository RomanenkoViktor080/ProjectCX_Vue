import {useEffect} from "react";

export default function (parentRef, childRef, callback) {

    useEffect(() => {
        const options = {
            root: parentRef.current,
            rootMargin: '0px',
            threshold: 0
        }

        let observer = new IntersectionObserver(([target]) => {
            if (target.isIntersecting) {
                callback()
            }
        }, options);
        observer.observe(childRef.current);
        return function () {
            observer.disconnect()
        }

    }, [callback])
}
