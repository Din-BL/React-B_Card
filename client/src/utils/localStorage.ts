import {BusinessCard, UserStorage, userRate} from './types';

export function setData(key: string, value: UserStorage | BusinessCard[] | userRate | userRate[] | string) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getData(key: string, value?: string) {
  const user = localStorage.getItem(key);
  if (user && value) {
    const data = JSON.parse(user);
    return data[value];
  } else if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
}

export function removeData(key: string) {
  localStorage.removeItem(key);
}
