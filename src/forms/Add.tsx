import { toast } from "react-toastify";
import Form from "../components/Form";
import { CardFields } from "../utils/fields";
import { cardSchema } from "../utils/schema";
import { addCard } from "../utils/services";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../context/Cards";
import React, { useContext } from "react";
import { LoginInfoContext } from "../context/LoginInfo";
import { logout } from "../utils/helpers";

function Add() {
    const { id } = useParams();
    const navigate = useNavigate()
    const { setLoginInfo } = React.useContext(LoginInfoContext)
    const { addData } = useContext(DataContext)

    const handleAdd = (data: any) => {
        addCard(data)
            .then((info) => {
                addData(info.data)
                navigate(`/my cards/${id}`)
                toast.success('Business added')
            })
            .catch(e => {
                const errMsg = e.response.data
                toast.error(errMsg)
                errMsg.includes('expired') && logout(navigate, setLoginInfo)
            })
    }

    return <Form
        FormTitle='Create Card'
        FormFields={CardFields}
        FormSchema={cardSchema}
        handleAdd={handleAdd}
    ></Form>
}

export default Add;