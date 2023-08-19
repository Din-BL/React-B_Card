import { ChangeEvent, useEffect, useState } from "react"
import { getData, setData } from "../utils/localStorage"

export function useSearch() {
    const [searchValue, setSearchValue] = useState('')

    function changeSearch(e: ChangeEvent<HTMLInputElement>) {
        setSearchValue(e.target.value)
        setData('searchField', e.target.value)
    }

    useEffect(() => {
        const searchValue = getData('searchField')
        setSearchValue(previousValue => searchValue ? searchValue : '')
    }, [searchValue])

    return { searchValue, changeSearch }
}