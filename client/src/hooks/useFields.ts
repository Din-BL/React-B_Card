import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/services";
import { LoginField } from "../utils/types";
import { getData, setData } from "../utils/localStorage";
import { LoginInfoContext } from "../context/LoginInfo";
import { errorMsg } from "../utils/helpers";

export default function useFields(initialValue: LoginField) {
    const navigate = useNavigate()
    const [fields, setFields] = useState(initialValue)
    const { setLoginInfo } = useContext(LoginInfoContext)

    const handleField = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFields((currentValue) => ({ ...currentValue, [name]: value.trim() }))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        loginUser(fields)
            .then((user) => {
                setData('userInfo', user.data)
                setLoginInfo({ admin: getData('userInfo', 'admin'), business: getData('userInfo', 'business'), logged: getData('userInfo') })
                navigate(`/home/${user.data._id}`)
            })
            .catch(e => errorMsg(e, navigate, setLoginInfo))
    }

    const resetFields = () => setFields(initialValue)

    return { fields, handleField, handleSubmit, resetFields }
}