import { BusinessCard, UserStorage } from "./types"

export function setData(key: string, value: UserStorage | BusinessCard[]) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function getData(key: string, value: string) {
    const user = localStorage.getItem(key)
    if (user) {
        const data = JSON.parse(user);
        return data[value]
    }
}

export function removeData(key: string) {
    localStorage.removeItem(key)
}