import React, { useState, useEffect, useRef } from "react";

const init = {
    data: null,
    get some (){
        return !!this.data
    }
}
export const TestPage2 = () => {
    const [account, setAccount] = useState(init)

    const handle = () => {
        setAccount({...test, data: true})
    }

    console.log(account)

    return (
        <button onClick={handle}>test</button>
    )
}


