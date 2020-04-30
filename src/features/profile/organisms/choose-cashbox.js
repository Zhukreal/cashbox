import React, {useState, useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {Button, CashBoxList} from "ui";
import {history} from "../../../lib/routing";



export const ChooseCashbox = () => {
    const { cashes } = useSelector( state => state.profile )
    const [activeCashbox, setActiveCashbox] = useState(null)

    useEffect(() => {
        if(cashes.length === 1) {
            localStorage.setItem('cashbox', cashes[0].id)
            history.push('/')
        }
    }, [cashes])

    const handleChooseCashbox = () => {
        if(!activeCashbox) return
        localStorage.setItem('cashbox', activeCashbox)
        history.push('/')
    }

    return (
        <>
            <CashBoxList
                list={cashes}
                active={activeCashbox}
                setActive={setActiveCashbox}
            />
            <div>
                <Button
                    onClick={handleChooseCashbox}
                    disabled={!activeCashbox}
                    isLoading={false}
                    isUpperCase
                >
                    Далее
                </Button>
            </div>
        </>
    )
}