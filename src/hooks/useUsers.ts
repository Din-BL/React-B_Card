import { useContext, useEffect, useState } from "react";
import { UserCard } from "../utils/types";
import { getUsers } from "../utils/services";
import { AxiosResponse } from "axios";
import { LoginInfoContext } from "../context/LoginInfo";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/helpers";

export function useUsers() {
    const { loginInfo, setLoginInfo } = useContext(LoginInfoContext)
    const { admin } = loginInfo
    const [users, setUsers] = useState<UserCard[]>([])
    const navigate = useNavigate()
    let error = 0

    function deleteUser(id: string) {
        setUsers((currentData) => currentData.filter((data) => data._id !== id))
    }

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