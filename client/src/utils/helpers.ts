import { FormField, UserCard, UseLogin, BusinessCard, SignatureFormData, UserStatus, NavActive, Pages, RequestUser } from "./types";
import Unknown from "../assets/Unknown.jpg"
import { Location, NavigateFunction } from "react-router-dom";
import { getData, removeData, setData } from "./localStorage";
import { toast } from "react-toastify";
import { defaultCards } from "./cards";

export const pages: Pages[] = ['home', 'about', 'favorite', 'my-cards', 'sandbox'];
export const menuPages: Pages[] = [...pages, 'login']
export const allowedPages = ['home', 'about', 'login', 'recent', 'contact us'];

export function websiteLink(website?: string) {
    if (defaultCards.some(card => card.web === website)) {
        return '/maintenance';
    } return website;
}

export function capitalizeFirstLetter(path: string) {
    const pathValue = path.includes('-') ? path.replace('-', " ") : path
    return pathValue.replace(/\b\w/g, c => c.toUpperCase());;
}

export const inputData = (field: FormField) => {
    return field.state ? field.state : field.label
}

export function convertMsg(msg: string, num: string) {
    return `${msg} length must be at least ${num} characters long`
}

export function phoneFormatter(phone: string) {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}

export function idShortcut(id: string) {
    return id.replace(/[^0-9]/g, '').slice(0, 6)
}

export function addressFormatter(city: string, street: string, houseNumber: string, country: string = '') {
    return `${street} ${houseNumber} ${city} ${country}`
}

export function defaultImage(imageUrl?: string) {
    return imageUrl?.length === 0 ? Unknown : imageUrl
}

export function defaultAlt(imageAlt?: string) {
    return imageAlt?.length === 0 ? 'Unknown' : imageAlt
}

export const pathUrl = (url: string, location: Location) => {
    const path = location.pathname.toLowerCase()
    return path.startsWith(`/${url}`)
}

export const paths = (url: string[], location: Location) => {
    const path = location.pathname.toLowerCase().split('/')[1];
    return url.includes(path)
}

export const logout = (navigate: NavigateFunction, setLoginInfo: React.Dispatch<React.SetStateAction<UseLogin>>) => {
    navigate('/login')
    removeData('userInfo')
    setLoginInfo({ admin: getData('userInfo', 'admin'), business: getData('userInfo', 'business'), logged: getData('userInfo') })
}

export const userId = () => {
    const id = getData('userInfo', '_id')
    return id ? `/${id}` : ""
}

export function isDisabled(initialValue: SignatureFormData | undefined, field: string) {
    return initialValue && (field === 'email' || field === 'username') ? true : false
}

export function statusView(userStatus: UserStatus) {
    return userStatus === 'Business' ? 'User' : 'Business'
}

export function sortUser(users: UserCard[]) {
    return users.sort((a, b) => {
        if (a.admin === b.admin) {
            return 0;
        } else if (a.admin) {
            return -1;
        } else {
            return 1;
        }
    })
}

export function status(status: UserCard | BusinessCard) {
    if (status.admin) {
        return 'Admin'
    } else if (status.business)
        return "Business"
    else {
        return 'User'
    }
}

export function errorMsg(e: any, navigate: NavigateFunction, setLoginInfo: React.Dispatch<React.SetStateAction<UseLogin>>) {
    if (e?.response?.data) {
        let errMsg = e.response.data
        errMsg = Array.isArray(errMsg) ? errMsg.join('') : errMsg
        toast.error(errMsg)
        if (errMsg.includes('expired')) logout(navigate, setLoginInfo)
        const errorExists = ['User', 'Business', 'Cast'].some(item => errMsg.includes(item));
        if (errorExists) navigate('/error')
    } else {
        toast.error(e.message)
        navigate('/error')
    }
}

export const filteredCards = (favoriteCards: BusinessCard[], cards: BusinessCard | BusinessCard[]) => {
    if (Array.isArray(cards)) {
        return favoriteCards.filter((favCard: BusinessCard) => {
            return !cards.some((card: BusinessCard) => card._id === favCard._id);
        });
    } else {
        return favoriteCards.filter((favCard: BusinessCard) => favCard._id !== cards._id)
    }
}

export function removeDefaultCard(cards: BusinessCard | BusinessCard[], setCards: React.Dispatch<React.SetStateAction<BusinessCard[]>>) {
    const storedCards = getData("*defaultCards*")
    let removedCards = getData("removedCards")
    let removed: BusinessCard[]
    if (Array.isArray(cards)) {
        removed = storedCards.filter((storedCard: BusinessCard) => cards.some((card: BusinessCard) => card._id === storedCard._id));
    } else {
        removed = storedCards.filter((storedCard: BusinessCard) => storedCard._id === cards._id)
    }
    !removedCards ? removedCards = removed : removedCards = [...removedCards, ...removed]
    setData('removedCards', removedCards)
    setData("*defaultCards*", filteredCards(storedCards, cards))
    setCards(filteredCards(storedCards, cards))
    !Array.isArray(cards) && toast.success(`${removed[0].title} been removed`)
}

export const navStyle = ({ isActive }: NavActive) => {
    return {
        color: isActive ? "white" : "#CCCCCC",
        textDecoration: 'none'
    };
}

export function isTextExist(key: string) {
    const field = getData(key)
    return field ? true : false
}

export const smallNavStyle = ({ isActive }: NavActive) => {
    return {
        color: isActive ? "black" : "#999999",
        textDecoration: 'none'
    };
}

export const isPasswordValid = (value: string) => {
    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
        return 'passwordLowerUpper';
    }
    if (!/(?=.*\d.*\d.*\d.*\d)/.test(value)) {
        return 'passwordFourNumbers';
    }
    if (!/(?=.*[#$@!%&*?_-])/.test(value)) {
        return 'passwordSpecialChar';
    }
    return null;
};

export const regexPath = (pathname: string) => {
    const match = pathname.match(/\/([a-zA-Z0-9-]+)/);
    return match && match[1] ? match[1] : 0
}

export const extractPath = (pathname: string, navigationItems: any[]) => {
    const path = regexPath(pathname)
    if (typeof path === 'string') {
        return navigationItems.findIndex((navigatePath) => {
            if (navigatePath.route) {
                const navigateUrl = regexPath(navigatePath.route)
                return navigateUrl === path
            }
        })
    }
    return path
}

export function favoriteRating(card: BusinessCard) {
    const favoriteCards = getData('favoriteCards')
    if (favoriteCards) {
        const numOfCards = favoriteCards.filter((favoriteCard: BusinessCard) => favoriteCard._id === card._id)
        return numOfCards.length;
    }
}

export function uniqueFavorites(favorites: BusinessCard[] | null) {
    if (favorites) {
        return getData('favoriteCards').filter((card: BusinessCard, index: number, cards: BusinessCard[]) => {
            const previousCards = cards.slice(0, index);
            const hasDuplicate = previousCards.some(prevCard => prevCard._id === card._id);
            return !hasDuplicate;
        });
    }
}

export function limitedRequests(navigate: NavigateFunction, location?: Location) {
    const HOUR_IN_MS = 60 * 60 * 1000;
    const requestActions = getData('requestActions') || [];
    const username = getData('userInfo', 'userName');
    const userActionsIndex = requestActions.findIndex((obj: RequestUser) => obj[username] !== undefined);
    const currentTime = Date.now();

    if (userActionsIndex !== -1) {
        const requestUser = requestActions[userActionsIndex][username];
        if (requestUser > 9) {
            const timestamp = requestActions[userActionsIndex].timestamp;
            if (currentTime - timestamp >= 24 * HOUR_IN_MS) {
                requestActions[userActionsIndex][username] = 0;
                requestActions[userActionsIndex].timestamp = currentTime;
            } else {
                if (location) {
                    const id = getData('userInfo', '_id')
                    if (pathUrl('my-cards', location)) navigate(`/my-cards/${id}`)
                    else if (pathUrl('user', location)) navigate(`/home/${id}`)
                } return true;
            }
        } requestActions[userActionsIndex][username] += 1;
    } else {
        const newUserActions: RequestUser = { [username]: 1, timestamp: currentTime };
        requestActions.push(newUserActions);
    }
    setData('requestActions', requestActions);
    return false;
}

