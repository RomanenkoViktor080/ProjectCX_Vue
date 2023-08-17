export default function useScroll(parentRef, childRef, callback) {
    const options = {
        root: parentRef.current,
        rootMargin: '0px',
        threshold: 0
    }
    const observer = new IntersectionObserver(([target]) => {
        if (target.isIntersecting) {
            callback();
        }
    }, options);

    observer.observe(childRef);

    return {
        disconnect: () => {
            observer.disconnect();
        },
    };
}
