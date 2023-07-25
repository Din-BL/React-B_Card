import { BusinessCard } from './../utils/types';
import React, { ChangeEvent, useEffect, useState } from "react";
import { defaultCards } from "../utils/cards";
import { getData, setData } from "../utils/localStorage";
import { getAllCards } from '../utils/services';
import { errorMsg } from '../utils/helpers';
import { LoginInfoContext } from '../context/LoginInfo';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';

export default function useCards() {
    const { setLoginInfo, loginInfo } = React.useContext(LoginInfoContext)
    const [allCards, setAllCards] = useState<BusinessCard[]>([])
    const { logged } = loginInfo
    const navigate = useNavigate()

    const [cards, setCards] = useState<Array<BusinessCard>>(() => {
        const storedCards: BusinessCard[] = getData("*defaultCards*")
        if (!storedCards) {
            localStorage.clear()
            return defaultCards;
        } else {
            return storedCards;
        }
    });

    function addDefaultCard(data: BusinessCard) {
        setCards((currentData) => [...currentData, data])
    }

    function cardsFiltered() {
        const removedCards = getData('removedCards')
        if (removedCards) {
            const updatedCards = [...defaultCards, ...(allCards?.length ? allCards : [])]
            return updatedCards.filter(card => {
                return !removedCards.some((removeCard: BusinessCard) => removeCard.email === card.email)
            })
        } else {
            return [...defaultCards, ...(allCards?.length ? allCards : [])];
        }
    }

    const searchDefaultCards = (e: ChangeEvent<HTMLInputElement>) => {
        setCards((currentCards: BusinessCard[]) => {
            const filteredCards = currentCards.filter((card: BusinessCard) => {
                return card.title.toLocaleLowerCase().startsWith(e.target.value.toLocaleLowerCase())
            })
            return e.target.value === "" ? cardsFiltered() : filteredCards
        })
    }

    useEffect(() => {
        setData("*defaultCards*", cards)
        if (logged) {
            getAllCards()
                .then((res: AxiosResponse<BusinessCard[]>) => setAllCards(res.data))
                .catch((e) => errorMsg(e, navigate, setLoginInfo, true))
        }
    }, [cards]);

    return { cards, setCards, searchDefaultCards, addDefaultCard };
}



