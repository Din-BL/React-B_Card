import axios from "axios"
import { LoginField, UserCard } from "../utils/types"

const url = 'http://localhost:8000'

// userApi

export function registerUser(form: UserCard) {
    return axios.post(`${url}/user/register`, form)
}

export function loginUser(form: LoginField) {
    return axios.post(`${url}/user/login`, form)
}
