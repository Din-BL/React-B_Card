import { toast } from "react-toastify";
import Form from "../components/Form";
import { CardFields } from "../utils/fields";
import { cardSchema } from "../utils/schema";
import { addCard } from "../utils/services";
import { useNavigate, useParams } from "react-router-dom";
import { CardsContext, DataContext } from "../context/Cards";
import React, { useContext } from "react";
import { LoginInfoContext } from "../context/LoginInfo";
import { errorMsg } from "../utils/helpers";
import { BusinessCard } from "../utils/types";
import { getData, setData } from "../utils/localStorage";

function Add() {
    const { id } = useParams();
    const navigate = useNavigate()
    const { setLoginInfo } = React.useContext(LoginInfoContext)
    const { addData } = useContext(DataContext)
    const { addDefaultCard } = useContext(CardsContext)

    const handleAdd = (data: BusinessCard) => {
        addCard(data)
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

    return (
        <Form
            FormTitle='Create Card'
            FormFields={CardFields}
            FormSchema={cardSchema}
            handleForm={handleAdd}
        />
    )
}

export default Add;