import axios from "axios"

export const defaultCardsApi = 'http://localhost:8000/defaultCards/'

export function insertData() {
    return axios
        .post(`${defaultCardsApi}init`, {})
        .then(() => axios.get(defaultCardsApi))
        .then((response) => response.data)
        .catch((e) => {
            console.log(e);
            throw e;
        });
}