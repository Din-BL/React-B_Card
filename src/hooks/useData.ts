import { useEffect, useState } from "react";
import { BusinessCard } from "../utils/types";
import { getCard } from "../utils/services";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export function useData() {
    const [data, setData] = useState<BusinessCard[]>([])

    function deleteData(id: string) {
        setData((currentData) => currentData.filter((data) => data._id !== id))
    }

    useEffect(() => {
        getCard()
            .then((res: AxiosResponse<BusinessCard[]>) => setData(res.data))
            .catch(e => toast.warning(e.response.data))
    }, [])

    return { data, deleteData }
}