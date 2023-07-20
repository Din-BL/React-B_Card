import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/services";
import { LoginField } from "../utils/types";
import { toast } from 'react-toastify';
import { getData, setData } from "../utils/localStorage";
import { LoginInfoContext } from "../context/LoginInfo";

export default function useFields(initialValue: LoginField) {
    const navigate = useNavigate()
    const [fields, setFields] = useState(initialValue)
    const { setLoginInfo } = useContext(LoginInfoContext)

    const handleField = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFields((currentValue) => ({ ...currentValue, [name]: value }))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        loginUser(fields)
            .then((user) => {
                setData('user', user.data)
                setLoginInfo({ admin: getData('user', 'admin'), business: getData('user', 'business'), logged: getData('user') })
                navigate(`/home/${user.data._id}`)
            })
            .catch(e => toast.error(e.response.data))
    }

    const resetFields = () => setFields(initialValue)

    return { fields, handleField, handleSubmit, resetFields }
}