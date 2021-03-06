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
    laptop: '1444px',
    desktop: '2560px'
}

export const device = {
    mobile: `(min-width: 320px) and (max-width: 425px)`,
    mobileTablet: `(min-width: 320px) and (max-width: 768px)`,
    tablet: `(min-width: 426px) and (max-width: 768px)`,
    laptop: `(min-width: 769px) and (max-width: 1444px)`,
    desktop: `(min-width: 1445px)`
};

