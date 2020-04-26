import React, { useEffect, useState } from 'react';

export const useIdle = (handleWarn, handleLogout) => {
    const [warningTime, setWarningTime] = useState(60000);
    // const [signoutTime, setSignoutTime] = useState(1000000);
    let warnTimeout;
    // let logoutTimeout;

    const destroy = () => {
        console.log('Session destroyed');
    }
    const setTimeouts = () => {
        warnTimeout = setTimeout(handleWarn, warningTime);
        // logoutTimeout = setTimeout(handleLogout, signoutTime);
    };

    const clearTimeouts = () => {
        if (warnTimeout) clearTimeout(warnTimeout);
        // if (logoutTimeout) clearTimeout(logoutTimeout);
    };

    useEffect(() => {
        const events = [
            'load',
            'mousemove',
            'mousedown',
            'click',
            'scroll',
            'keypress'
        ];

        const resetTimeout = () => {
            clearTimeouts();
            setTimeouts();
        };

        for (let i in events) {
            window.addEventListener(events[i], resetTimeout);
        }

        setTimeouts();
        return () => {
            for(let i in events){
                window.removeEventListener(events[i], resetTimeout);
                clearTimeouts();
            }
        }
    },[]);

    return warningTime
}