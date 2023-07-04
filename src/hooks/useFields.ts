import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/services";
import { LoginField } from "../utils/types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getData, setData } from "../utils/localStorage";
import { BusinessContext, LoggedContext } from "../context/LoginInfo";


export default function useFields(initalValue: LoginField) {

    const navigate = useNavigate()
    const [fields, setFields] = useState(initalValue)
    const { setBusiness } = useContext(BusinessContext)
    const { setLogged } = useContext(LoggedContext)

    const handleField = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFields((currentValue) => {
            return { ...currentValue, [name]: value }
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        loginUser(fields)
            .then((user) => {
                setData('user', user.data)
                getData('user', 'business') && setBusiness(true)
                setLogged(currentState => !currentState)
                navigate(`/${user.data._id}`)
            })
            .catch(e => toast.error(e.response.data))
    }

    const resetFields = () => setFields(initalValue)

    return { fields, handleField, handleSubmit, resetFields }
}