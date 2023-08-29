import { useLocation, useNavigate, useParams } from "react-router-dom";
import Form from "../components/Form";
import { RegisterFields } from "../utils/fields";
import { registerSchema } from "../utils/schema";
import { editUser } from "../utils/services";
import { toast } from "react-toastify";
import React from "react";
import { LoginInfoContext } from "../context/LoginInfo";
import { errorMsg, limitedRequests } from "../utils/helpers";
import { UserCard } from "../utils/types";
import Swal from "sweetalert2";
import { editAlert, errorAlert } from "../utils/sweetalert";
import { useUser } from "../hooks/useUser";
import { getData, setData } from "../utils/localStorage";

function User() {
    const { id } = useParams();
    const { setLoginInfo } = React.useContext(LoginInfoContext)
    const { initialValue } = useUser()
    const location = useLocation()
    const navigate = useNavigate()
    const userInfo = getData('userInfo')
    const status = { business: initialValue?.business || false, admin: initialValue?.admin || false }
    const staticData = { email: initialValue?.email || '', userName: initialValue?.userName || '' }
    const updateImage = (imageUrl: string) => imageUrl !== userInfo.imageUrl && setData('userInfo', { ...userInfo, imageUrl })

    const handleUser = (data: UserCard) => {
        editAlert()
            .then((result) => {
                if (result.isConfirmed && id) {
                    if (limitedRequests(navigate, location)) {
                        errorAlert()
                    } else {
                        editUser(id, { ...data, ...status, ...staticData })
                            .then((info) => {
                                updateImage(info.data.imageUrl)
                                navigate(`/home/${id}`)
                                toast.success(`${info.data.userName} info been updated`)
                            })
                            .catch(e => errorMsg(e, navigate, setLoginInfo))
                    }
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