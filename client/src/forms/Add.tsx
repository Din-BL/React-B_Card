import { toast } from "react-toastify";
import Form from "../components/Form";
import { CardFields } from "../utils/fields";
import { cardSchema } from "../utils/schema";
import { addCard } from "../utils/services";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AllCardsContext, CardsContext } from "../context/Cards";
import React, { useContext } from "react";
import { LoginInfoContext } from "../context/LoginInfo";
import { errorMsg, limitedRequests } from "../utils/helpers";
import { BusinessCard } from "../utils/types";
import { getData, setData } from "../utils/localStorage";
import { useUser } from "../hooks/useUser";
import { AddAlert, errorAlert } from "../utils/sweetalert";

function Add() {
    const { id } = useParams();
    const navigate = useNavigate()
    const location = useLocation()
    const { setLoginInfo } = React.useContext(LoginInfoContext)
    const { addData } = useContext(CardsContext)
    const { addDefaultCard } = useContext(AllCardsContext)
    const { initialValue } = useUser()
    const userEmail = { email: initialValue?.email || '' }
    for (let key in initialValue) if (key !== "email") initialValue[key] = "";

    const handleAdd = (data: BusinessCard) => {
        AddAlert()
            .then((result) => {
                if (result.isConfirmed) {
                    if (limitedRequests(navigate, location)) {
                        errorAlert()
                    } else {
                        addCard({ ...data, ...userEmail })
                            .then((info) => {
                                addData(info.data)
                                const defaultCards: BusinessCard[] = getData("*defaultCards*")
                                setData(("*defaultCards*"), [...defaultCards, info.data])
                                addDefaultCard(info.data)
                                navigate(`/my-cards/${id}`)
                                toast.success(`${info.data.title} card been added`)
                            })
                            .catch(e => errorMsg(e, navigate, setLoginInfo))
                    }
                }
            })
    }

    return (
        <>
            {initialValue && (
                <Form
                    FormTitle='Create Card'
                    FormFields={CardFields}
                    FormSchema={cardSchema}
                    handleForm={handleAdd}
                    initialValue={initialValue}
                />
            )}
        </>
    )
}

export default Add;
