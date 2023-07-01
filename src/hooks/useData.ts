import { useEffect, useState } from "react";
import { BusinessCard } from "../utils/types";
import { getCard } from "../utils/services";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export function useData() {
    const [data, setData] = useState<BusinessCard[]>([])

    function deleteData(id: string) {
        setData((currentData) => {
            return currentData.filter((data) => data._id !== id)
        })
    }
    useEffect(() => {
        getCard()
            .then((res: AxiosResponse<BusinessCard[]>) => setData(res.data))
            .catch(e => toast.error(e.response.data))
    }, [])

    return { data, deleteData }
}