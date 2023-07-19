import { useContext, useEffect, useState } from "react";
import { UserCard } from "../utils/types";
import { getUsers } from "../utils/services";
import { AxiosResponse } from "axios";
import { LoginInfoContext } from "../context/LoginInfo";

export function useUsers() {
    const { loginInfo } = useContext(LoginInfoContext)
    const { admin } = loginInfo
    const [users, setUsers] = useState<UserCard[]>([])

    function deleteUser(id: string) {
        setUsers((currentData) => currentData.filter((data) => data._id !== id))
    }

    useEffect(() => {
        if (admin) {
            getUsers()
                .then((res: AxiosResponse<UserCard[]>) => setUsers(res.data))
                .catch(e => console.log(e))
        }
    }, [admin])

    return { users, deleteUser }
}