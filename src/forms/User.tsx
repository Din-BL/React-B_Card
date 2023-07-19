import { useNavigate, useParams } from "react-router-dom";
import Form from "../components/Form";
import { CardFields, RegisterFields } from "../utils/fields";
import { cardSchema, registerSchema } from "../utils/schema";
import { editCard, editUser, getCard, getUser } from "../utils/services";
import { toast } from "react-toastify";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/Cards";
import { getData } from "../utils/localStorage";
import { LoginInfoContext } from "../context/LoginInfo";
import { logout } from "../utils/helpers";
import { BusinessCard, UserCard } from "../utils/types";
import Swal from "sweetalert2";
import { edit } from "../utils/sweetalert";

function User() {
    const { id } = useParams();
    const { setLoginInfo } = React.useContext(LoginInfoContext)
    const [initialValue, setInitialValue] = useState<UserCard>()
    const navigate = useNavigate()
    let error = 0

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const res = await getUser(id);
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

    const handleUser = (data: any) => {
        edit()
            .then((result) => {
                if (result.isConfirmed && id) {
                    editUser(id, data)
                        .then(() => {
                            navigate(`/home/${id}`)
                            toast.success('User updated')
                        })
                        .catch(e => {
                            const errMsg = e.response.data
                            toast.error(errMsg)
                            errMsg.includes('expired') && logout(navigate, setLoginInfo)
                        })
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                    navigate(`/home/${id}`)
                }
            })
    }

    return (
        <>
            {initialValue && (
                <Form
                    FormTitle='Edit User'
                    FormFields={RegisterFields}
                    FormSchema={registerSchema}
                    handleUser={handleUser}
                    initialValue={initialValue}
                />
            )}
        </>
    );
}

export default User;