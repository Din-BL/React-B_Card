import { ChangeEvent, useContext, useEffect, useState } from "react";
import { BusinessCard } from "../utils/types";
import { getCards } from "../utils/services";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/helpers";
import { LoginInfoContext } from "../context/LoginInfo";

export function useData() {
    const navigate = useNavigate()
    const { loginInfo, setLoginInfo } = useContext(LoginInfoContext)
    const { business } = loginInfo
    const [data, setData] = useState<BusinessCard[]>([])

    function addData(data: BusinessCard) {
        setData((currentData) => [...currentData, data])
    }

    function deleteData(id: string) {
        setData((currentData) => currentData.filter((data) => data._id !== id))
    }

    function editData(id: string, data: BusinessCard) {
        setData((currentData) => currentData.map((card) => {
            return card._id === id ? data : card
        }))
    }

    const searchData = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== "") {
            setData((currentCards: BusinessCard[]) => {
                return currentCards.filter((card: BusinessCard) => {
                    return card.title.toLocaleLowerCase().startsWith(e.target.value.toLocaleLowerCase())
                })
            })
        }
        else {
            getCards()
                .then((res: AxiosResponse<BusinessCard[]>) => setData(res.data))
                .catch(e => toast.warning(e.response.data))
        }
    }

    useEffect(() => {
        console.log(business);
        if (business) {
            getCards()
                .then((res: AxiosResponse<BusinessCard[]>) => setData(res.data))
                .catch(e => {
                    toast.warning(e.response.data)
                    logout(navigate, setLoginInfo)
                })
        }
    }, [business])

    return { data, deleteData, addData, editData, searchData }
}