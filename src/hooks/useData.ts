import { useEffect, useState } from "react";
import { BusinessCard } from "../utils/types";
import { getCard } from "../utils/services";
import { AxiosResponse } from "axios";

export function useData() {
    const [data, setData] = useState<BusinessCard[]>([])

    useEffect(() => {
        getCard()
            .then((response: AxiosResponse<BusinessCard[]>) => {
                setData(response.data)
            })
            .catch(e => console.log(e))
    }, [])

    return data
}