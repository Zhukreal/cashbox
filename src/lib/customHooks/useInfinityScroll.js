import { useState, useEffect } from 'react';
import { useDebouncedCallback } from "use-debounce";

export const useInfiniteScroll = (callback) => {
    const [isFetching, setIsFetching] = useState(false);


    const [scrollHandler] = useDebouncedCallback(
        () => {
            handleScroll()
        },
        500
    );

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        callback(() => {
            console.log('called back');
        });
    }, [isFetching]);


    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
        setIsFetching(true);
    }

    return [isFetching, setIsFetching];
};
