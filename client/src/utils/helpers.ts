import { FormField, UserCard, UseLogin, BusinessCard, SignatureFormData, UserStatus } from "./types";
import Unknown from "../assets/Unknown.jpg"
import { Location, NavigateFunction } from "react-router-dom";
import { getData, removeData, setData } from "./localStorage";
import { toast } from "react-toastify";

export const inputData = (field: FormField) => {
    return field.state ? field.state : field.label
}

export function capitalizeFirstLetter(field: string) {
    return field.charAt(0).toUpperCase() + field.slice(1);
}

export function convertMsg(msg: string, num: string) {
    return `${msg} length must be at least ${num} characters long`
}

export function phoneFormatter(phone: string) {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}

export function idShortcut(id: string) {
    return id.slice(0, 8)
}

export function addressFormatter(city: string, street: string, houseNumber: string, country: string = '') {
    return `${street} ${houseNumber} ${city} ${country}`
}

export function defaultImage(imageUrl?: string) {
    return imageUrl?.length === 0 ? Unknown : imageUrl
}

export function defaultAlt(imageAlt?: string) {
    return imageAlt?.length === 0 ? 'Unknown' : imageAlt
}

export const pathUrl = (url: string, location: Location) => {
    const path = location.pathname.toLowerCase()
    return path.startsWith(`/${url}`)
}

export const paths = (url: string[], location: Location) => {
    const path = location.pathname.toLowerCase().split('/')[1];
    return url.includes(path)
}

export const logout = (navigate: NavigateFunction, setLoginInfo: React.Dispatch<React.SetStateAction<UseLogin>>) => {
    navigate('/login')
    removeData('user')
    setLoginInfo({ admin: getData('user', 'admin'), business: getData('user', 'business'), logged: getData('user') })
}

export const userId = () => {
    const id = getData('user', '_id')
    return id ? `/${id}` : ""
}

export function isDisabled(initialValue: SignatureFormData | undefined, field: string) {
    return initialValue && (field === 'email' || field === 'user name') ? true : false
}

export function statusView(userStatus: UserStatus) {
    return userStatus === 'Business' ? 'User' : 'Business'
}

export function sortUser(users: UserCard[]) {
    return users.sort((a, b) => {
        if (a.admin === b.admin) {
            return 0;
        } else if (a.admin) {
            return -1;
        } else {
            return 1;
        }
    })
}

export function status(status: UserCard) {
    if (status.admin) {
        return 'Admin'
    } else if (status.business)
        return "Business"
    else {
        return 'User'
    }
}

export function errorMsg(e: any, navigate: NavigateFunction, setLoginInfo: React.Dispatch<React.SetStateAction<UseLogin>>, fetchData?: boolean) {
    const errMsg = e.response.data
    toast.error(errMsg)
    if (errMsg.includes('expired')) {
        logout(navigate, setLoginInfo)
    } else if (fetchData) {
        navigate('/error')
    }
}

export function removeDefaultCard(id: string, setCards: React.Dispatch<React.SetStateAction<BusinessCard[]>>) {
    const storedCards = getData("*defaultCards*")
    const filteredCards = storedCards.filter((card: BusinessCard) => card._id !== id)
    const removed = storedCards.filter((card: BusinessCard) => card._id === id)
    let removedCards = getData("removedCards")
    !removedCards ? removedCards = removed : removedCards = [...removedCards, ...removed]
    setData('removedCards', removedCards)
    setData("*defaultCards*", filteredCards)
    setCards(filteredCards)
    toast.success(`${removed[0].title} been removed`)
}


