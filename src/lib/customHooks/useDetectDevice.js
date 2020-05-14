import React, { useState, useEffect } from 'react'

export const useDetectDevice =  () => {
    const [device, setDevice] = useState({
        isMobile: false,
        isTablet: false,
        isLaptop: false,
        isDesktop: false
    })

    function getSize() {
        const width = window.innerWidth;
        let type = ''
        if(width <= 425) {
            type = 'isMobile'
        } else if (width <= 768) {
            type = 'isTablet'
        } else if (width <= 1444) {
            type = 'isLaptop'
        } else if (width <= 2560) {
            type = 'isDesktop'
        }
        return {...device, [type]: true}
    }


    useEffect(() => {
        setDevice(getSize())
        function handleResize() {
            setDevice(getSize())
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return device;
}
