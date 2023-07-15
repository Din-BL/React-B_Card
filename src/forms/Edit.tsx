import { useNavigate, useParams } from "react-router-dom";
import Form from "../components/Form";
import { CardFields } from "../utils/fields";
import { cardSchema } from "../utils/schema";
import { editCard, getCard } from "../utils/services";
import { toast } from "react-toastify";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/Cards";
import { getData } from "../utils/localStorage";
import { LoginInfoContext } from "../context/LoginInfo";
import { logout } from "../utils/helpers";
import { BusinessCard } from "../utils/types";
import Swal from "sweetalert2";
import { edit } from "../utils/sweetalert";

function Edit() {
    const { editData } = useContext(DataContext)
    const { id } = useParams();
    const { setLoginInfo } = React.useContext(LoginInfoContext)
    const [initialValue, setInitialValue] = useState<BusinessCard>()
    const navigate = useNavigate()
    const userId = getData('user', '_id')
    let error = 0

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const res = await getCard(id);
                    setInitialValue(res.data);
                } catch (e: any) {
                    const errMsg = e.response.data
                    error > 0 && toast.warning(errMsg)
                    error += 1
                    errMsg.includes('expired') && logout(navigate, setLoginInfo)
                }
            }
        };
        fetchData();
    }, []);

    const handleEdit = (id: string, data: any) => {
        edit().then((result) => {
            if (result.isConfirmed) {
                editCard(id, data)
                    .then((info) => {
                        editData(id, info.data)
                        navigate(`/my cards/${userId}`)
                        toast.success('Business updated')
                    })
                    .catch(e => {
                        const errMsg = e.response.data
                        toast.error(errMsg)
                        errMsg.includes('expired') && logout(navigate, setLoginInfo)
                    })
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
                navigate(`/my cards/${userId}`)
            }
        })
    }

    return (
        <>
            {initialValue && (
                <Form
                    FormTitle='Edit Card'
                    FormFields={CardFields}
                    FormSchema={cardSchema}
                    handleEdit={handleEdit}
                    initialValue={initialValue}
                />
            )}
        </>
    );
}

export default Edit;