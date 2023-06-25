export function setData(key: string, value: string) {
    localStorage.setItem(key, value)
}

export function getData(key: string) {
    return localStorage.getItem(key)
}

export function removeData(key: string) {
    localStorage.removeItem(key)
}