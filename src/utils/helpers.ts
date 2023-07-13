import { FormField, UserCard } from "./types";
import Unknown from "../assets/Unknown.jpg"
import { Location, NavigateFunction } from "react-router-dom";
import { getData, removeData } from "./localStorage";
import { Login } from "../hooks/useLogin";

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

export function addressFormatter(city: string, street: string, houseNumber: string, country: string = '') {
    return `${street} ${houseNumber} ${city} ${country}`
}

export function defaultImage(imageUrl?: string) {
    return imageUrl?.length === 0 ? Unknown : imageUrl
}

export function defaultAlt(imageAlt?: string) {
    return imageAlt?.length === 0 ? 'Unknown' : imageAlt
}

export const pathUrl = (url: string, location: Location, id?: string) => {
    const path = location.pathname.toLowerCase()
    return id ? path === `${url}${id}` : path.startsWith(`/${url}`)
}

export const paths = (url: string[], location: Location) => {
    const path = location.pathname.toLowerCase().split('/')[1];
    return url.includes(path)
}

export const logout = (navigate: NavigateFunction, setLoginInfo: React.Dispatch<React.SetStateAction<Login>>) => {
    navigate('/login')
    removeData('user')
    setLoginInfo({ admin: getData('user', 'admin'), business: getData('user', 'business'), logged: getData('user') })
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

