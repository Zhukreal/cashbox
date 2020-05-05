import React, { useState } from "react";
import test from 'static/img/logo.png'

export const TestPage = () => {
    const [list, setList] = useState([
        { id: 1, value: "banana", isChecked: false },
        { id: 2, value: "apple", isChecked: false },
        { id: 3, value: "mango", isChecked: false },
        { id: 4, value: "grap", isChecked: false }
    ]);

    const handleAllChecked = event => {
        let fruites = [...list];
        fruites.forEach(fruite => (fruite.isChecked = event.target.checked));
        setList(fruites);
        console.log(fruites, "fruits");
    };

    const handleCheckChieldElement = event => {
        let fruites = [...list];
        fruites.forEach(fruite => {
            if (fruite.value === event.target.value)
                fruite.isChecked = event.target.checked;
        });
        // debugger
        setList(fruites);
    };

    console.log('list', list)

    return (
        <div className="App">
            <h1> Check and Uncheck All Example </h1>
            <input
                type="checkbox"
                onClick={handleAllChecked}
                value="checkedall"
            />{" "}
            Check / Uncheck All
            <ul>
                {list.map(fruite => {
                    return (
                        <CheckBox
                            key={fruite.value}
                            handleCheckChieldElement={handleCheckChieldElement}
                            {...fruite}
                        />
                    );
                })}
            </ul>
        </div>
    );
}


const CheckBox = props => {
    return (
        <pre>



        </pre>
    );
};
