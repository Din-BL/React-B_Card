import { useContext, useEffect, useState } from "react";
import { UserCard } from "../utils/types";
import { getUsers } from "../utils/services";
import { AxiosResponse } from "axios";
import { LoginInfoContext } from "../context/LoginInfo";
import { useNavigate } from "react-router-dom";
import { errorMsg } from "../utils/helpers";

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
        if (admin && !error) {
            error += 1
            getUsers()
                .then((res: AxiosResponse<UserCard[]>) => setUsers(res.data))
                .catch((e) => errorMsg(e, navigate, setLoginInfo, true))
        }
    }, [admin])

    return { users, deleteUser }
}