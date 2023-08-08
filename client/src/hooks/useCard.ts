import React, { useEffect, useState } from "react"
import { BusinessCard } from "../utils/types"
import { getCard } from "../utils/services"
import { useNavigate, useParams } from "react-router-dom"
import { LoginInfoContext } from "../context/LoginInfo"
import { errorMsg } from "../utils/helpers"

function useCard(status: boolean | string, defaultCard?: BusinessCard) {
    const { setLoginInfo } = React.useContext(LoginInfoContext)
    const [card, setCard] = useState<BusinessCard>()
    const { id } = useParams();
    const navigate = useNavigate()
    let error = 0
    let component: boolean

    if (typeof status === 'boolean') {
        component = status
    } else {
        component = defaultCard?._id ? false : true
    }

    useEffect(() => {
        if (component && id && !error) {
            error += 1
            getCard(id)
                .then((card) => setCard(card.data))
                .catch((e) => errorMsg(e, navigate, setLoginInfo))
        }
        if (typeof status !== 'boolean') {
            setCard(defaultCard)
        }
    }, [component])
    return card
}

export default useCard