import { useNavigate, useParams } from "react-router-dom";
import Form from "../components/Form";
import { RegisterFields } from "../utils/fields";
import { registerSchema } from "../utils/schema";
import { editUser, getUser } from "../utils/services";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { LoginInfoContext } from "../context/LoginInfo";
import { logout } from "../utils/helpers";
import { UserCard } from "../utils/types";
import Swal from "sweetalert2";
import { editAlert } from "../utils/sweetalert";

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

    const handleUser = (data: UserCard) => {
        editAlert()
            .then((result) => {
                if (result.isConfirmed && id) {
                    editUser(id, data)
                        .then((info) => {
                            navigate(`/home/${id}`)
                            toast.success(`${info.data.userName} info been updated`)
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
                    handleForm={handleUser}
                    initialValue={initialValue}
                />
            )}
        </>
    );
}

export default User;