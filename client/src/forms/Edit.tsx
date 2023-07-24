import { useNavigate, useParams } from "react-router-dom";
import Form from "../components/Form";
import { CardFields } from "../utils/fields";
import { cardSchema } from "../utils/schema";
import { editCard } from "../utils/services";
import { toast } from "react-toastify";
import React, { useContext } from "react";
import { DataContext } from "../context/Cards";
import { getData } from "../utils/localStorage";
import { LoginInfoContext } from "../context/LoginInfo";
import { errorMsg } from "../utils/helpers";
import { BusinessCard } from "../utils/types";
import Swal from "sweetalert2";
import { editAlert } from "../utils/sweetalert";
import useCard from "../hooks/useCard";

function Edit() {
    const { setLoginInfo, loginInfo } = React.useContext(LoginInfoContext)
    const { editData } = useContext(DataContext)
    const { id } = useParams();
    const navigate = useNavigate()
    const userId = getData('user', '_id')
    let { business } = loginInfo
    business = business === null ? false : business
    const card = useCard(business)

    const handleEdit = (data: BusinessCard) => {
        editAlert()
            .then((result) => {
                if (result.isConfirmed && id) {
                    editCard(id, data)
                        .then((info) => {
                            editData(id, info.data)
                            navigate(`/my cards/${userId}`)
                            toast.success(`${info.data.title} info been updated`)
                        })
                        .catch(e => errorMsg(e, navigate, setLoginInfo))
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                    navigate(`/my cards/${userId}`)
                }
            })
    }

    return (
        <>
            {card && (
                <Form
                    FormTitle='Edit Card'
                    FormFields={CardFields}
                    FormSchema={cardSchema}
                    handleForm={handleEdit}
                    initialValue={card}
                />
            )}
        </>
    );
}

export default Edit;