import React from "react";

// import './styles.sass'

export const FlexContainer = ({ children, ...props }) => {
    let classNames = 'flex-container'
    if(props.center) classNames = `${classNames} flex-center`

    return (
        <div className={classNames} >
            {children}
        </div>
    )
}