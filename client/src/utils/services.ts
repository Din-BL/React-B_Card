import { BusinessCard, BusinessStatus } from './types';
import axios, { AxiosRequestConfig } from "axios"
import { LoginField, UserCard } from "../utils/types"
import { getData } from './localStorage';

const url = 'http://localhost:8000'

const getToken = () => getData('user', 'token');

const createConfig = (): AxiosRequestConfig => {
    return {
        headers: {
            'authorization': getToken(),
            'Content-Type': 'application/json'
        }
    };
};

// User Api

export function registerUser(form: UserCard) {
    return axios.post(`${url}/user/register`, form);
}

export function loginUser(form: LoginField) {
    return axios.post(`${url}/user/login`, form);
}

export function deleteUser(id: string) {
    return axios.delete(`${url}/user/${id}`, createConfig());
}

export function getUsers() {
    return axios.get(`${url}/user`, createConfig());
}

export function getUser(id: string) {
    return axios.get(`${url}/user/${id}`, createConfig());
}

export function editStatus(id: string, userStatus: BusinessStatus) {
    return axios.patch(`${url}/user/${id}`, userStatus, createConfig());
}

export function editUser(id: string, user: UserCard) {
    return axios.put(`${url}/user/${id}`, user, createConfig());
}

// Business Api

export function addCard(form: BusinessCard) {
    return axios.post(`${url}/business`, form, createConfig());
}

export function getCards() {
    return axios.get(`${url}/business`, createConfig());
}

export function getAllCards() {
    return axios.get(`${url}/business/all`, createConfig());
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
