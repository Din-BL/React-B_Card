export function setData(key: string, token: string) {
    localStorage.setItem(key, token)
}

export function getData(key: string) {
    return localStorage.getItem(key)
}