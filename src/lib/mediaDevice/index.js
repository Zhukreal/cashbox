import React, {useState, useEffect} from 'react'

// const size = {
//     mobileS: '320px',
//     mobileM: '375px',
//     mobileL: '425px',
//     tablet: '768px',
//     laptop: '1024px',
//     laptopL: '1440px',
//     desktop: '2560px'
// }

const size = {
    mobile: '425px',
    tablet: '768px',
    laptop: '1440px',
    desktop: '2560px'
}

export const device = {
    mobile: `(min-width: 320px) and (max-width: 425px)`,
    tablet: `(min-width: 426px) and (max-width: 768px)`,
    laptop: `(min-width: 769px) and (max-width: 1444px)`,
    desktop: `(min-width: 1445px)`
};

export const useDetectDevice = () => {
    const [device, setDevice] = useState({
        isMobile: false,
        isTablet: false,
        isLaptop: false,
        isDesktop: false
    })

    useEffect(() => {
        const width = window.innerWidth;
        let type = ''
        if(width <= 425) {
            type = 'isMobile'
        } else if (width <= 768) {
            type = 'isTablet'
        } else if (width <= 1440) {
            type = 'isLaptop'
        } else if (width <= 2560) {
            type = 'isDesktop'
        }
        setDevice({...device, [type]: true})
    }, [])

    return device
}

