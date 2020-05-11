import { useState, useEffect } from 'react';
// import { useDebouncedCallback } from "use-debounce";

export const useInfiniteScroll = (callback) => {
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    useEffect(() => {
        if (isFetching) callback();
    }, [isFetching]);


    function handleScroll() {
        let innerHeight = window.innerHeight
        let scrollTop = document.documentElement.scrollTop
        let offsetHeight = document.documentElement.offsetHeight
        let isTimeToCb = (scrollTop > 100) && (innerHeight + scrollTop + 100 > offsetHeight)

        // console.log('innerHeight', innerHeight)
        // console.log('scrollTop', scrollTop)
        // console.log('offsetHeight', offsetHeight)

        if(isTimeToCb && !isFetching) setIsFetching(true);

    }

    return [isFetching, setIsFetching];
};
