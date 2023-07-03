import { BusinessCard } from './types';
import axios, { AxiosRequestConfig } from "axios"
import { LoginField, UserCard } from "../utils/types"
import { getData } from './localStorage';

const url = 'http://localhost:8000'

const getToken = () => getData('user', 'token');

const createConfig = (): AxiosRequestConfig => {
    return {
        headers: {
            'authorization': getToken(),
            'Content-Type': 'application/json',
        }
    };
};

// userApi

export function registerUser(form: UserCard) {
    return axios.post(`${url}/user/register`, form);
}

export function loginUser(form: LoginField) {
    return axios.post(`${url}/user/login`, form);
}

export function deleteUser(id: string) {
    return axios.delete(`${url}/user/${id}`, createConfig());
}

// BusinessApi

export function addCard(form: BusinessCard) {
    return axios.post(`${url}/business`, form, createConfig());
}

export function getCards() {
    return axios.get(`${url}/business`, createConfig());
}

export function deleteCard(id: string) {
    return axios.delete(`${url}/business/${id}`, createConfig());
}

export function getCard(id: string) {
    return axios.get(`${url}/business/${id}`, createConfig());
}

export function editCard(id: string, form: BusinessCard) {
    return axios.put(`${url}/business/${id}`, form, createConfig());
}
