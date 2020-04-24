import { createGlobalStyle } from 'styled-components';

import GilroyLight from './gilroy/Gilroylight.woff';
import GilroyBold from './gilroy/Gilroyextrabold.woff';

export default createGlobalStyle`
    @font-face {
        font-family: 'GilroyLight';
        src: local('GilroyLight'),
        url(${GilroyLight}) format('woff');
        font-weight: 300;
        font-style: normal;
    }
    @font-face {
        font-family: 'GilroyBold';
        src: local('GilroyBold'),
        url(${GilroyBold}) format('woff');
        font-weight: 400;
        font-style: normal;
    }
`;