import React from "react";

import {CommonContentTemplate} from 'features/common'

export const AboutPage = () => {

    return (
        <CommonContentTemplate>
            <div>
                <h2>About</h2>
                <p>
                    This is the About page!
                </p>
            </div>
        </CommonContentTemplate>
    )
}


// export class AboutPage extends React.Component {
//     heh = () => {
//         console.log('heh')
//     }
//
//     render () {
//         return (
//             <div>
//                 aa
//             </div>
//         )
//     }
// }