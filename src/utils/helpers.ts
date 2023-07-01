import { FormField } from "./types";
import Unknown from "../assets/Unknown.jpg"
import { Location, useLocation } from "react-router-dom";

// const location = useLocation()
const defaultImageUrl = Unknown;

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

export function addressFormatter(city: string, street: string, houseNumber: number) {
    return `${street} ${houseNumber} ${city}`
}

export function defaultImage(imageUrl?: string) {
    return imageUrl?.length === 0 ? defaultImageUrl : imageUrl
}
export function defaultAlt(imageAlt?: string) {
    return imageAlt?.length === 0 ? 'Unknown' : imageAlt
}

export const pathUrl = (url: string, location: Location, id?: string) => {
    return location.pathname.toLowerCase() === `${url}${id}`;
}