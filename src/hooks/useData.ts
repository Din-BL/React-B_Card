import { useEffect, useState } from "react";
import { BusinessCard } from "../utils/types";
import { getCards } from "../utils/services";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/helpers";

export function useData() {
    const navigate = useNavigate()
    const [data, setData] = useState<BusinessCard[]>([])

    function addData(data: BusinessCard) {
        setData((currentData) => [...currentData, data])
    }

    function deleteData(id: string) {
        setData((currentData) => currentData.filter((data) => data._id !== id))
    }

    useEffect(() => {
        console.log('test');
        getCards()
            .then((res: AxiosResponse<BusinessCard[]>) => {
                setData(res.data)
            })
            .catch(e => {
                toast.warning(e.response.data)
                logout(navigate)
            })
    }, [])

    return { data, deleteData, addData }
}