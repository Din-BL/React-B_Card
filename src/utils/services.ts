import { BusinessCard } from './types';
import axios, { AxiosRequestConfig } from "axios"
import { LoginField, UserCard } from "../utils/types"
import { getData } from './localStorage';

const url = 'http://localhost:8000'

const config: AxiosRequestConfig = {
    headers: {
        'authorization': getData('user', 'token'),
        'Content-Type': 'application/json',
    }
};

// userApi

export function registerUser(form: UserCard) {
    return axios.post(`${url}/user/register`, form)
}
export function loginUser(form: LoginField) {
    return axios.post(`${url}/user/login`, form)
}
export function deleteUser(id: string) {
    return axios.delete(`${url}/user/${id}`, config)
}

// BusinessApi

export function addCard(form: BusinessCard) {
    return axios.post(`${url}/business`, form, config)
}
export function getCard() {
    return axios.get(`${url}/business`, config)
}
export function deleteCard(id: string) {
    return axios.delete(`${url}/business/${id}`, config)
}
