import { ChangeEvent, useContext, useEffect, useState } from "react";
import { BusinessCard, UserCard } from "../utils/types";
import { getCards, getUsers } from "../utils/services";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { logout, pathUrl } from "../utils/helpers";
import { LoginInfoContext } from "../context/LoginInfo";

export function useUsers() {
    const navigate = useNavigate()
    const { loginInfo, setLoginInfo } = useContext(LoginInfoContext)
    const { admin } = loginInfo
    const [users, setUsers] = useState<UserCard[]>([])
    let error = 0

    function deleteUser(id: string) {
        setUsers((currentData) => currentData.filter((data) => data._id !== id))
    }

    // function editData(id: string, data: BusinessCard) {
    //     setData((currentData) => currentData.map((card) => {
    //         return card._id === id ? data : card
    //     }))
    // }

    useEffect(() => {
        if (admin) {
            getUsers()
                .then((res: AxiosResponse<UserCard[]>) => setUsers(res.data))
                .catch(e => {
                    const errMsg = e.response.data
                    error > 0 && toast.warning(errMsg)
                    error += 1
                    errMsg.includes('expired') && logout(navigate, setLoginInfo)
                })
        }
    }, [admin])

    return { users, deleteUser }
}