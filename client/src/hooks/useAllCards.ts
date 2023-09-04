import { BusinessCard } from '../utils/types';
import React, { ChangeEvent, useEffect, useState } from "react";
import { defaultCards } from "../utils/cards";
import { getData, setData } from "../utils/localStorage";
import { getAllCards } from '../utils/services';
import { errorMsg } from '../utils/helpers';
import { LoginInfoContext } from '../context/LoginInfo';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';

export default function useAllCards() {
    const { setLoginInfo } = React.useContext(LoginInfoContext)
    const [allCards, setAllCards] = useState<BusinessCard[]>([])
    const navigate = useNavigate()
    const updatedCards = [...defaultCards, ...(allCards?.length ? allCards : [])]
    const removedCards = getData('removedCards')

    const [cards, setCards] = useState<Array<BusinessCard>>(() => {
        const storedCards: BusinessCard[] = getData("*defaultCards*")
        if (!storedCards) {
            localStorage.clear()
            return defaultCards;
        } return storedCards;
    });

    function addDefaultCard(data: BusinessCard) {
        setCards((currentData) => [...currentData, data])
    }

    function editDefaultCard(id: string, data: BusinessCard) {
        setCards((currentData) => currentData.map((card) => {
            return card._id === id ? data : card
        }))
    }

    function cardsFiltered() {
        if (removedCards) {
            return updatedCards.filter(card => {
                return !removedCards.some((removeCard: BusinessCard) => removeCard._id === card._id)
            })
        } return updatedCards;
    }

    const categoryFilter = (event: React.ChangeEvent<{}>, newValue: any) => {
        const filteredById = (cards: BusinessCard[]) => {
            return cards.filter((card: BusinessCard) => card._id === newValue._id)
        }
        if (newValue) {
            setCards((currentCards: BusinessCard[]) => {
                const filteredCards = filteredById(currentCards)
                const otherCards = filteredById(cardsFiltered())
                return filteredCards.length === 0 ? otherCards : filteredCards
            })
        } else {
            setCards(cardsFiltered())
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
        getAllCards()
            .then((res: AxiosResponse<BusinessCard[]>) => setAllCards(res.data))
            .catch((e) => errorMsg(e, navigate, setLoginInfo))
    }, [cards]);

    return { cards, setCards, searchDefaultCards, addDefaultCard, categoryFilter, cardsFiltered, editDefaultCard };
}



