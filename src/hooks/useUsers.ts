import { useContext, useEffect, useState } from "react";
import { UserCard } from "../utils/types";
import { getUsers } from "../utils/services";
import { AxiosResponse } from "axios";
import { LoginInfoContext } from "../context/LoginInfo";
import { useParams } from "react-router-dom";

export function useUsers() {
    const { id } = useParams()
    const { loginInfo } = useContext(LoginInfoContext)
    const { admin } = loginInfo
    const [users, setUsers] = useState<UserCard[]>([])

    function deleteUser(id: string) {
        setUsers((currentData) => currentData.filter((data) => data._id !== id))
    }

    // function editData(id: string, data: BusinessCard) {
    //     setData((currentData) => currentData.map((card) => {
    //         return card._id === id ? data : card
    //     }))
    // }

    useEffect(() => {
        if (admin && id) {
            getUsers(id)
                .then((res: AxiosResponse<UserCard[]>) => setUsers(res.data))
                .catch(e => console.log(e))
        }
    }, [admin])

    return { users, deleteUser }
}